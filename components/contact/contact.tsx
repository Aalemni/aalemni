"use client";

import type React from "react";

import { useState } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqs = [
  {
    question: "How can I enroll in a course?",
    answer:
      "To enroll in a course, navigate to the course page and click the 'Enroll' button. If it's a paid course, you'll be directed to the payment page. Once enrolled, you'll have immediate access to the course content.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Aalemni accepts various payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for certain regions. All payments are processed securely through our payment partners.",
  },
  {
    question: "How do I become an instructor?",
    answer:
      "To become an instructor, visit our 'Become an Instructor' page and fill out the application form. Our team will review your application and get back to you within 5 business days. Approved instructors will receive access to our course creation tools and resources.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, we offer a 30-day money-back guarantee for most courses. If you're unsatisfied with your purchase, you can request a refund within 30 days of enrollment, provided you haven't completed more than 30% of the course content.",
  },
  {
    question: "How do I contact an instructor?",
    answer:
      "You can contact an instructor directly through the course discussion forum or by sending them a message through their profile page. Most instructors respond within 24-48 hours.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Get in Touch with Aalemni</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question, feedback, or need assistance? We're here to help!
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
                  Your message has been sent! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Select
                      onValueChange={handleSelectChange}
                      value={formData.subject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Inquiry">
                          General Inquiry
                        </SelectItem>
                        <SelectItem value="Course Support">
                          Course Support
                        </SelectItem>
                        <SelectItem value="Instructor Registration">
                          Instructor Registration
                        </SelectItem>
                        <SelectItem value="Technical Issue">
                          Technical Issue
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Support & Helpdesk</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <a
                      href="mailto:support@aalemni.com"
                      className="text-blue-600 hover:underline"
                    >
                      support@aalemni.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p>+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri, 9AM-5PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <Button variant="outline" size="sm" className="mt-1">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Stay Connected</h2>

              <div className="grid grid-cols-5 gap-4">
                <a href="#" className="flex flex-col items-center">
                  <div className="bg-primary/10 p-2 rounded-full mb-1">
                    <Facebook className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs">Facebook</span>
                </a>

                <a href="#" className="flex flex-col items-center">
                  <div className="bg-primary/10 p-2 rounded-full mb-1">
                    <Twitter className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs">Twitter</span>
                </a>

                <a href="#" className="flex flex-col items-center">
                  <div className="bg-primary/10 p-2 rounded-full mb-1">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs">LinkedIn</span>
                </a>

                <a href="#" className="flex flex-col items-center">
                  <div className="bg-primary/10 p-2 rounded-full mb-1">
                    <Instagram className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs">Instagram</span>
                </a>

                <a href="#" className="flex flex-col items-center">
                  <div className="bg-primary/10 p-2 rounded-full mb-1">
                    <Youtube className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs">YouTube</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find quick answers to common questions
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
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

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <a href="/help">View All FAQs</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
