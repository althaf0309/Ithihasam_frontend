import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { newsArticles } from "./News";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Article not found</h1>
          <Link to="/news" className="mt-4 inline-block text-primary underline">Back to News</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="relative h-[300px] overflow-hidden md:h-[400px]">
        <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8">
            <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{article.category}</span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-primary-foreground md:text-4xl">
              {article.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-10">
        <Link to="/news" className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft size={14} /> Back to News
        </Link>
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={14} />
          {new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </div>
        <article>
          {article.content.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("## ")) return <h2 key={i} className="mt-8 mb-3 text-xl font-bold text-foreground">{trimmed.replace("## ", "")}</h2>;
            if (trimmed.startsWith("- ")) return <li key={i} className="mb-1 ml-4 text-sm text-muted-foreground list-disc">{trimmed.replace("- ", "")}</li>;
            if (trimmed === "") return null;
            return <p key={i} className="mb-3 leading-relaxed text-muted-foreground">{trimmed}</p>;
          })}
        </article>
      </div>

      <Footer />
    </div>
  );
}
