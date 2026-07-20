"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { ROUTES } from "@/lib/config/constants";
import {
  CUSTOMER_FACING_NAV,
  LEADERSHIP_NAV,
} from "@/lib/landing/landing-nav";
import {
  CUSTOMER_FACING_NAV_IMAGES,
  HEADER_NAV_ASSETS,
  LEADERSHIP_NAV_IMAGES,
} from "@/lib/landing/header-nav-assets";
import styles from "./nav-dropdown.module.css";

const CUSTOMER_FACING_ITEMS = CUSTOMER_FACING_NAV_IMAGES.map((image) => ({
  image,
  description: "Discover our All-in one Layer studio designed for leadship",
}));

const LEADERSHIP_ITEMS = LEADERSHIP_NAV_IMAGES.map((image) => ({
  image,
  description: "Discover our All-in one Layer studio designed for leadship",
}));

export const ProductsDropdown = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={styles.dropdownContainer} ref={ref}>
      <div className={styles.contentContainer}>
        <div className={styles.innerContent}>
          <div className={styles.sectionsContainer}>
            <div className={styles.section}>
              <div className={`${styles.sectionHeader} dropdown-anim-stagger`}>
                <p className={styles.sectionTitle}>For Customer Facing Team</p>
              </div>
              <div className={styles.itemsContainer}>
                {CUSTOMER_FACING_NAV.map((item, index) => (
                  <DropdownItem
                    key={item.label}
                    href={item.href}
                    image={CUSTOMER_FACING_ITEMS[index].image}
                    title={item.label}
                    description={CUSTOMER_FACING_ITEMS[index].description}
                  />
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={`${styles.sectionHeader} dropdown-anim-stagger`}>
                <p className={styles.sectionTitle}>For Leadership</p>
              </div>
              <div className={styles.itemsContainer}>
                {LEADERSHIP_NAV.map((item, index) => (
                  <DropdownItem
                    key={item.label}
                    href={item.href}
                    image={LEADERSHIP_ITEMS[index].image}
                    title={item.label}
                    description={LEADERSHIP_ITEMS[index].description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.footer} dropdown-anim-stagger`}>
        <Link href={ROUTES.comingSoon} className={styles.footerItem}>
          <div className={styles.footerImage}>
            <img
              src={HEADER_NAV_ASSETS.productsFooter.coPilotV2}
              alt=""
            />
          </div>
          <div className={styles.footerText}>
            <p className={styles.footerTitle}>Introducing Layer Co-Pilot V2</p>
            <p className={styles.footerDescription}>
              Discover our All-in one Layer studio designed for leadship
            </p>
          </div>
        </Link>
        <DownloadForMacButton />
      </div>
    </div>
  );
});

ProductsDropdown.displayName = "ProductsDropdown";

function DownloadForMacButton() {
  return (
    <Link href={ROUTES.comingSoon} className={styles.downloadButton}>
      <div className={styles.downloadIcon}>
        <img src={HEADER_NAV_ASSETS.productsFooter.appleIcon} alt="Apple" />
      </div>
      <span className={styles.downloadText}>Download for Mac</span>
    </Link>
  );
}

function DropdownItem({
  image,
  title,
  description,
  href,
}: {
  image: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className={`${styles.item} dropdown-anim-stagger`}>
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
