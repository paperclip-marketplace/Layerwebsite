"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { SOLUTIONS_NAV } from "@/lib/landing/landing-nav";
import styles from "./nav-dropdown.module.css";

const imgRamp = "https://www.figma.com/api/mcp/asset/81a8d7f5-133c-4ad2-9568-3397266578c0";
const imgQuotaAttainment = "https://www.figma.com/api/mcp/asset/6ce9ed0d-1f12-4517-9ef3-9abaf537f323";
const imgCustomerFacingTime = "https://www.figma.com/api/mcp/asset/4f7b4f34-562e-42a5-a07a-b733ee077a8f";

const SOLUTION_ITEMS = [
  { image: imgRamp, description: "Discover our All-in one Layer studio designed for leadship", isActive: true },
  { image: imgQuotaAttainment, description: "Discover our All-in one Layer studio designed for leadship" },
  { image: imgCustomerFacingTime, description: "Discover our All-in one Layer studio designed for leadship" },
] as const;

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
