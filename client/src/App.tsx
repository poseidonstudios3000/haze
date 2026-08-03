import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { Footer } from "@/components/Footer";
import { getSeoPage } from "@shared/seo";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import LocationPage from "@/pages/LocationPage";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const homeRoutes = [
  "/wedding-dj",
  "/corporate-event-dj",
  "/private-event-dj",
  "/brand-activation-dj",
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
      <Route path="/admin" component={Admin} />
      <Route path="/corporate-admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
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
          <Router />
          <SiteFooter />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
