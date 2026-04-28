import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { SeoMeta } from "@/components/SeoMeta";
import { fetchBlogPost } from "@/lib/api";
import { resolveContentImage } from "@/lib/content-images";
import { createKeywordSet, extractPlainText, truncateText } from "@/lib/seo";
import { useLang } from "@/contexts/LangContext";

export default function BlogDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { formatDate, t } = useLang();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SeoMeta
          title="Loading Blog Article | Ithihasam"
          description="Browse the latest Ithihasam blog articles on home maintenance and local home services."
          keywords={["Ithihasam blog", "home maintenance blog", "Kannur home services", "Thrissur home services"]}
        />
        <Header />
        <div className="container py-20 text-center text-muted-foreground">{t("blog.loading")}</div>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-background">
        <SeoMeta
          title="Blog Article Not Found | Ithihasam"
          description="The requested blog article could not be found. Browse more home maintenance tips from Ithihasam."
          keywords={["blog article not found", "Ithihasam blog", "home maintenance tips"]}
          robots="noindex, nofollow"
        />
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">{t("blog.notFound")}</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary underline">{t("blog.back")}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const coverImage = resolveContentImage(post.cover_image);
  const pageDescription = post.meta_description || truncateText(extractPlainText(post.excerpt || post.content));
  const pageKeywords = createKeywordSet(
    post.category,
    post.title,
    post.slug.replace(/-/g, " "),
    "Ithihasam blog",
    "home maintenance blog Kannur",
    "home maintenance blog Thrissur",
    "electrical plumbing painting cleaning tips",
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title={post.meta_title || `${post.title} | Ithihasam Blog`}
        description={pageDescription}
        keywords={pageKeywords}
        image={coverImage}
        type="article"
        publishedTime={post.published_at}
      />
      <Header />

      <div className="relative h-[300px] overflow-hidden md:h-[400px]">
        <img src={coverImage} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8">
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{post.category}</span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-primary-foreground md:text-4xl">
              {post.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft size={14} /> {t("blog.back")}
        </Link>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User size={14} /> {post.author_name}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.published_at)}</span>
              <span>{post.read_time_minutes} {t("blog.readTime")}</span>
            </div>
            <article
              className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-img:rounded-2xl prose-img:shadow-[var(--card-shadow)]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <aside className="lg:sticky lg:top-24">
            <QuickBookingForm compact showMessageField />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
