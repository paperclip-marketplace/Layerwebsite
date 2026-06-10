"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { CUSTOMER_FACING_PRODUCTS } from "@/lib/config/customer-facing-products";
import styles from "./nav-dropdown.module.css";

const imgItemImage4 = "https://www.figma.com/api/mcp/asset/48dc6d43-e3a8-4c86-878f-07fce15249b8";
const imgItemImage5 = "https://www.figma.com/api/mcp/asset/46531f2f-8c64-44d2-b156-cbb5ddb15322";
const imgItemImage6 = "https://www.figma.com/api/mcp/asset/5cfc6c59-8bf8-428d-b0fc-4dc343ecc6a7";
const imgItemImage7 = "https://www.figma.com/api/mcp/asset/792eea2b-acee-4527-8fde-8a8c2a63c47f";
const imgItemImage8 = "https://www.figma.com/api/mcp/asset/a05885e1-4c4a-44f2-a19c-129a0eae4ae3";
const imgFooterItemImage = "https://www.figma.com/api/mcp/asset/3cee4514-47d9-42fe-8bcf-b9bb3fbe6c35";
const imgButtonIcon = "https://www.figma.com/api/mcp/asset/5c09ba59-65b3-434e-85af-820d6535e470";

export const ProductsDropdown = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={styles.dropdownContainer} ref={ref}>
      <div className={styles.contentContainer}>
        <div className={styles.innerContent}>
          <div className={styles.sectionsContainer}>
            {/* Section 1 */}
            <div className={styles.section}>
              <div className={`${styles.sectionHeader} dropdown-anim-stagger`}>
                <p className={styles.sectionTitle}>For Customer Facing Team</p>
              </div>
              <div className={styles.itemsContainer}>
                {CUSTOMER_FACING_PRODUCTS.map((product) => (
                  <DropdownItem
                    key={product.title}
                    href={product.href}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                  />
                ))}
              </div>
            </div>

            {/* Section 2 */}
            <div className={styles.section}>
              <div className={`${styles.sectionHeader} dropdown-anim-stagger`}>
                <p className={styles.sectionTitle}>For Leadership</p>
              </div>
              <div className={styles.itemsContainer}>
                <DropdownItem
                  image={imgItemImage4}
                  title="Agent Management"
                  description="Discover our All-in one Layer studio designed for leadship"
                />
                <DropdownItem
                  image={imgItemImage5}
                  title="Playbooks"
                  description="Discover our All-in one Layer studio designed for leadship"
                  isActive
                />
                <DropdownItem
                  image={imgItemImage6}
                  title="Skills and Frameworks"
                  description="Discover our All-in one Layer studio designed for leadship"
                />
                <DropdownItem
                  image={imgItemImage7}
                  title="Interview and Training"
                  description="Discover our All-in one Layer studio designed for leadship"
                />
                <DropdownItem
                  image={imgItemImage8}
                  title="Tool Calling and Integrations"
                  description="Discover our All-in one Layer studio designed for leadship"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`${styles.footer} dropdown-anim-stagger`}>
        <div className={styles.footerItem}>
          <div className={styles.footerImage}>
            <img src={imgFooterItemImage} alt="" />
          </div>
          <div className={styles.footerText}>
            <p className={styles.footerTitle}>Introducing Layer Co-Pilot V2</p>
            <p className={styles.footerDescription}>
              Discover our All-in one Layer studio designed for leadship
            </p>
          </div>
        </div>
        <Link href="#" className={styles.downloadButton}>
          <div className={styles.downloadIcon}>
            <img src={imgButtonIcon} alt="Apple" />
          </div>
          <span className={styles.downloadText}>Download for Mac</span>
        </Link>
      </div>
    </div>
  );
});

ProductsDropdown.displayName = "ProductsDropdown";

function DropdownItem({
  href = "#",
  image,
  title,
  description,
  isActive = false,
}: {
  href?: string;
  image: string;
  title: string;
  description: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${styles.item} dropdown-anim-stagger`}
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
