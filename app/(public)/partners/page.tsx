import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Building,
  GraduationCap,
  Globe,
  Award,
  Users,
  Handshake,
  Lightbulb,
  BarChart,
  MessageSquare,
  FileText,
  Rocket,
} from "lucide-react";

import { Button } from "@/components/uii_/button";
import { Badge } from "@/components/uii_/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PartnersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-aalemni-navy/10 via-background to-background pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <Badge
                className="mb-4 w-fit bg-aalemni-orange text-white"
                variant="outline"
              >
                Strategic Partnerships
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-aalemni-navy sm:text-5xl md:text-6xl">
                Partner with Aalemni
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Join forces with Aalemni to expand educational opportunities,
                reach new audiences, and make a lasting impact on learners
                worldwide.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                  asChild
                >
                  <Link href="#become-partner">Become a Partner</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
                  asChild
                >
                  <Link href="#current-partners">Our Partners</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-lg rounded-lg border bg-background shadow-xl">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=720&width=1280&text=Partnership+Program"
                    alt="Aalemni Partnership Program"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-aalemni-navy">
                    Collaborative Success
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Discover how our partnerships create value for organizations
                    and learners alike.
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-aalemni-orange/10 blur-3xl"></div>
              <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-aalemni-blue/10 blur-3xl"></div>
            </div>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-aalemni-blue/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-aalemni-orange/5 blur-3xl"></div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              className="mb-4 bg-aalemni-orange/10 text-aalemni-orange"
              variant="outline"
            >
              Partnership Opportunities
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
              How We Collaborate
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore the different ways your organization can partner with
              Aalemni.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Building,
                title: "Corporate Partners",
                description:
                  "Provide your employees with access to Aalemni's courses for professional development and upskilling. Customize learning paths aligned with your organization's goals.",
                benefits: [
                  "Custom learning portals",
                  "Bulk enrollment discounts",
                  "Progress tracking and analytics",
                  "Dedicated account manager",
                ],
              },
              {
                icon: GraduationCap,
                title: "Academic Institutions",
                description:
                  "Integrate Aalemni's courses into your curriculum or offer them as supplementary resources. Expand your educational offerings without additional infrastructure.",
                benefits: [
                  "Curriculum integration",
                  "Joint certification programs",
                  "Student discounts",
                  "Faculty development resources",
                ],
              },
              {
                icon: Globe,
                title: "Content Partners",
                description:
                  "Bring your expertise to our platform by creating courses or specialized content. Reach a global audience and generate revenue through our established marketplace.",
                benefits: [
                  "Content development support",
                  "Marketing and promotion",
                  "Revenue sharing",
                  "Analytics and feedback",
                ],
              },
              {
                icon: Award,
                title: "Certification Partners",
                description:
                  "Offer industry-recognized certifications through our platform. Validate learners' skills and increase the value of your certification programs.",
                benefits: [
                  "Certification integration",
                  "Exam proctoring",
                  "Credential verification",
                  "Renewal management",
                ],
              },
              {
                icon: Users,
                title: "Community Partners",
                description:
                  "Collaborate with Aalemni to create learning communities around specific topics or industries. Foster engagement and knowledge sharing among professionals.",
                benefits: [
                  "Community building tools",
                  "Event hosting",
                  "Networking opportunities",
                  "Thought leadership positioning",
                ],
              },
              {
                icon: Handshake,
                title: "Strategic Alliances",
                description:
                  "Form a strategic alliance to address specific educational needs or market opportunities. Combine our strengths to create innovative learning solutions.",
                benefits: [
                  "Joint venture opportunities",
                  "Co-branded initiatives",
                  "Market expansion",
                  "Shared resources",
                ],
              },
            ].map((type, i) => (
              <Card
                key={i}
                className="h-full border-aalemni-light hover:border-aalemni-orange/20"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aalemni-orange/10 text-aalemni-orange">
                    <type.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 text-aalemni-navy">
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{type.description}</p>
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-aalemni-navy">
                      Key Benefits:
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {type.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-aalemni-orange" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
                    asChild
                  >
                    <Link href="#become-partner">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section id="current-partners" className="py-16 bg-muted md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Our Network
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet Our Partners
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We're proud to collaborate with leading organizations across
              various industries.
            </p>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="corporate" className="w-full">
              <TabsList className="mx-auto flex max-w-lg justify-center">
                <TabsTrigger value="corporate">Corporate</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="certification">Certification</TabsTrigger>
              </TabsList>

              {["corporate", "academic", "content", "certification"].map(
                (category) => (
                  <TabsContent key={category} value={category} className="mt-8">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center text-center"
                        >
                          <div className="relative h-24 w-24 overflow-hidden rounded-full border bg-background">
                            <Image
                              src={`/placeholder.svg?height=96&width=96&text=Partner+${i + 1}`}
                              alt={`Partner ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="mt-4 font-semibold">{`${category.charAt(0).toUpperCase() + category.slice(1)} Partner ${i + 1}`}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {category === "corporate"
                              ? "Technology"
                              : category === "academic"
                                ? "University"
                                : category === "content"
                                  ? "Publishing"
                                  : "Industry Association"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )
              )}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4" variant="outline">
                Why Partner With Us
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Partnership Benefits
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover the advantages of forming a strategic partnership with
                Aalemni.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Expanded Reach",
                    description:
                      "Access Aalemni's global community of over 100,000 learners across 150+ countries.",
                    icon: Globe,
                  },
                  {
                    title: "Revenue Opportunities",
                    description:
                      "Generate new revenue streams through course sales, certification programs, or joint ventures.",
                    icon: Award,
                  },
                  {
                    title: "Enhanced Brand Visibility",
                    description:
                      "Increase your brand's visibility among professionals seeking to advance their skills and careers.",
                    icon: Building,
                  },
                  {
                    title: "Innovative Learning Solutions",
                    description:
                      "Leverage our platform's technology and expertise to create cutting-edge educational experiences.",
                    icon: Lightbulb,
                  },
                  {
                    title: "Data-Driven Insights",
                    description:
                      "Gain valuable insights into learning behaviors, skill gaps, and industry trends.",
                    icon: BarChart,
                  },
                  {
                    title: "Talent Development",
                    description:
                      "Develop talent pipelines and upskill potential employees through targeted educational programs.",
                    icon: Users,
                  },
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Partner Success Stories</CardTitle>
                  <CardDescription>
                    Hear from our partners about their experience working with
                    Aalemni.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "Director of Learning & Development",
                      company: "TechCorp International",
                      image: "/placeholder.svg?height=60&width=60&text=SJ",
                      quote:
                        "Partnering with Aalemni has transformed our employee development program. We've seen a 40% increase in skill proficiency and improved employee retention since implementing their courses.",
                    },
                    {
                      name: "Dr. Michael Chen",
                      role: "Dean of Online Learning",
                      company: "Global University",
                      image: "/placeholder.svg?height=60&width=60&text=MC",
                      quote:
                        "Our partnership with Aalemni has allowed us to expand our curriculum offerings without the overhead of developing courses from scratch. Our students love the additional learning resources.",
                    },
                    {
                      name: "Ahmed Hassan",
                      role: "CEO",
                      company: "TechSkills Academy",
                      image: "/placeholder.svg?height=60&width=60&text=AH",
                      quote:
                        "As a content partner, we've been able to reach a global audience we never could have accessed on our own. The revenue sharing model has created a significant new income stream for our business.",
                    },
                  ].map((testimonial, i) => (
                    <div key={i} className="rounded-lg border bg-muted/50 p-4">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section
        id="become-partner"
        className="py-16 bg-aalemni-navy text-white md:py-24"
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How to Become a Partner
            </h2>
            <p className="mt-4 text-xl text-white/80">
              Join our network of partners and start collaborating with Aalemni.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              {
                step: 1,
                title: "Initial Consultation",
                description:
                  "Schedule a call with our partnerships team to discuss your goals and explore collaboration opportunities.",
                icon: MessageSquare,
              },
              {
                step: 2,
                title: "Partnership Proposal",
                description:
                  "Receive a customized partnership proposal outlining the scope, benefits, and terms of the collaboration.",
                icon: FileText,
              },
              {
                step: 3,
                title: "Agreement & Onboarding",
                description:
                  "Finalize the partnership agreement and begin the onboarding process with our dedicated team.",
                icon: Handshake,
              },
              {
                step: 4,
                title: "Launch & Growth",
                description:
                  "Launch the partnership initiative and work together to achieve mutual goals and expand opportunities.",
                icon: Rocket,
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 3 && (
                  <div className="absolute top-10 left-full h-0.5 w-full -translate-x-1/2 bg-aalemni-orange/30 hidden md:block"></div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-aalemni-orange/30 bg-aalemni-orange/20 text-4xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-white/80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Card className="w-full max-w-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-aalemni-navy">
                  Partner Inquiry Form
                </CardTitle>
                <CardDescription>
                  Tell us about your organization and partnership interests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aalemni-orange focus-visible:ring-offset-2"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aalemni-orange focus-visible:ring-offset-2"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="organization"
                        className="text-sm font-medium"
                      >
                        Organization Name
                      </label>
                      <input
                        id="organization"
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aalemni-orange focus-visible:ring-offset-2"
                        placeholder="Company Inc."
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">
                        Your Role
                      </label>
                      <input
                        id="role"
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aalemni-orange focus-visible:ring-offset-2"
                        placeholder="Director of Learning"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="partnershipType"
                      className="text-sm font-medium"
                    >
                      Partnership Type
                    </label>
                    <select
                      id="partnershipType"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aalemni-orange focus-visible:ring-offset-2"
                    >
                      <option value="" disabled selected>
                        Select partnership type
                      </option>
                      <option value="corporate">Corporate Partner</option>
                      <option value="academic">Academic Institution</option>
                      <option value="content">Content Partner</option>
                      <option value="certification">
                        Certification Partner
                      </option>
                      <option value="community">Community Partner</option>
                      <option value="strategic">Strategic Alliance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Partnership Goals
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aalemni-orange focus-visible:ring-offset-2"
                      placeholder="Tell us about your partnership goals and how you envision collaborating with Aalemni..."
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                  >
                    Submit Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Common Questions
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Partnership FAQs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common questions about partnering with Aalemni.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question:
                    "What types of organizations can partner with Aalemni?",
                  answer:
                    "We partner with a wide range of organizations, including corporations, academic institutions, content creators, certification bodies, industry associations, and non-profit organizations. If you're interested in expanding educational opportunities and reaching new audiences, we'd love to explore a partnership.",
                },
                {
                  question: "Is there a cost to become a partner?",
                  answer:
                    "Partnership costs vary depending on the type and scope of collaboration. Some partnerships involve revenue sharing models rather than upfront fees. During our initial consultation, we'll discuss various partnership structures and find the model that best aligns with your goals and resources.",
                },
                {
                  question: "How long does the partnership process take?",
                  answer:
                    "The timeline varies based on the complexity of the partnership. Simple collaborations can be established within a few weeks, while more comprehensive partnerships might take 2-3 months to finalize. Our partnerships team works efficiently to move the process forward while ensuring all details are properly addressed.",
                },
                {
                  question: "Can we customize courses for our specific needs?",
                  answer:
                    "Yes, we offer customization options for corporate and academic partners. This can include tailoring existing courses to your industry context, creating custom learning paths, or developing entirely new courses to address specific skill gaps in your organization.",
                },
                {
                  question: "How do content partnerships work?",
                  answer:
                    "Content partners bring their expertise to our platform by creating courses or specialized content. We provide the technology infrastructure, instructional design support, and marketing reach, while you provide the subject matter expertise. Revenue is shared based on course enrollments, with content partners typically receiving 50-70% of the revenue.",
                },
                {
                  question: "What support does Aalemni provide to partners?",
                  answer:
                    "We provide comprehensive support including a dedicated partnership manager, technical integration assistance, marketing and promotion of partnership initiatives, data analytics and reporting, and regular strategy reviews to optimize outcomes. Our goal is to ensure the partnership delivers value for all stakeholders.",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Explore Partnership Opportunities?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Contact our partnerships team to start the conversation.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Button size="lg" asChild>
                <Link href="#become-partner">Submit Inquiry</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:partnerships@aalemni.com">Email Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
