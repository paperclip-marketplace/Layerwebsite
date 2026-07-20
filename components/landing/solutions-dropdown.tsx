"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { SOLUTIONS_NAV } from "@/lib/landing/landing-nav";
import { SOLUTIONS_NAV_IMAGES } from "@/lib/landing/header-nav-assets";
import styles from "./nav-dropdown.module.css";

const SOLUTION_ITEMS = SOLUTIONS_NAV_IMAGES.map((image, index) => ({
  image,
  description: "Discover our All-in one Layer studio designed for leadship",
  isActive: index === 0,
}));

export const SolutionsDropdown = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={styles.dropdownContainer} ref={ref}>
      <div className={styles.contentContainer}>
        <div className={styles.innerContent}>
          <div className={styles.sectionsContainer}>
            <div className={`${styles.section} ${styles.sectionSingle}`}>
              <div className={`${styles.sectionHeader} dropdown-anim-stagger`}>
                <p className={styles.sectionTitle}>Solutions</p>
              </div>
              <div className={styles.itemsContainerCompact}>
                {SOLUTIONS_NAV.map((solution, index) => (
                  <DropdownItem
                    key={solution.label}
                    href={solution.href}
                    image={SOLUTION_ITEMS[index].image}
                    title={solution.label}
                    description={SOLUTION_ITEMS[index].description}
                    isActive={SOLUTION_ITEMS[index].isActive ?? false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SolutionsDropdown.displayName = "SolutionsDropdown";

function DropdownItem({
  image,
  title,
  description,
  href,
  isActive = false,
}: {
  image: string;
  title: string;
  description: string;
  href: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${styles.item} ${styles.itemCompact} dropdown-anim-stagger`}
      style={isActive ? { backgroundColor: "#f9f9f9" } : {}}
    >
      <div className={styles.itemImage}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.itemText}>
        <p className={styles.itemTitle}>{title}</p>
        <p className={styles.itemDescription}>{description}</p>
      </div>
    </Link>
  );
}
