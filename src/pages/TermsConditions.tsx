import { LegalPage } from "@/components/LegalPage";
import { termsConditionsContent } from "@/lib/legal-content";

export default function TermsConditions() {
  return (
    <LegalPage
      content={termsConditionsContent}
      seoTitle="Terms & Conditions | Ithihasam"
      seoDescription="Read the Ithihasam Terms & Conditions for website usage, service bookings, pricing, cancellations, warranties, and customer responsibilities."
      seoKeywords={[
        "Ithihasam terms and conditions",
        "service booking terms",
        "home maintenance booking policy",
        "cancellation policy home services",
        "Kannur Thrissur service terms",
      ]}
      canonicalPath="/terms-and-conditions"
    />
  );
}
