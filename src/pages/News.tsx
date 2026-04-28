import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { useLang } from "@/contexts/LangContext";
import { createKeywordSet } from "@/lib/seo";

import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";

export const newsArticles = [
  {
    slug: "itihasam-expands-to-5-new-cities",
    image: bannerElectrical,
    date: "2026-04-08",
    category: { en: "Company News", ml: "കമ്പനി വാർത്ത" },
    title: {
      en: "Ithihasam Expands Services to 5 New Cities Across India",
      ml: "ഇന്ത്യയിൽ 5 പുതിയ നഗരങ്ങളിലേക്ക് ഇത്തിഹാസ സേവനം വ്യാപിപ്പിക്കുന്നു",
    },
    excerpt: {
      en: "We're excited to announce our expansion to Jaipur, Lucknow, Indore, Bhopal, and Coimbatore.",
      ml: "ജയ്പൂർ, ലഖ്നൗ, ഇൻഡോർ, ഭോപ്പാൽ, കോയമ്പത്തൂർ എന്നിവിടങ്ങളിലേക്ക് സേവനം വ്യാപിപ്പിക്കുന്നതായി സന്തോഷത്തോടെ അറിയിക്കുന്നു.",
    },
    content: {
      en: `
## Expanding Our Reach

Ithihasam is proud to announce its expansion into five new cities: Jaipur, Lucknow, Indore, Bhopal, and Coimbatore.

This brings our total service coverage to over 15 cities across India, making quality home services accessible to millions more homeowners.

## What This Means for You

Residents in these new cities can now book all our services including electrical, plumbing, painting, carpentry, deep cleaning, and more through our platform.

## Our Commitment

We're committed to maintaining the same high standards of service quality that our existing customers trust us for.
      `,
      ml: `
## കൂടുതൽ നഗരങ്ങളിലേക്ക് സേവനം

ജയ്പൂർ, ലഖ്നൗ, ഇൻഡോർ, ഭോപ്പാൽ, കോയമ്പത്തൂർ എന്നിവിടങ്ങളിലേക്ക് ഇത്തിഹാസ സേവനം വ്യാപിപ്പിക്കുന്നതായി അഭിമാനത്തോടെ അറിയിക്കുന്നു.

ഇതോടെ ഇന്ത്യയിലെ 15-ൽ കൂടുതൽ നഗരങ്ങളിൽ ഗുണമേന്മയുള്ള ഹോം സർവീസുകൾ കൂടുതൽ കുടുംബങ്ങളിലെത്തും.

## ഉപഭോക്താക്കൾക്ക് ലഭിക്കുന്ന ഗുണം

ഈ പുതിയ നഗരങ്ങളിലെ ഉപഭോക്താക്കൾക്കും ഇലക്ട്രിക്കൽ, പ്ലമ്പിംഗ്, പെയിന്റിംഗ്, കാർപെൻട്രി, ഡീപ് ക്ലീനിംഗ് തുടങ്ങിയ സേവനങ്ങൾ എളുപ്പത്തിൽ ബുക്ക് ചെയ്യാം.

## ഞങ്ങളുടെ വാഗ്ദാനം

നമ്മളെ വിശ്വസിക്കുന്ന നിലവിലെ ഉപഭോക്താക്കൾക്ക് നൽകുന്ന അതേ ഗുണമേന്മയുള്ള സേവനം പുതിയ നഗരങ്ങളിലേക്കും എത്തിക്കും.
      `,
    },
  },
  {
    slug: "annual-home-cleaning-drive-2026",
    image: bannerCleaning,
    date: "2026-03-25",
    category: { en: "Community", ml: "സമൂഹം" },
    title: {
      en: "Ithihasam Launches Annual Home Cleaning Drive 2026",
      ml: "ഇത്തിഹാസ വാർഷിക ഹോം ക്ലീനിംഗ് ഡ്രൈവ് 2026 ആരംഭിച്ചു",
    },
    excerpt: {
      en: "Join our community initiative. Free deep cleaning for 100 homes this summer.",
      ml: "സമൂഹ പങ്കാളിത്ത പ്രവർത്തനത്തിന്റെ ഭാഗമായി ഈ വേനലിൽ 100 വീടുകൾക്ക് സൗജന്യ ഡീപ് ക്ലീനിംഗ്.",
    },
    content: {
      en: `
## Giving Back to Our Community

Ithihasam is launching its annual Home Cleaning Drive, offering free deep cleaning services to 100 deserving homes across India.

## Who Can Apply?

- Senior citizens living alone
- Families with special needs members
- Community centers and NGO offices
- Low-income households

## How to Apply

Fill out our application form on the website or contact us via WhatsApp.
      `,
      ml: `
## സമൂഹത്തിനായി ഒരു കൈത്താങ്ങ്

ഇന്ത്യയിലെ 100 അർഹമായ വീടുകൾക്ക് സൗജന്യ ഡീപ് ക്ലീനിംഗ് നൽകുന്ന വാർഷിക ഹോം ക്ലീനിംഗ് ഡ്രൈവ് ഇത്തിഹാസ ആരംഭിക്കുന്നു.

## ആരെല്ലാം അപേക്ഷിക്കാം?

- ഒറ്റയ്ക്ക് കഴിയുന്ന മുതിർന്ന പൗരൻമാർ
- പ്രത്യേക പരിചരണം ആവശ്യമുള്ള അംഗങ്ങളുള്ള കുടുംബങ്ങൾ
- കമ്മ്യൂണിറ്റി സെന്ററുകൾ, എൻജിഒ ഓഫീസുകൾ
- കുറഞ്ഞ വരുമാനമുള്ള കുടുംബങ്ങൾ

## അപേക്ഷിക്കാൻ

വെബ്സൈറ്റിലെ ഫോം പൂരിപ്പിക്കുകയോ വാട്ട്സ്ആപ്പിലൂടെ ബന്ധപ്പെടുകയോ ചെയ്യാം.
      `,
    },
  },
  {
    slug: "new-carpentry-workshop-program",
    image: bannerCarpentry,
    date: "2026-03-10",
    category: { en: "Training", ml: "പരിശീലനം" },
    title: {
      en: "Ithihasam Partners with ITIs for Carpentry Skill Development",
      ml: "കാർപെൻട്രി സ്കിൽ ഡെവലപ്പ്മെന്റിനായി ITIകളുമായി ഇത്തിഹാസ പങ്കാളിത്തം",
    },
    excerpt: {
      en: "Our partnership with ITIs will train aspiring carpenters with industry-ready skills.",
      ml: "ITIകളുമായി ചേർന്ന് പുതുതലമുറ കാർപെൻറർമാരെ വ്യവസായസജ്ജമായ കഴിവുകളോടെ പരിശീലിപ്പിക്കും.",
    },
    content: {
      en: `
## Building Skills, Building Futures

Ithihasam has partnered with Industrial Training Institutes to launch a comprehensive carpentry skill development program.

## Program Details

- Modern carpentry techniques
- Power tool safety and operation
- Modular furniture design and installation
- Customer service and professionalism

## Impact

The program aims to build a pipeline of qualified professionals for the Ithihasam network.
      `,
      ml: `
## കഴിവ് വളർത്തി ഭാവി നിർമ്മിക്കുക

കാർപെൻട്രി മേഖലയിലെ സമഗ്രമായ പരിശീലന പരിപാടിക്കായി Industrial Training Institutes-ുമായി ഇത്തിഹാസ ചേർന്നിരിക്കുന്നു.

## പരിപാടിയിൽ ഉൾപ്പെടുന്നത്

- ആധുനിക കാർപെൻട്രി ടെക്നിക്കുകൾ
- പവർ ടൂൾ സുരക്ഷയും ഉപയോഗവും
- മോഡുലാർ ഫർണിച്ചർ ഡിസൈൻ & ഇൻസ്റ്റലേഷൻ
- കസ്റ്റമർ സർവീസ് & പ്രൊഫഷണലിസം

## പ്രതിഫലം

ഇത്തിഹാസ നെറ്റ്‌വർക്കിനായി യോഗ്യരായ പ്രൊഫഷണലുകളുടെ ഒരു ശക്തമായ അടിത്തറ സൃഷ്ടിക്കുകയാണ് ലക്ഷ്യം.
      `,
    },
  },
];

