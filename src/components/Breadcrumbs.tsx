import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

/**
 * Visible breadcrumb trail.
 *
 * The prerendered pages already emit BreadcrumbList JSON-LD, but nothing on
 * screen matched it. Google expects structured data to describe content the user
 * can actually see, and breadcrumb rich results are far more likely when the
 * markup is backed by a real trail. It also gives deep local pages — which are
 * often the entry point from search — a way back up the hierarchy.
 */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  if (items.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              <li className="flex items-center">
                {isLast || !item.to ? (
                  <span aria-current={isLast ? "page" : undefined} className="font-medium text-foreground">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.to} className="transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex items-center">
                  <ChevronRight size={12} className="opacity-50" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
