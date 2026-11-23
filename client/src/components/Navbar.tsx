import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Facebook, Instagram, Menu, X } from "lucide-react";
import { normalizePath } from "@shared/seo";
import { cn } from "@/lib/utils";

export const TikTok = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z" />
  </svg>
);

// Shared with the footer so both surfaces link to the same profiles.
export const SOCIAL_LINKS = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/djmisshaze" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/djmisshaze" },
  { name: "TikTok", icon: TikTok, href: "https://www.tiktok.com/@djmisshaze" },
];

// === MAIN MENU ===
// Every entry renders as a real <a href> that is always in the DOM (closed
// panels are only visually hidden, never unmounted or portalled out of #root),
// so the links survive into the prerendered HTML and crawlers can follow them.
// /destination-dj, /event-resources and /event-rentals are linked ahead of
// their pages shipping.
type MenuLink = { label: string; href: string };
type MenuDropdown = { id: string; label: string; items: MenuLink[] };
type MenuEntry = ({ kind: "link" } & MenuLink) | ({ kind: "dropdown" } & MenuDropdown);

export const MAIN_MENU: MenuEntry[] = [
  {
    kind: "dropdown",
    id: "event-type",
    label: "Event Type",
    items: [
      { label: "Corporate Events", href: "/corporate-event-dj" },
      { label: "Private Events", href: "/private-event-dj" },
      { label: "Weddings", href: "/wedding-dj" },
      { label: "Other Events", href: "/event-dj" },
    ],
  },
  {
    kind: "dropdown",
    id: "locations",
    label: "Locations",
    items: [
      { label: "Chicago", href: "/chicago-dj" },
      { label: "Dallas-Fort Worth", href: "/dallas-dj" },
      { label: "Denver", href: "/denver-dj" },
      { label: "Destination", href: "/destination-dj" },
    ],
  },
  { kind: "link", label: "Resources", href: "/event-resources" },
  { kind: "link", label: "Event Rentals", href: "/event-rentals" },
];

// Width at which the inline desktop menu replaces the mobile menu button.
// Keep in sync with the `lg:` classes below.
const DESKTOP_MENU_QUERY = "(min-width: 1024px)";
// Grace period before a hover-opened dropdown closes, so the pointer can cross
// small gaps without the panel flickering shut.
const HOVER_CLOSE_DELAY_MS = 150;

const testIdFor = (href: string) => href.replace(/^\/+/, "") || "home";

const topLevelClass =
  "inline-flex items-center gap-1 rounded-md px-2.5 xl:px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

// Visibility (not display/unmount) toggles the panels, so links stay in the
// HTML while closed ones drop out of the tab order and accessibility tree.
// Visibility flips instantly on open (so links are focusable right away, e.g.
// ArrowDown on a trigger) and only after the fade on close.
const panelStateClass = (open: boolean) =>
  cn(
    "motion-reduce:transition-none",
    open
      ? "visible opacity-100 translate-y-0 [transition:opacity_150ms_ease-out,transform_150ms_ease-out,visibility_0s]"
      : "invisible opacity-0 -translate-y-1 [transition:opacity_150ms_ease-out,transform_150ms_ease-out,visibility_0s_linear_150ms]",
  );

