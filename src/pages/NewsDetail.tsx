import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { createKeywordSet } from "@/lib/seo";
import { newsArticles } from "./News";
import { useLang } from "@/contexts/LangContext";

type ArticleBlock =
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "paragraph"; text: string };

/**
 * Parses the mini-markdown used by news entries into blocks.
 *
 * Consecutive "- " lines are gathered into one list. The previous version
 * emitted bare <li> elements with no <ul> parent, which is invalid HTML and
 * drops the list semantics screen readers and crawlers depend on.
 */
function parseArticleBlocks(content: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({ kind: "heading", text: trimmed.slice(3) });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const previous = blocks[blocks.length - 1];
      if (previous?.kind === "list") {
        previous.items.push(trimmed.slice(2));
      } else {
        blocks.push({ kind: "list", items: [trimmed.slice(2)] });
      }
      continue;
    }

    blocks.push({ kind: "paragraph", text: trimmed });
  }

  return blocks;
}

function renderArticleBlocks(content: string) {
  return parseArticleBlocks(content).map((block, index) => {
    if (block.kind === "heading") {
      return (
        <h2 key={index} className="mb-3 mt-8 text-xl font-bold text-foreground">
          {block.text}
        </h2>
      );
    }

    if (block.kind === "list") {
      return (
        <ul key={index} className="mb-3 ml-6 list-disc space-y-1">
          {block.items.map((item) => (
            <li key={item} className="text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={index} className="mb-3 leading-relaxed text-muted-foreground">
        {block.text}
      </p>
    );
  });
}

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
    "Kannur district home services",
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={`${article.title.en} | Ithihasam News`}
        description={article.excerpt[lang]}
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
        <Breadcrumbs
          className="mb-4"
          items={[{ label: "Home", to: "/" }, { label: "News", to: "/news" }, { label: article.title[lang] }]}
        />
        <Link to="/news" className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft size={14} /> {t("news.back")}
        </Link>
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={14} />
          {formatDate(article.date)}
        </div>
        <article>{renderArticleBlocks(article.content[lang])}</article>
      </div>

      <Footer />
    </div>
  );
}
