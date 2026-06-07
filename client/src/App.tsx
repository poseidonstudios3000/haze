import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
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
        <Route key={path} path={path} component={Home} />
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

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
