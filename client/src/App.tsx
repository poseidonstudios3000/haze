import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { Footer } from "@/components/Footer";
import { getSeoPage } from "@shared/seo";
import { useContactLinkTracking } from "@/lib/analytics";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import LocationPage from "@/pages/LocationPage";
import Faq from "@/pages/Faq";
import EventResources from "@/pages/EventResources";
import CityResources from "@/pages/CityResources";
import Destination from "@/pages/Destination";
import EventRentals from "@/pages/EventRentals";
import { chicagoResources } from "@/content/event-resources/chicago";
import { dallasFortWorthResources } from "@/content/event-resources/dallas-fort-worth";
import { denverResources } from "@/content/event-resources/denver";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const homeRoutes = [
  "/wedding-dj",
  "/corporate-event-dj",
  "/private-event-dj",
  "/event-dj",
  "/chicago-wedding-dj",
  "/dallas-wedding-dj",
  "/denver-wedding-dj",
  "/chicago-corporate-event-dj",
  "/dallas-corporate-event-dj",
  "/denver-corporate-event-dj",
];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      {homeRoutes.map((path) => (
        <Route key={path} path={path}>
          {() => <Home city={getSeoPage(path).city} />}
        </Route>
      ))}
      <Route path="/chicago-dj">{() => <LocationPage location="chicago" />}</Route>
      <Route path="/dallas-dj">{() => <LocationPage location="dallas" />}</Route>
      <Route path="/denver-dj">{() => <LocationPage location="denver" />}</Route>
      <Route path="/destination-dj" component={Destination} />
      <Route path="/event-rentals" component={EventRentals} />
      <Route path="/event-resources" component={EventResources} />
      {[chicagoResources, dallasFortWorthResources, denverResources].map((content) => (
        <Route key={content.path} path={content.path}>
          {() => <CityResources content={content} />}
        </Route>
      ))}
      <Route path="/faq" component={Faq} />
      <Route path="/admin" component={Admin} />
      <Route path="/corporate-admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

// wouter doesn't reset scroll on route change, so clicking a footer link would
// leave you at the bottom of the next page (in its footer). Reset to the top on
// every path change — but skip when the URL has a hash, so in-page anchor jumps
// aren't overridden. Mounted once, renders nothing.
function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// GA4 click_phone / click_email for every tel: and mailto: link. Renders nothing.
function ContactLinkTracking() {
  useContactLinkTracking();
  return null;
}

// The admin surfaces are noindex dashboards, so the marketing footer is skipped
// there. Every public route — including 404 — renders it.
function SiteFooter() {
  const [location] = useLocation();
  if (getSeoPage(location).noindex) return null;
  return <Footer />;
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ScrollToTop />
          <ContactLinkTracking />
          <Router />
          <SiteFooter />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
