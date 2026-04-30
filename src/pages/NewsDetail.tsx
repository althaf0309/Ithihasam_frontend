import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { createKeywordSet } from "@/lib/seo";
import { newsArticles } from "./News";
import { useLang } from "@/contexts/LangContext";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { formatDate, lang, t } = useLang();
  const article = newsArticles.find((entry) => entry.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <SeoMeta
          title="News Article Not Found | Ithihasam"
          description="The requested Ithihasam news article could not be found."
          keywords={["Ithihasam news", "home services news", "news article not found"]}
          robots="noindex, nofollow"
          canonicalPath={slug ? `/news/${slug}` : "/news"}
        />
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t("news.notFound")}</h1>
          <Link to="/news" className="mt-4 inline-block text-primary underline">{t("news.back")}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pageKeywords = createKeywordSet(
    article.category.en,
    article.title.en,
    article.slug.replace(/-/g, " "),
    "Ithihasam news",
    "Kerala home services",
    "Kannur home services",
    "Thrissur home services",
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={`${article.title.en} | Ithihasam News`}
        description={article.excerpt.en}
        keywords={pageKeywords}
        image={article.image}
        type="article"
        publishedTime={article.date}
        canonicalPath={`/news/${article.slug}`}
      />
      <Header />

      <div className="relative h-[300px] overflow-hidden md:h-[400px]">
        <img src={article.image} alt={article.title[lang]} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8">
            <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{article.category[lang]}</span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-primary-foreground md:text-4xl">
              {article.title[lang]}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-10">
        <Link to="/news" className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft size={14} /> {t("news.back")}
        </Link>
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={14} />
          {formatDate(article.date)}
        </div>
        <article>
          {article.content[lang].split("\n").map((line, index) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("## ")) {
              return <h2 key={index} className="mb-3 mt-8 text-xl font-bold text-foreground">{trimmed.replace("## ", "")}</h2>;
            }
            if (trimmed.startsWith("- ")) {
              return <li key={index} className="mb-1 ml-4 list-disc text-sm text-muted-foreground">{trimmed.replace("- ", "")}</li>;
            }
            if (!trimmed) {
              return null;
            }
            return <p key={index} className="mb-3 leading-relaxed text-muted-foreground">{trimmed}</p>;
          })}
        </article>
      </div>

      <Footer />
    </div>
  );
}
