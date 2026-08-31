import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToRouteTarget } from "@/components/ScrollToRouteTarget";
import { LangProvider } from "@/contexts/LangContext";
import Index from "./pages/Index.tsx";

// Only the landing page is in the initial bundle. Every other route is split, so
// a visitor on /privacy-policy no longer downloads the charting library, the
// admin page, and all eight service page datasets before it can render.
const Services = lazy(() => import("./pages/Services.tsx"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.tsx"));
const LocationDetail = lazy(() => import("./pages/LocationDetail.tsx"));
const DistrictLanding = lazy(() => import("./pages/DistrictLanding.tsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogDetail = lazy(() => import("./pages/BlogDetail.tsx"));
const News = lazy(() => import("./pages/News.tsx"));
const NewsDetail = lazy(() => import("./pages/NewsDetail.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.tsx"));
const LocalServiceLanding = lazy(() => import("./pages/LocalServiceLanding.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Prerendered HTML is already on screen when the chunk loads, so a spinner here
// would replace real content with a placeholder. Render nothing instead.
function RouteFallback() {
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LangProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToRouteTarget />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/locations/:slug" element={<LocationDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Short district landing pages. These must precede the
                  /:landingSlug catch-all, which would otherwise swallow them. */}
              <Route path="/kochi" element={<DistrictLanding />} />
              <Route path="/thrissur" element={<DistrictLanding />} />
              <Route path="/kannur" element={<DistrictLanding />} />
              <Route path="/:landingSlug" element={<LocalServiceLanding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LangProvider>
  </QueryClientProvider>
);

export default App;
