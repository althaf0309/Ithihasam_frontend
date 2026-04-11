import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";

export const newsArticles = [
  {
    slug: "ithihasa-expands-to-5-new-cities",
    title: "Ithihasa Expands Services to 5 New Cities Across India",
    excerpt: "We're excited to announce our expansion to Jaipur, Lucknow, Indore, Bhopal, and Coimbatore. Quality home services now available in 15+ cities.",
    image: bannerElectrical,
    date: "2026-04-08",
    category: "Company News",
    content: `
## Expanding Our Reach

Ithihasa is proud to announce its expansion into five new cities: Jaipur, Lucknow, Indore, Bhopal, and Coimbatore.

This brings our total service coverage to over 15 cities across India, making quality home services accessible to millions more homeowners.

## What This Means for You

Residents in these new cities can now book all our services including electrical, plumbing, painting, carpentry, deep cleaning, and more through our platform.

## Our Commitment

We're committed to maintaining the same high standards of service quality that our existing customers trust us for. All professionals in new cities undergo the same rigorous verification and training process.

## Launch Offers

To celebrate our expansion, we're offering 20% off on all first-time bookings in these new cities. Use code NEWCITY20 at checkout!
    `,
  },
  {
    slug: "annual-home-cleaning-drive-2026",
    title: "Ithihasa Launches Annual Home Cleaning Drive 2026",
    excerpt: "Join our community initiative! Free deep cleaning for 100 homes this summer. Apply now to participate.",
    image: bannerCleaning,
    date: "2026-03-25",
    category: "Community",
    content: `
## Giving Back to Our Community

Ithihasa is launching its annual Home Cleaning Drive, offering free deep cleaning services to 100 deserving homes across India.

## Who Can Apply?

The drive is open to:
- Senior citizens living alone
- Families with special needs members
- Community centers and NGO offices
- Low-income households

## How to Apply

Fill out our application form on the website or contact us via WhatsApp. Our team will review applications and notify selected homes by April 30, 2026.

## Volunteer Opportunities

Want to help? We're also looking for volunteers to assist our professional teams during the drive. Contact us to learn more.

## Sponsors Welcome

If your organization would like to sponsor additional homes, we'd love to partner with you. Together, we can make more homes cleaner and healthier.
    `,
  },
  {
    slug: "new-carpentry-workshop-program",
    title: "Ithihasa Partners with ITIs for Carpentry Skill Development",
    excerpt: "Our new partnership with Industrial Training Institutes will train 500 aspiring carpenters with industry-ready skills.",
    image: bannerCarpentry,
    date: "2026-03-10",
    category: "Training",
    content: `
## Building Skills, Building Futures

Ithihasa has partnered with 10 Industrial Training Institutes (ITIs) across Maharashtra and Karnataka to launch a comprehensive carpentry skill development program.

## Program Details

The 6-month program covers:
- Modern carpentry techniques
- Power tool safety and operation
- Modular furniture design and installation
- Customer service and professionalism
- Digital skills for booking and communication

## Impact

We aim to train 500 aspiring carpenters in the first year, providing them with certified skills and guaranteed placement opportunities within the Ithihasa network.

## Why This Matters

India faces a shortage of skilled carpenters. By investing in training, we're building a pipeline of qualified professionals while creating meaningful employment opportunities.

## Join the Program

Interested candidates can apply through their nearest ITI or contact Ithihasa directly. The next batch starts May 2026.
    `,
  },
];

export default function News() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary py-16">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-3xl font-bold text-primary-foreground md:text-4xl"
          >
            News & Updates
          </motion.h1>
          <p className="text-primary-foreground/80">Stay updated with the latest from Ithihasa</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="space-y-8">
            {newsArticles.map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group grid overflow-hidden rounded-xl border bg-card shadow-[var(--card-shadow)] md:grid-cols-3"
              >
                <div className="relative h-48 overflow-hidden md:h-full">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {article.category}
                  </span>
                </div>
                <div className="p-6 md:col-span-2">
                  <span className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-foreground">{article.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{article.excerpt}</p>
                  <Link
                    to={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Read Full Story <ArrowRight size={14} />
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
