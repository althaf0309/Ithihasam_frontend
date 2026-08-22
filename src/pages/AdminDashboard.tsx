import { ExternalLink, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SeoMeta } from "@/components/SeoMeta";
import { API_BASE_URL } from "@/lib/api";

/**
 * Placeholder for the internal dashboard.
 *
 * This route previously rendered a full "Admin Dashboard" — enquiry tables,
 * customer names, revenue-shaped stats — with no authentication of any kind.
 * The data was hardcoded mock, so nothing real leaked, but the route was
 * publicly reachable and invited someone to wire live enquiries into it without
 * adding an auth check first.
 *
 * Real enquiries are persisted by the Django API and administered through
 * Django's own authenticated admin, so this page now points there instead of
 * reimplementing an unprotected copy.
 */
export default function AdminDashboard() {
  const djangoAdminUrl = API_BASE_URL.replace(/\/api\/?$/, "") + "/admin/";

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <SeoMeta
        title="Internal | Ithihasam"
        description="Internal Ithihasam operations entry point."
        robots="noindex, nofollow, noarchive"
      />

      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-[var(--card-shadow)]">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldAlert size={22} />
        </div>

        <h1 className="text-2xl font-bold text-foreground">Staff access moved</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Booking enquiries, blog posts, and customer records are managed in the Django
          admin, which requires a staff sign-in. This page holds no data.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <a href={djangoAdminUrl} rel="noopener noreferrer">
              Open staff admin
              <ExternalLink size={15} className="ml-2" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Back to site</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
