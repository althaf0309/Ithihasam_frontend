import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { SeoMeta } from "@/components/SeoMeta";
import { TestimonialCard } from "@/components/TestimonialCard";
import { getLocalizedText, serviceCatalogBySlug } from "@/lib/service-catalog";
import { servicePageContentBySlug } from "@/lib/service-page-content";
import { serviceSeoBySlug } from "@/lib/service-seo";
import { createKeywordSet } from "@/lib/seo";
import { useLang } from "@/contexts/LangContext";

function BannerCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((value) => (value + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((value) => (value - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-[320px] w-full overflow-hidden md:h-[420px]">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} banner`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
      <div className="absolute inset-0 flex items-end justify-center pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-3xl font-extrabold text-primary-foreground drop-shadow-lg md:text-5xl"
        >
          {title}
        </motion.h1>
      </div>
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur transition hover:bg-background/80">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur transition hover:bg-background/80">
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all ${index === current ? "w-8 bg-primary-foreground" : "w-2.5 bg-primary-foreground/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground"
        onClick={() => setOpen(!open)}
      >
        {question}
        <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { lang, t } = useLang();
  const service = serviceCatalogBySlug[slug];
  const pageContent = servicePageContentBySlug[slug];
  const seo = serviceSeoBySlug[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <SeoMeta
          title="Service Not Found | Ithihasam"
          description="The requested Ithihasam service page could not be found. Browse trusted home maintenance services in Kannur and Thrissur."
          keywords={["service not found", "Ithihasam services", "Kannur home services", "Thrissur home services"]}
          robots="noindex, nofollow"
        />
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t("service.notFound")}</h1>
          <Link to="/" className="mt-4 inline-block text-primary underline">{t("service.backHome")}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = getLocalizedText(service.title, lang);
  const detailDescription =
    lang === "en" && pageContent?.detailDescriptionEn
      ? pageContent.detailDescriptionEn
      : getLocalizedText(service.detailDescription, lang);
  const faqItems =
    lang === "en" && pageContent?.faqsEn?.length
      ? pageContent.faqsEn.map((faq) => ({ question: faq.q, answer: faq.a }))
      : service.faqs.map((faq) => ({
          question: getLocalizedText(faq.q, lang),
          answer: getLocalizedText(faq.a, lang),
        }));
  const pageTitle = seo?.metaTitle ?? `${service.title.en} | Ithihasam`;
  const pageDescription = seo?.metaDescription ?? detailDescription;
  const pageKeywords = createKeywordSet(
    seo?.keywords || [],
    service.title.en,
    "Ithihasam",
    "Kannur home services",
    "Thrissur home services",
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        image={service.bannerImages[0]}
        type="website"
      />
      <Header />

      <BannerCarousel images={service.bannerImages} title={title} />

      <div className="relative z-10 -mt-5 flex justify-center">
        <ContactCTAButtons size="lg" showLabels />
      </div>

      <CategoryIconStrip />

      <div className="container grid gap-10 py-12 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-lg leading-relaxed text-muted-foreground">{detailDescription}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-4 text-2xl font-bold text-foreground">{t("service.included")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.includes.map((item, index) => (
                <motion.div
                  key={`${service.slug}-${item.en}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 rounded-lg border bg-card p-3 transition-shadow hover:shadow-[var(--card-shadow-hover)]"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-whatsapp" />
                  <span className="text-sm text-foreground">{getLocalizedText(item, lang)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {faqItems.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4 text-2xl font-bold text-foreground">{t("service.faq")}</h2>
              <div className="rounded-xl border bg-card p-6">
                {faqItems.map((faq) => (
                  <FAQItem
                    key={`${service.slug}-${faq.question}`}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {service.reviews.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4 text-2xl font-bold text-foreground">{t("service.reviews")}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.reviews.map((review) => (
                  <TestimonialCard
                    key={`${service.slug}-${review.name}`}
                    name={review.name}
                    location={review.location}
                    text={getLocalizedText(review.text, lang)}
                    rating={review.rating}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div>
          <div className="sticky top-20">
            <QuickBookingForm compact preselectedService={service.title.en} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
