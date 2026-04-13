import { Phone, MessageCircle, Menu, X, Globe, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactCTAButtons } from "./ContactCTAButtons";
import { useLang } from "@/contexts/LangContext";
import { useTheme } from "@/hooks/use-theme";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.services"), to: "/#services" },
    { label: t("nav.blog"), to: "/blog" },
    { label: t("nav.news"), to: "/news" },
    { label: t("nav.about"), to: "/#why-us" },
    { label: t("nav.contact"), to: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <span className="text-sm font-bold text-primary-foreground">IT</span>
          </div>
          <span className="text-xl font-bold text-foreground">Ithihasa</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full border border-border/50 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Globe size={14} />
            {lang === "en" ? "हिंदी" : "English"}
          </button>
          <ContactCTAButtons size="sm" />
          <Button asChild size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Link to="/#booking">{t("nav.bookNow")}</Link>
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background p-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <Globe size={14} />
              {lang === "en" ? "हिंदी" : "English"}
            </button>
            <ContactCTAButtons size="sm" />
            <Button asChild size="sm">
              <Link to="/#booking">{t("nav.bookNow")}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
