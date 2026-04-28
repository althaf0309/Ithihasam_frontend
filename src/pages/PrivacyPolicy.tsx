import { LegalPage } from "@/components/LegalPage";
import { privacyPolicyContent } from "@/lib/legal-content";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      content={privacyPolicyContent}
      seoTitle="Privacy Policy | Ithihasam"
      seoDescription="Read the Ithihasam Privacy Policy to understand how booking, contact, WhatsApp, and website information is collected, used, stored, and protected."
      seoKeywords={[
        "Ithihasam privacy policy",
        "privacy policy home services",
        "booking privacy policy",
        "website data policy",
        "Kannur Thrissur home services privacy",
      ]}
      canonicalPath="/privacy-policy"
    />
  );
}
