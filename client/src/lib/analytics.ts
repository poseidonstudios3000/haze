import { useEffect } from "react";

// Thin wrapper around the GA4 gtag() stub defined in index.html. Tracking must
// never break the UI: if gtag is missing or throws, the call is dropped. During
// the build-time prerender, script/prerender.ts blocks the GA hosts, so gtag.js
// never loads and nothing pushed here leaves the build machine (and the
// prerender never clicks or submits anything anyway).
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch {
    // Analytics is best-effort.
  }
}

/**
 * One document-level listener for contact links, so every tel:/mailto: link on
 * the site (footer, city contact blocks, FAQ answers, ...) is tracked without
 * wiring each one. Capture phase, so a handler that stops propagation can't
 * hide the click. The email address itself is never sent.
 */
export function useContactLinkTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"]');
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const linkLocation = window.location.pathname;

      if (href.startsWith("tel:")) {
        let phoneNumber = href.slice("tel:".length);
        try {
          phoneNumber = decodeURIComponent(phoneNumber);
        } catch {
          // Keep the raw value if it isn't valid URI encoding.
        }
        trackEvent("click_phone", { phone_number: phoneNumber, link_location: linkLocation });
      } else {
        trackEvent("click_email", { link_location: linkLocation });
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
}
