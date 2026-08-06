"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import styles from "./lead-form-select.module.css";

type LeadFormSelectProps = {
  name: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
  fluid?: boolean;
  onChange: (value: string) => void;
};

type MenuPosition = {
  top: number;
  left: number;
  width: number;
};

export function LeadFormSelect({
  name,
  value,
  placeholder,
  options,
  required = false,
  fluid = false,
  onChange,
}: LeadFormSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const syncMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const gap = 6;

    setMenuPosition({
      top: rect.bottom + gap,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    syncMenuPosition();
  }, [open, syncMenuPosition]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (
        target instanceof Element &&
        target.closest(`[data-lead-select-menu="${listboxId}"]`)
      ) {
        return;
      }
      setOpen(false);
      setFocusedIndex(-1);
    };

    const handleReposition = () => syncMenuPosition();

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [listboxId, open, syncMenuPosition]);

  const selectOption = (option: string) => {
    onChange(option);
    setOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === " "
    ) {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        const selectedIndex = options.indexOf(value);
        setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setFocusedIndex(-1);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prev) => Math.min(options.length - 1, prev + 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prev) => Math.max(0, prev - 1));
      return;
    }

    if (event.key === "Enter" && focusedIndex >= 0) {
      event.preventDefault();
      selectOption(options[focusedIndex]!);
    }
  };

  const displayLabel = value || placeholder;
  const selectedIndex = options.indexOf(value);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${fluid ? styles.rootFluid : ""}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (next) {
              setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
            } else {
              setFocusedIndex(-1);
            }
            return next;
          });
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <span
          className={value ? styles.triggerValue : styles.triggerPlaceholder}
        >
          {displayLabel}
        </span>
      </button>

      <span
        className={`material-symbols-rounded ${styles.icon} ${open ? styles.iconOpen : ""}`}
        aria-hidden
      >
        expand_more
      </span>

      <input
        className={styles.requiredInput}
        type="text"
        name={name}
        value={value}
        required={required}
        tabIndex={-1}
        aria-hidden
        readOnly
        onChange={() => {}}
        autoComplete="off"
      />

      {mounted && open && menuPosition
        ? createPortal(
            <ul
              id={listboxId}
              role="listbox"
              data-lead-select-menu={listboxId}
              className={styles.menu}
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
                width: menuPosition.width,
              }}
              onKeyDown={handleMenuKeyDown}
            >
              {options.map((option, index) => {
                const isSelected = option === value;
                const isFocused = index === focusedIndex;

                return (
                  <li
                    key={option}
                    role="option"
                    aria-selected={isSelected}
                    className={`${styles.option} ${isSelected ? styles.optionSelected : ""} ${isFocused ? styles.optionFocused : ""}`}
                    onMouseEnter={() => setFocusedIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOption(option)}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>,
            document.body,
          )
        : null}
    </div>
  );
}