function DesktopMenu({ currentPath }: { currentPath: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  // A click/tap/keyboard-opened dropdown is "pinned": it ignores pointer-leave
  // and stays open until toggled again, Escape, an outside click, or focus
  // leaving it. A hover-opened one closes when the pointer leaves.
  const [pinned, setPinned] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const closeTimer = useRef<number | null>(null);
  const baseId = useId();

  const cancelScheduledClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    cancelScheduledClose();
    setOpenId(null);
    setPinned(false);
  }, [cancelScheduledClose]);

  // Close on navigation, and drop any pending timer on unmount.
  useEffect(() => {
    close();
  }, [currentPath, close]);
  useEffect(() => cancelScheduledClose, [cancelScheduledClose]);

  useEffect(() => {
    if (!openId) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const item = itemRefs.current.get(openId);
      const focusWasInside = !!item && item.contains(document.activeElement);
      close();
      // Only pull focus back to the trigger if it was inside this dropdown,
      // so Escape on a hover-opened panel doesn't steal focus from e.g. a form.
      if (focusWasInside) item?.querySelector<HTMLButtonElement>("button")?.focus();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openId, close]);

  const focusPanelLink = (id: string, which: "first" | "last") => {
    // keydown is a discrete event, so React has committed the open state by the
    // next frame and the panel is visible (focusable) again.
    requestAnimationFrame(() => {
      const links = itemRefs.current.get(id)?.querySelectorAll<HTMLAnchorElement>("ul a");
      if (!links?.length) return;
      links[which === "first" ? 0 : links.length - 1].focus();
    });
  };

  const handlePanelKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>, id: string) => {
    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index === -1) return;
    let next: HTMLElement | undefined;
    if (event.key === "ArrowDown") next = links[(index + 1) % links.length];
    else if (event.key === "ArrowUp")
      next = index === 0 ? itemRefs.current.get(id)?.querySelector("button") ?? undefined : links[index - 1];
    else if (event.key === "Home") next = links[0];
    else if (event.key === "End") next = links[links.length - 1];
    if (!next) return;
    event.preventDefault();
    next.focus();
  };

  return (
    <ul ref={menuRef} className="flex self-stretch items-stretch gap-0.5 xl:gap-1">
      {MAIN_MENU.map((entry) => {
        if (entry.kind === "link") {
          const active = currentPath === entry.href;
          return (
            <li key={entry.href} className="flex items-center">
              <Link
                href={entry.href}
                aria-current={active ? "page" : undefined}
                className={cn(topLevelClass, active ? "text-primary" : "text-white")}
                data-testid={`link-nav-${testIdFor(entry.href)}`}
              >
                {entry.label}
              </Link>
            </li>
          );
        }

        const isOpen = openId === entry.id;
        const panelId = `${baseId}-${entry.id}-panel`;
        const hasActiveChild = entry.items.some((link) => link.href === currentPath);

        return (
          <li
            key={entry.id}
            ref={(el) => {
              if (el) itemRefs.current.set(entry.id, el);
              else itemRefs.current.delete(entry.id);
            }}
            className="relative flex items-center"
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse") return;
              cancelScheduledClose();
              if (!isOpen) {
                setOpenId(entry.id);
                setPinned(false);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== "mouse" || !isOpen || pinned) return;
              cancelScheduledClose();
              closeTimer.current = window.setTimeout(close, HOVER_CLOSE_DELAY_MS);
            }}
            onBlur={(event) => {
              if (isOpen && !event.currentTarget.contains(event.relatedTarget as Node | null)) close();
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => {
                cancelScheduledClose();
                if (isOpen && pinned) {
                  close();
                } else {
                  setOpenId(entry.id);
                  setPinned(true);
                }
              }}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                event.preventDefault();
                cancelScheduledClose();
                setOpenId(entry.id);
                setPinned(true);
                focusPanelLink(entry.id, event.key === "ArrowDown" ? "first" : "last");
              }}
              className={cn(topLevelClass, isOpen || hasActiveChild ? "text-primary" : "text-white")}
              data-testid={`button-nav-${entry.id}`}
            >
              {entry.label}
              <ChevronDown
                aria-hidden="true"
                className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")}
              />
            </button>

            {/* pt-2 is a hover bridge: the gap between the bar and the panel
                still belongs to this <li>, so crossing it doesn't close it. */}
            <div
              className={cn(
                "absolute left-0 top-full pt-2",
                panelStateClass(isOpen),
              )}
            >
              <ul
                id={panelId}
                onKeyDown={(event) => handlePanelKeyDown(event, entry.id)}
                className="min-w-56 overflow-hidden rounded-xl border border-white/20 bg-black py-1.5 shadow-2xl"
              >
                {entry.items.map((link) => {
                  const active = currentPath === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block whitespace-nowrap px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10 hover:text-primary focus-visible:bg-white/10 focus-visible:text-primary focus-visible:outline-none",
                          active ? "text-primary" : "text-white",
                        )}
                        data-testid={`link-nav-${testIdFor(link.href)}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function MobileMenu({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!open) return;
    // Lock page scroll behind the full-height panel.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    // The panel is lg:hidden; close it if the viewport grows past the
    // breakpoint so the scroll lock doesn't outlive the visible menu.
    const desktop = window.matchMedia(DESKTOP_MENU_QUERY);
    const handleViewportChange = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleViewportChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleViewportChange);
    };
  }, [open]);

  const linkClass = (active: boolean) =>
    cn(
      "flex items-center justify-between w-full px-1 py-3.5 text-sm font-bold uppercase tracking-wider border-t border-white/10 transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary",
      active ? "text-primary" : "text-white",
    );

  const renderLink = (link: MenuLink) => {
    const active = currentPath === link.href;
    return (
      <li key={link.href}>
        <Link
          href={link.href}
          aria-current={active ? "page" : undefined}
          onClick={() => setOpen(false)}
          className={linkClass(active)}
          data-testid={`link-mobile-nav-${testIdFor(link.href)}`}
        >
          <span>{link.label}</span>
          {active && <span aria-hidden="true">✓</span>}
        </Link>
      </li>
    );
  };

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="p-1.5 hover:text-primary transition-colors text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        data-testid="button-mobile-menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Positioned against the fixed header (its backdrop-filter makes it the
          containing block, so `fixed` here would not reach the viewport). */}
      <div
        id={panelId}
        className={cn(
          "absolute inset-x-0 top-full h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-background",
          panelStateClass(open),
        )}
      >
        <nav aria-label="Main" className="container mx-auto px-4 pt-4 pb-10 space-y-6">
          {MAIN_MENU.filter((entry): entry is { kind: "dropdown" } & MenuDropdown => entry.kind === "dropdown").map(
            (group) => (
              <div key={group.id}>
                <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {group.label}
                </p>
                <ul>{group.items.map(renderLink)}</ul>
              </div>
            ),
          )}
          <ul className="border-b border-white/10">
            {MAIN_MENU.filter((entry): entry is { kind: "link" } & MenuLink => entry.kind === "link").map(
              renderLink,
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const currentPath = normalizePath(location);
  const socials = SOCIAL_LINKS;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="/"
            className="text-sm md:text-xl font-black tracking-tighter cursor-pointer text-foreground transition-colors font-display uppercase shrink-0"
          >
            DJ MISS HAZE
          </a>

          <div className="flex items-center gap-1">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 hover:text-primary transition-colors hover:bg-foreground/5 rounded-full text-foreground"
                  title={social.name}
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Main" className="hidden lg:flex self-stretch items-stretch ml-auto">
          <DesktopMenu currentPath={currentPath} />
        </nav>
        <div className="flex items-center ml-auto lg:hidden shrink-0">
          <MobileMenu currentPath={currentPath} />
        </div>
      </div>
    </header>
  );
}
