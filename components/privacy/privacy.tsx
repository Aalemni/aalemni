"use server";
import { format } from "date-fns";

export default async function PrivacyPage() {
  const currentDate = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">
        Effective Date: {currentDate}
      </p>

      <div className="prose prose-lg max-w-none">
        <p className="lead">
          Welcome to Aalemni! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your personal
          information when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Information We Collect
        </h2>
        <p>We collect the following types of information:</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Personal Information: Name, email, phone number, and payment
            details.
          </li>
          <li>
            Usage Data: Course enrollments, activity logs, and preferences.
          </li>
          <li>
            Device Information: IP address, browser type, and operating system.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. How We Use Your Information
        </h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>Provide and enhance our platform services.</li>
          <li>Process payments and manage transactions.</li>
          <li>Personalize course recommendations.</li>
          <li>Communicate important updates and marketing promotions.</li>
          <li>Ensure platform security and prevent fraud.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Data Sharing and Disclosure
        </h2>
        <p>
          We do not sell your personal data. However, we may share your data
          with:
        </p>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Service Providers: Payment processors, hosting services, and
            analytics providers.
          </li>
          <li>
            Legal Authorities: If required by law or to protect our rights.
          </li>
          <li>Trainers: To facilitate course interactions and feedback.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
        <p>
          We implement security measures to protect your data from unauthorized
          access, alteration, or destruction. However, no method of transmission
          over the internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>Access, update, or delete your personal information.</li>
          <li>Opt out of marketing emails.</li>
          <li>Request a copy of your stored data.</li>
        </ul>
        <p className="mt-2">
          To exercise your rights, contact us at privacy@aalemni.com.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Cookies and Tracking Technologies
        </h2>
        <p>
          Aalemni uses cookies to improve your experience. You can manage cookie
          settings in your browser.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          7. Third-Party Links
        </h2>
        <p>
          Our platform may contain links to third-party websites. We are not
          responsible for their privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          8. Changes to this Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. Continued use of
          Aalemni after updates means you accept the revised policy.
        </p>

        <p className="mt-8">
          For questions or concerns, contact us at privacy@aalemni.com.
        </p>
      </div>
    </div>
  );
}
