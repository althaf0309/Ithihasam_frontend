import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { resetPageTimers, startTracking, trackPageView } from "@/lib/tracker";

/**
 * Mounts the visitor tracker and records a page view on every route change.
 *
 * Rendered once inside the router. Listeners attach on mount and detach on
 * unmount; the page-view effect re-runs per navigation because this is a single
 * page app and the browser fires no load event between routes.
 */
export function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => startTracking(), []);

  useEffect(() => {
    resetPageTimers();
    trackPageView();
  }, [pathname]);

  return null;
}
