import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Placeholder from "./pages/Placeholder";
import Dashboard from "./pages/Dashboard";
import RoleDashboard from "./pages/RoleDashboard";
import DashboardSection from "./pages/DashboardSection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const placeholders = [
  ["listings", "Browse listings"],
  ["founders", "For founders"],
  ["investors", "For investors"],
  ["how-it-works", "How it works"],
  ["compliance", "Compliance"],
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            {placeholders.map(([path, title]) => (
              <Route
                key={path}
                path={`/${path}`}
                element={<Placeholder title={title} />}
              />
            ))}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:role" element={<RoleDashboard />} />
            <Route
              path="/dashboard/:role/:section"
              element={<DashboardSection />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