export default function News() {
  const { formatDate, lang, t } = useLang();
  const newsKeywords = createKeywordSet(
    "Ithihasam news",
    "home services news Kannur",
    "home services news Thrissur",
    "company updates Kerala home maintenance",
    "cleaning drive news",
    "carpentry training Kerala",
    "service expansion news",
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Ithihasam News and Updates | Home Services, Community, Growth"
        description="Read the latest Ithihasam news, service expansion updates, community initiatives, and training stories connected to home maintenance services in Kerala."
        keywords={newsKeywords}
        image={newsArticles[0]?.image}
      />
      <Header />

      <section className="bg-primary py-16">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-3xl font-bold text-primary-foreground md:text-4xl"
          >
            {t("news.title")}
          </motion.h1>
          <p className="text-primary-foreground/80">{t("news.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="space-y-8">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group grid overflow-hidden rounded-xl border bg-card shadow-[var(--card-shadow)] md:grid-cols-3"
              >
                <div className="relative h-48 overflow-hidden md:h-full">
                  <img
                    src={article.image}
                    alt={article.title[lang]}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {article.category[lang]}
                  </span>
                </div>
                <div className="p-6 md:col-span-2">
                  <span className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {formatDate(article.date)}
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-foreground">{article.title[lang]}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{article.excerpt[lang]}</p>
                  <Link
                    to={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {t("news.readMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
