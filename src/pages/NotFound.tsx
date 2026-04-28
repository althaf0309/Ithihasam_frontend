import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SeoMeta } from "@/components/SeoMeta";
import { useLang } from "@/contexts/LangContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SeoMeta
        title="Page Not Found | Ithihasam"
        description={`The page ${location.pathname} could not be found on Ithihasam.`}
        keywords={["page not found", "Ithihasam", "404"]}
        robots="noindex, nofollow"
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("notFound.title")}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {t("notFound.action")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
