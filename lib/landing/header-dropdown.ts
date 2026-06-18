export type LandingHeaderDropdownName = "products" | "solutions";

export const LANDING_HEADER_DROPDOWN_EVENT = "landing:open-header-dropdown";

export function requestHeaderDropdown(name: LandingHeaderDropdownName) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<{ name: LandingHeaderDropdownName }>(
      LANDING_HEADER_DROPDOWN_EVENT,
      { detail: { name } },
    ),
  );
}
