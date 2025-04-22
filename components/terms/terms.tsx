"use server";
import { format } from "date-fns";

export default async function TermsPage() {
  const currentDate = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-muted-foreground mb-8">
        Effective Date: {currentDate}
      </p>

      <div className="prose prose-lg max-w-none">
        <p className="lead">
          Welcome to Aalemni! By accessing or using our platform, you agree to
          the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p>
          Aalemni is an online platform connecting trainers with students for
          interactive courses and workshops. These Terms and Conditions govern
          your use of Aalemni's website, mobile application, and services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Accounts</h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>To access certain features, users must create an account.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials.
          </li>
          <li>
            Aalemni reserves the right to suspend or terminate accounts that
            violate these terms.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Trainer Responsibilities
        </h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Trainers must provide accurate course information and deliver
            content as promised.
          </li>
          <li>
            Trainers agree to comply with Aalemni's pricing, payment, and refund
            policies.
          </li>
          <li>
            Aalemni reserves the right to remove any misleading or inappropriate
            content.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          4. Student Responsibilities
        </h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Students must adhere to course guidelines and community standards.
          </li>
          <li>
            Payments for courses or workshops must be made as per Aalemni's
            policies.
          </li>
          <li>
            Unauthorized distribution of course content is strictly prohibited.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Payment & Fees</h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>Aalemni facilitates payments between students and trainers.</li>
          <li>
            Aalemni takes a commission based on the selected subscription plan.
          </li>
          <li>
            All transactions must comply with Aalemni's secure payment system.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Refund Policy</h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Refunds are subject to course completion rates and Aalemni's refund
            policy.
          </li>
          <li>
            Students may request a refund if a trainer fails to deliver the
            promised content.
          </li>
          <li>
            Trainers will be notified of any refund requests and have the
            opportunity to respond.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          7. Community & Code of Conduct
        </h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Aalemni fosters a positive and inclusive learning environment.
          </li>
          <li>
            Users must respect others and avoid harassment, discrimination, or
            misconduct.
          </li>
          <li>
            Violations may result in warnings, suspension, or permanent account
            removal.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          8. Intellectual Property
        </h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Trainers retain ownership of their course materials but grant
            Aalemni the right to host and distribute them on the platform.
          </li>
          <li>
            Unauthorized reproduction or distribution of content is prohibited.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          9. Limitation of Liability
        </h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Aalemni is a facilitator and is not responsible for the actions or
            content of trainers or students.
          </li>
          <li>We do not guarantee success in any course or workshop.</li>
          <li>Users agree to use the platform at their own risk.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Privacy Policy</h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            Aalemni collects and processes user data per our Privacy Policy.
          </li>
          <li>We do not sell personal data to third parties.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          11. Modifications to Terms
        </h2>
        <ul className="list-disc pl-8 space-y-1">
          <li>Aalemni may update these Terms from time to time.</li>
          <li>
            Continued use of the platform after updates constitutes acceptance
            of the revised Terms.
          </li>
        </ul>

        <p className="mt-8">
          For any questions or concerns, please contact us at
          aalemni.co@gmail.com.
        </p>

        <p className="mt-4">
          By using Aalemni, you acknowledge and agree to these Terms and
          Conditions.
        </p>
      </div>
    </div>
  );
}
