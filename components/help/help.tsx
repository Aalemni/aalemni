"use client";

import { useState } from "react";
import {
  Search,
  HelpCircle,
  BookOpen,
  MessageCircle,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Help categories
const helpCategories = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Learn the basics of using Aalemni",
    articles: [
      "How to create an account",
      "Navigating the platform",
      "Finding the right course",
      "Understanding course formats",
    ],
  },
  {
    title: "Account & Profile",
    icon: <Settings className="h-5 w-5" />,
    description: "Manage your account settings",
    articles: [
      "Updating your profile",
      "Changing your password",
      "Managing notifications",
      "Privacy settings",
    ],
  },
  {
    title: "Courses & Learning",
    icon: <FileText className="h-5 w-5" />,
    description: "Everything about taking courses",
    articles: [
      "Enrolling in a course",
      "Course completion requirements",
      "Downloading certificates",
      "Accessing course materials",
    ],
  },
  {
    title: "Payments & Billing",
    icon: <FileText className="h-5 w-5" />,
    description: "Information about payments",
    articles: [
      "Payment methods",
      "Refund policy",
      "Subscription plans",
      "Invoice requests",
    ],
  },
  {
    title: "Technical Support",
    icon: <Settings className="h-5 w-5" />,
    description: "Resolve technical issues",
    articles: [
      "Troubleshooting video playback",
      "Browser compatibility",
      "Mobile app support",
      "Connection issues",
    ],
  },
  {
    title: "For Instructors",
    icon: <MessageCircle className="h-5 w-5" />,
    description: "Help for course creators",
    articles: [
      "Creating your first course",
      "Instructor dashboard guide",
      "Payment processing",
      "Course promotion tips",
    ],
  },
];

// Popular FAQs
const popularFaqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, navigate to the course page and click the 'Enroll' button. If it's a paid course, you'll be directed to the payment page. Once enrolled, you'll have immediate access to the course content.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Aalemni accepts various payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for certain regions. All payments are processed securely through our payment partners.",
  },
  {
    question: "How do I get a certificate?",
    answer:
      "Certificates are automatically issued upon successful completion of a course. To receive a certificate, you must complete all required modules and pass any assessments with the minimum required score. Certificates can be downloaded from your account dashboard.",
  },
  {
    question: "Can I access courses on mobile devices?",
    answer:
      "Yes, Aalemni is fully responsive and can be accessed on any device with a web browser. We also offer dedicated mobile apps for iOS and Android for an optimized mobile learning experience.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee for most courses. If you're unsatisfied with your purchase, you can request a refund within 30 days of enrollment, provided you haven't completed more than 30% of the course content.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <HelpCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Find answers to your questions and learn how to get the most out of
          Aalemni.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for help articles..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Help Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Browse Help Topics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {category.description}
                    </p>
                    <ul className="space-y-1">
                      {category.articles.map((article, idx) => (
                        <li key={idx} className="text-sm">
                          <a
                            href="#"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <ChevronRight className="h-3 w-3 mr-1" />
                            {article}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular FAQs */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {popularFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-muted p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          If you couldn't find the answer you were looking for, our support team
          is ready to assist you.
        </p>
        <Button asChild size="lg">
          <a href="/contact">Contact Support</a>
        </Button>
      </section>
    </div>
  );
}
