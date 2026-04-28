import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { useLang } from "@/contexts/LangContext";
import { LegalPageContent } from "@/lib/legal-content";
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY } from "@/lib/site";

interface LegalPageProps {
  content: LegalPageContent;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  canonicalPath: string;
}

export function LegalPage({
  content,
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalPath,
}: LegalPageProps) {
  const { lang, t } = useLang();

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalPath={canonicalPath}
      />
      <Header />

      <section className="border-b border-border/50 bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container max-w-4xl">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {content.badge[lang]}
          </span>
          <h1 className="mt-5 text-3xl font-bold text-foreground md:text-5xl">{content.title[lang]}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            {content.subtitle[lang]}
          </p>
          <p className="mt-6 text-sm font-medium text-foreground">
            {content.effectiveDateLabel[lang]}: {content.effectiveDate}
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            {content.sections.map((section) => (
              <section key={section.title.en} className="rounded-2xl border bg-card p-6 shadow-[var(--card-shadow)]">
                <h2 className="text-2xl font-bold text-foreground">{section.title[lang]}</h2>

                {section.paragraphs?.length ? (
                  <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.en}>{paragraph[lang]}</p>
                    ))}
                  </div>
                ) : null}

                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground md:text-base">
                    {section.bullets.map((bullet) => (
                      <li key={bullet.en} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>{bullet[lang]}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border bg-card p-6 shadow-[var(--card-shadow)]">
              <h2 className="text-xl font-bold text-foreground">Need Help?</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                For questions about these website policies or your booking, contact the Ithihasam support team.
              </p>
              <div className="mt-5 space-y-3 text-sm text-foreground">
                <p>Phone: {BUSINESS_PHONE_DISPLAY}</p>
                <p>Email: {BUSINESS_EMAIL}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  to="/#booking"
                  className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {t("nav.bookNow")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
