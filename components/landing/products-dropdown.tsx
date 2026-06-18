"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import { ROUTES } from "@/lib/config/constants";
import {
  CUSTOMER_FACING_NAV,
  LEADERSHIP_NAV,
} from "@/lib/landing/landing-nav";
import styles from "./nav-dropdown.module.css";

const imgItemImage = "https://www.figma.com/api/mcp/asset/7bf407f0-7f4e-43e5-a63a-e514811a15af";
const imgItemImage1 = "https://www.figma.com/api/mcp/asset/de9fa87c-0cdc-4945-a66b-884e56f09d2d";
const imgItemImage2 = "https://www.figma.com/api/mcp/asset/55ef5f8f-1bcb-4bb4-ac5d-1a7c0572394d";
const imgItemImage3 = "https://www.figma.com/api/mcp/asset/7c4573ec-c420-4a7c-932e-4d187b3599e2";
const imgItemImage4 = "https://www.figma.com/api/mcp/asset/48dc6d43-e3a8-4c86-878f-07fce15249b8";
const imgItemImage5 = "https://www.figma.com/api/mcp/asset/46531f2f-8c64-44d2-b156-cbb5ddb15322";
const imgItemImage6 = "https://www.figma.com/api/mcp/asset/5cfc6c59-8bf8-428d-b0fc-4dc343ecc6a7";
const imgItemImage7 = "https://www.figma.com/api/mcp/asset/792eea2b-acee-4527-8fde-8a8c2a63c47f";
const imgItemImage8 = "https://www.figma.com/api/mcp/asset/a05885e1-4c4a-44f2-a19c-129a0eae4ae3";
const imgFooterItemImage = "https://www.figma.com/api/mcp/asset/3cee4514-47d9-42fe-8bcf-b9bb3fbe6c35";
const imgButtonIcon = "https://www.figma.com/api/mcp/asset/5c09ba59-65b3-434e-85af-820d6535e470";

const CUSTOMER_FACING_ITEMS = [
  { image: imgItemImage, description: "Discover our All-in one Layer studio designed for leadship" },
  { image: imgItemImage1, description: "Discover our All-in one Layer studio designed for leadship" },
  { image: imgItemImage2, description: "Discover our All-in one Layer studio designed for leadship" },
  { image: imgItemImage3, description: "Discover our All-in one Layer studio designed for leadship" },
] as const;

const LEADERSHIP_ITEMS = [
  { image: imgItemImage4, description: "Discover our All-in one Layer studio designed for leadship" },
  { image: imgItemImage5, description: "Discover our All-in one Layer studio designed for leadship" },
  { image: imgItemImage6, description: "Discover our All-in one Layer studio designed for leadship" },
  { image: imgItemImage7, description: "Discover our All-in one Layer studio designed for leadship" },
  { image: imgItemImage8, description: "Discover our All-in one Layer studio designed for leadship" },
] as const;

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
            <img src={imgFooterItemImage} alt="" />
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
        <img src={imgButtonIcon} alt="Apple" />
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
