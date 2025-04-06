"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Globe,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/uii_/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/uii_/badge";
import { toast } from "react-toastify";
import { useState } from "react";
import { signUpAction } from "@/supabase/actions/auth_actions";

export default function BecomeInstructorPage() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    phone: "",
    role: "instructor",
    agree_terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const from_data = new FormData();
      var agree_terms = formData.agree_terms == true ? "1" : "0";
      from_data.append("name", formData.name);
      from_data.append("email", formData.email);
      from_data.append("username", formData.username);
      from_data.append("password", formData.password);
      from_data.append("confirm_password", formData.confirm_password);
      from_data.append("phone", formData.phone);
      from_data.append("role", formData.role);
      from_data.append("agree_terms", agree_terms);
      const result = await signUpAction(from_data);
      if (result && result != null) {
        if (result.success == false) {
          if (result.message.includes("duplicate key value")) {
            if (result.message.includes("email")) {
              toast.error("User email already exists");
            } else if (result.message.includes("username")) {
              toast.error("Username already exists");
            } else {
              toast.error("Users already exists");
            }
          } else {
            toast.error(result.message);
          }
        } else {
          toast.success(result.message);
          router.push("/verify-account");
        }
      } else {
        toast.error("An Error Occured! Please Try Again Later");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("An Error Occured! Please Try Again Later");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <Badge className="mb-4 w-fit" variant="outline">
                Join Our Teaching Community
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Share Your <span className="text-primary">Expertise</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Become an instructor on Aalemni and help thousands of learners
                achieve their goals while building your reputation and earning
                income from your knowledge.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button size="lg" asChild>
                  <Link href="#apply">Apply to Teach</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#benefits">Learn More</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="inline-block h-10 w-10 overflow-hidden rounded-full border-2 border-background"
                    >
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=T${i}`}
                        alt={`Trainer ${i}`}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  Join <span className="font-bold">1,200+</span> instructors
                  already teaching on Aalemni
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-lg rounded-lg border bg-background shadow-xl">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=720&width=1280&text=Teach+on+Aalemni"
                    alt="Teach on Aalemni"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Why Teach on Aalemni?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Discover how our platform empowers instructors to share
                    their knowledge and build their teaching career.
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
            </div>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "1,200+", label: "Active Instructors" },
              { value: "100K+", label: "Students Taught" },
              { value: "$2.5M+", label: "Instructor Earnings" },
              { value: "4.8/5", label: "Instructor Satisfaction" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="text-3xl font-bold sm:text-4xl md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Why Teach With Us
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Benefits of Teaching on Aalemni
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join our platform and enjoy these exclusive benefits as an
              instructor.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: CreditCard,
                  title: "Competitive Earnings",
                  description:
                    "Earn up to 70% revenue share on course sales and additional income through live sessions and private coaching.",
                },
                {
                  icon: Users,
                  title: "Global Audience",
                  description:
                    "Reach students from over 150 countries and build your reputation as an expert in your field.",
                },
                {
                  icon: Lightbulb,
                  title: "Teaching Freedom",
                  description:
                    "Create courses on subjects you're passionate about and teach in your own style and pace.",
                },
                {
                  icon: Award,
                  title: "Professional Growth",
                  description:
                    "Enhance your resume, establish yourself as an authority, and open doors to speaking engagements and consulting opportunities.",
                },
                {
                  icon: MessageSquare,
                  title: "Supportive Community",
                  description:
                    "Connect with fellow instructors, share best practices, and collaborate on course development.",
                },
                {
                  icon: BookOpen,
                  title: "Teaching Resources",
                  description:
                    "Access exclusive instructor training, course development tools, and marketing support to maximize your success.",
                },
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              The Process
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How to Become an Instructor
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Follow these simple steps to start your teaching journey on
              Aalemni.
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-ml-0.5"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {[
                  {
                    title: "Apply to Become an Instructor",
                    description:
                      "Fill out our application form with your professional background, teaching experience, and course ideas.",
                    icon: CheckCircle,
                  },
                  {
                    title: "Complete Instructor Onboarding",
                    description:
                      "Once approved, complete our instructor training program to learn best practices for course creation and delivery.",
                    icon: GraduationCap,
                  },
                  {
                    title: "Create Your First Course",
                    description:
                      "Develop your course content with support from our course design team. We'll help you structure your material for maximum engagement.",
                    icon: BookOpen,
                  },
                  {
                    title: "Launch and Promote",
                    description:
                      "Publish your course and use our marketing tools to promote it to our global student community.",
                    icon: Globe,
                  },
                  {
                    title: "Engage with Students",
                    description:
                      "Interact with your students through Q&A, discussions, and live sessions to enhance their learning experience.",
                    icon: MessageSquare,
                  },
                  {
                    title: "Earn and Grow",
                    description:
                      "Receive monthly payments for your course sales and expand your teaching portfolio with additional courses.",
                    icon: CreditCard,
                  },
                ].map((step, i) => (
                  <div key={i} className="relative">
                    <div
                      className={`flex items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground md:left-1/2 md:-ml-4">
                        {i + 1}
                      </div>

                      {/* Content */}
                      <div className="ml-12 md:w-1/2 md:ml-0 md:px-8">
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <step.icon className="h-5 w-5 text-primary" />
                              <CardTitle>{step.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p>{step.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4" variant="outline">
                What You'll Need
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Instructor Requirements
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We're looking for passionate experts who can deliver
                high-quality educational content. Here's what you'll need to get
                started:
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Expertise in Your Field",
                    description:
                      "Demonstrated knowledge and experience in your subject area, whether through professional work, academic credentials, or proven skills.",
                  },
                  {
                    title: "Teaching Ability",
                    description:
                      "Clear communication skills and the ability to explain complex concepts in an accessible way.",
                  },
                  {
                    title: "Technical Setup",
                    description:
                      "Basic equipment for creating quality video and audio content, including a good microphone and camera.",
                  },
                  {
                    title: "Time Commitment",
                    description:
                      "Availability to create course content, respond to student questions, and regularly update your materials.",
                  },
                  {
                    title: "Passion for Teaching",
                    description:
                      "Genuine interest in helping others learn and grow in your area of expertise.",
                  },
                ].map((requirement, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{requirement.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {requirement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Tabs defaultValue="qualifications" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="qualifications">
                    Qualifications
                  </TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                </TabsList>
                <TabsContent value="qualifications" className="mt-6 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Background</CardTitle>
                      <CardDescription>
                        Preferred but not always required
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Degree in your field of expertise</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Relevant certifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Teaching experience (formal or informal)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Experience</CardTitle>
                      <CardDescription>
                        Real-world expertise is highly valued
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>3+ years of professional experience</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Portfolio of work or achievements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Industry recognition or publications</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="equipment" className="mt-6 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Essential Equipment</CardTitle>
                      <CardDescription>
                        Minimum requirements for quality content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>
                            Computer with reliable internet connection
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Quality microphone for clear audio</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>
                            Webcam for instructor videos (720p minimum)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Quiet recording environment</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Additions</CardTitle>
                      <CardDescription>
                        For enhanced production quality
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Screen recording software</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Basic lighting setup</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Video editing software</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                          <span>Graphics tablet (for certain subjects)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Instructor Success Stories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Hear From Our Instructors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn about the experiences of instructors who are already
              teaching on Aalemni.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. Michael Chen",
                role: "Data Science Instructor",
                image: "/placeholder.svg?height=200&width=200&text=MC",
                quote:
                  "Teaching on Aalemni has allowed me to reach students from around the world who are passionate about data science. The platform's tools make it easy to create engaging content, and the support team is always there to help. I've been able to build a thriving teaching business while doing what I love.",
                students: "12,850+",
                courses: "6",
                rating: "4.8",
              },
              {
                name: "Emily Rodriguez",
                role: "UX/UI Design Specialist",
                image: "/placeholder.svg?height=200&width=200&text=ER",
                quote:
                  "As a design professional, I was looking for a way to share my knowledge with aspiring designers. Aalemni provided the perfect platform to do this. The course creation process is streamlined, and the marketing support has helped me grow my student base exponentially. It's been incredibly rewarding.",
                students: "9,870+",
                courses: "5",
                rating: "4.9",
              },
              {
                name: "Robert Kim",
                role: "Cybersecurity Specialist",
                image: "/placeholder.svg?height=200&width=200&text=RK",
                quote:
                  "I started teaching on Aalemni as a side project, but it quickly became a significant part of my career. The platform's focus on quality education aligns perfectly with my teaching philosophy. I've not only earned substantial income but also built a community of cybersecurity enthusiasts who continue to inspire me.",
                students: "6,540+",
                courses: "5",
                rating: "4.9",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-24 w-24 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-bold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">
                        {testimonial.rating} Instructor Rating
                      </span>
                    </div>
                    <div className="mt-6">
                      <p className="italic text-muted-foreground">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="mt-6 flex w-full justify-between border-t pt-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Students
                        </p>
                        <p className="font-bold">{testimonial.students}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Courses</p>
                        <p className="font-bold">{testimonial.courses}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Years Teaching
                        </p>
                        <p className="font-bold">{i + 2}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common questions about becoming an instructor on
              Aalemni.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How much can I earn as an instructor?",
                  answer:
                    "Instructor earnings vary based on several factors, including course pricing, number of students, and revenue share model. On average, instructors earn between $1,000 to $5,000 per month, with top instructors earning significantly more. We offer a competitive revenue share of up to 70% for course sales, plus additional income opportunities through live sessions and coaching.",
                },
                {
                  question: "What subjects can I teach?",
                  answer:
                    "Aalemni welcomes courses in a wide range of subjects, including technology, business, design, marketing, personal development, languages, and more. We're particularly interested in in-demand skills that help students advance their careers or pursue their passions. If you're unsure whether your subject is a good fit, feel free to contact us for guidance.",
                },
                {
                  question: "How long does it take to create a course?",
                  answer:
                    "The time required to create a course varies depending on the subject, depth of content, and your familiarity with course creation. On average, instructors spend 4-8 weeks developing a comprehensive course. Our platform provides tools and resources to streamline the process, and our instructor support team is available to help you at every step.",
                },
                {
                  question: "Do I need prior teaching experience?",
                  answer:
                    "While prior teaching experience is beneficial, it's not required. What's most important is your expertise in your subject area and your ability to communicate concepts clearly. We provide instructor training to help you develop effective teaching techniques and course design skills. Many of our successful instructors had no formal teaching experience before joining Aalemni.",
                },
                {
                  question: "How do I get students for my courses?",
                  answer:
                    "Aalemni helps promote your courses to our global student community through various marketing channels. Your courses will be discoverable through our search and recommendation systems. Additionally, we provide marketing tools and guidance to help you promote your courses through your own networks. The more high-quality content you create, the more visibility your courses will receive on our platform.",
                },
                {
                  question: "What support does Aalemni provide to instructors?",
                  answer:
                    "We offer comprehensive support to help you succeed, including: instructor training and course design guidance, production assistance for video and audio content, marketing and promotion of your courses, technical support for the platform, and a community of fellow instructors for collaboration and knowledge sharing. Our instructor success team is dedicated to helping you build a rewarding teaching career on Aalemni.",
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

      {/* Application CTA */}
      <section id="apply" className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to Share Your Knowledge?
            </h2>
            <p className="mt-4 text-xl text-primary-foreground/80">
              Join our community of expert instructors and start teaching today.
            </p>
            <div className="mt-8">
              <Card className="mx-auto max-w-2xl">
                <CardHeader>
                  <CardTitle>Instructor Application</CardTitle>
                  <CardDescription>
                    Tell us about yourself and your teaching interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4 text-start">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Hadi Rahhal"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="username"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Username
                      </label>
                      <input
                        id="username"
                        type="username"
                        name="username"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="its_hadi"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="haid@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        name="phone"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="+961 ** *** ***"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Subject Area
                      </label>
                      <select
                        id="subject"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="" disabled>
                          Select your subject area
                        </option>
                        <option value="web-development">Web Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                        <option value="marketing">Marketing</option>
                        <option value="personal-development">
                          Personal Development
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="experience"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Years of Experience
                      </label>
                      <input
                        id="experience"
                        type="number"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="5"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="courseIdea"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Course Idea
                      </label>
                      <textarea
                        id="courseIdea"
                        rows={4}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Briefly describe your course idea and target audience..."
                      ></textarea>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="portfolio"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Portfolio or LinkedIn URL
                      </label>
                      <input
                        id="portfolio"
                        type="url"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        How did you hear about us?
                      </label>
                      <select
                        defaultValue={"0"}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="0" disabled>
                          Select an option
                        </option>
                        <option value="search">Search Engine</option>
                        <option value="social">Social Media</option>
                        <option value="friend">Friend or Colleague</option>
                        <option value="instructor">Current Instructor</option>
                        <option value="student">As a Student</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mt-6">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Create account"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/70">
              We review all applications within 5-7 business days. If approved,
              you'll receive an invitation to join our instructor community.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Get Started
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Instructor Resources
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore these resources to learn more about teaching on Aalemni.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Instructor Handbook",
                description:
                  "A comprehensive guide to creating successful courses on Aalemni.",
                icon: BookOpen,
                link: "#",
              },
              {
                title: "Course Creation Workshop",
                description:
                  "Free online workshop on designing engaging educational content.",
                icon: GraduationCap,
                link: "#",
              },
              {
                title: "Instructor Community",
                description:
                  "Connect with fellow instructors to share tips and best practices.",
                icon: Users,
                link: "#",
              },
              {
                title: "Equipment Guide",
                description:
                  "Recommendations for recording equipment at various budget levels.",
                icon: Clock,
                link: "#",
              },
              {
                title: "Marketing Masterclass",
                description:
                  "Learn how to promote your courses and build your audience.",
                icon: Globe,
                link: "#",
              },
              {
                title: "Instructor Success Stories",
                description:
                  "Case studies of instructors who have built successful teaching careers.",
                icon: Award,
                link: "#",
              },
            ].map((resource, i) => (
              <Link key={i} href={resource.link}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <resource.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold">{resource.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {resource.description}
                    </p>
                    <div className="mt-4 flex items-center text-primary">
                      <span className="font-medium">Learn more</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start Your Teaching Journey Today
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of instructors who are sharing their knowledge and
              making a difference in students' lives.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Button size="lg" asChild>
                <Link href="#apply">Apply to Teach</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#benefits">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
