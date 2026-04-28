export interface LegalSection {
  title: {
    en: string;
    ml: string;
  };
  paragraphs?: Array<{
    en: string;
    ml: string;
  }>;
  bullets?: Array<{
    en: string;
    ml: string;
  }>;
}

export interface LegalPageContent {
  badge: {
    en: string;
    ml: string;
  };
  title: {
    en: string;
    ml: string;
  };
  subtitle: {
    en: string;
    ml: string;
  };
  effectiveDateLabel: {
    en: string;
    ml: string;
  };
  effectiveDate: string;
  sections: LegalSection[];
}

const same = (value: string) => ({ en: value, ml: value });

export const privacyPolicyContent: LegalPageContent = {
  badge: same("Privacy Policy"),
  title: same("How Ithihasam Collects and Uses Your Information"),
  subtitle: same(
    "This policy explains what data we collect through our website, booking forms, calls, WhatsApp, and email, and how we use that information to deliver services.",
  ),
  effectiveDateLabel: same("Effective Date"),
  effectiveDate: "April 25, 2026",
  sections: [
    {
      title: same("Information We Collect"),
      bullets: [
        same("Contact details such as your name, phone number, WhatsApp number, email address, and location or service area."),
        same("Booking details such as the service requested, preferred date, property details, and any notes or photos you share."),
        same("Technical information such as device type, browser, pages visited, and basic analytics used to improve website performance."),
      ],
    },
    {
      title: same("How We Use Your Information"),
      bullets: [
        same("To respond to enquiries, confirm bookings, assign professionals, and provide home maintenance services."),
        same("To contact you by phone, WhatsApp, SMS, or email about your request, scheduling, updates, invoices, or support."),
        same("To improve our website, service quality, operational planning, and customer experience across Kannur, Thrissur, and other service areas."),
      ],
    },
    {
      title: same("Sharing of Information"),
      paragraphs: [
        same("We may share relevant booking details with our internal team, service professionals, technology providers, and communication partners only to the extent needed to operate the service. We do not sell your personal information to unrelated third parties."),
      ],
    },
    {
      title: same("Data Retention and Security"),
      paragraphs: [
        same("We keep personal data only for as long as it is reasonably required for bookings, customer support, legal compliance, dispute handling, internal records, and service follow-up. We use reasonable administrative and technical safeguards, but no online platform can promise absolute security."),
      ],
    },
    {
      title: same("Your Choices"),
      bullets: [
        same("You may ask us to update or correct inaccurate personal information."),
        same("You may request that we stop promotional communication, while still receiving essential booking or service updates."),
        same("You may contact us if you want to know what booking information we currently hold about you."),
      ],
    },
    {
      title: same("Cookies and Analytics"),
      paragraphs: [
        same("Our website may use cookies, local storage, and analytics tools to remember language preferences, improve performance, understand page usage, and support future marketing. You can control cookies through your browser settings."),
      ],
    },
    {
      title: same("Contact Us About Privacy"),
      paragraphs: [
        same("If you have questions about this Privacy Policy or how your booking information is handled, please contact Ithihasam through our listed phone number, WhatsApp support, or support email."),
      ],
    },
  ],
};

export const termsConditionsContent: LegalPageContent = {
  badge: same("Terms & Conditions"),
  title: same("Terms for Using the Ithihasam Website and Booking Services"),
  subtitle: same(
    "These terms explain the rules for using our website, requesting service, receiving quotations, and working with Ithihasam professionals.",
  ),
  effectiveDateLabel: same("Effective Date"),
  effectiveDate: "April 25, 2026",
  sections: [
    {
      title: same("Acceptance of Terms"),
      paragraphs: [
        same("By using the Ithihasam website, contacting us, or submitting a booking or enquiry, you agree to these Terms & Conditions. If you do not agree, please do not use the website or place a booking through it."),
      ],
    },
    {
      title: same("Service Requests and Availability"),
      bullets: [
        same("Submitting a booking request does not guarantee immediate confirmation or technician availability."),
        same("Service timing may vary based on location, workload, weather, material availability, and the nature of the work."),
        same("Some jobs may require inspection, revised scope, or a fresh quotation before work begins."),
      ],
    },
    {
      title: same("Pricing and Payments"),
      paragraphs: [
        same("Prices shown on the website, shared by phone, or discussed over WhatsApp are indicative unless explicitly confirmed. Final charges may change depending on inspection findings, materials used, job complexity, extra work requested, or access conditions at the property."),
      ],
    },
    {
      title: same("Customer Responsibilities"),
      bullets: [
        same("Provide accurate contact details, service requirements, and location information when placing a booking."),
        same("Ensure safe and reasonable access to the property, work area, electricity, water, or permissions needed to complete the service."),
        same("Review the work and raise any genuine issues within a reasonable time after completion."),
      ],
    },
    {
      title: same("Cancellations and Rescheduling"),
      paragraphs: [
        same("If you need to cancel or reschedule, please inform us as early as possible. Repeated last-minute cancellations, non-availability at the property, or incorrect service details may affect future booking priority and may lead to visit charges where applicable."),
      ],
    },
    {
      title: same("Warranties and Limitations"),
      paragraphs: [
        same("Any workmanship support or service warranty depends on the specific service, scope, and materials involved. Normal wear and tear, pre-existing defects, customer-supplied materials, structural issues, misuse, or work altered by others may be excluded."),
      ],
    },
    {
      title: same("Website Content and Intellectual Property"),
      paragraphs: [
        same("The website design, logos, brand assets, text, graphics, and content published by Ithihasam are protected by applicable intellectual property rights. You may not copy, republish, or commercially exploit them without permission."),
      ],
    },
    {
      title: same("Liability"),
      paragraphs: [
        same("To the maximum extent allowed by law, Ithihasam is not liable for indirect, incidental, special, or consequential losses arising from website use, booking delays, third-party interruptions, or conditions outside reasonable control. Nothing in these terms excludes liability that cannot legally be excluded."),
      ],
    },
    {
      title: same("Changes to These Terms"),
      paragraphs: [
        same("We may update these Terms & Conditions from time to time to reflect operational, legal, or business changes. The updated version published on this website will apply from its effective date."),
      ],
    },
  ],
};
