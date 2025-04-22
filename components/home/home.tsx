"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Star,
  BarChart,
  Code,
  LineChart,
  Palette,
  Megaphone,
  Brain,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/uii_/button";
import { Badge } from "@/components/uii_/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "../layout/footer";
import { User } from "@supabase/supabase-js";
import {
  Category_courses,
  Course_courses_with_level,
  Feature,
  Logged_In_User,
  PublicTestimonial,
} from "@/types/types";
import TestimonialsCarousel from "../testimonials/testimonials";
import FeaturesCarousel from "../company_features/company_features";
import CategoriesCarousel from "../categories/categories";
import FeaturedCoursesSwiper from "../courses_swiper/courses_swiper";

interface HomeProps {
  user: User | null;
  logged_in_user: Logged_In_User | null;
  categories: Category_courses[];
  featured_courses: Course_courses_with_level[];
  testimonials: PublicTestimonial[];
  company_features: Feature[];
}

export default function HomePage({
  user,
  logged_in_user,
  categories,
  featured_courses,
  testimonials,
  company_features,
}: HomeProps) {
  const rr = [
    {
      icon: Code,
      title: "Web Development",
      color: "bg-aalemni-blue/10",
      textColor: "text-aalemni-blue",
      href: "/courses?category=web-development",
    },
    {
      icon: LineChart,
      title: "Business",
      color: "bg-aalemni-orange/10",
      textColor: "text-aalemni-orange",
      href: "/courses?category=business",
    },
    {
      icon: BarChart,
      title: "Data Science",
      color: "bg-aalemni-navy/10",
      textColor: "text-aalemni-navy",
      href: "/courses?category=data-science",
    },
    {
      icon: Palette,
      title: "Design",
      color: "bg-aalemni-blue/10",
      textColor: "text-aalemni-blue",
      href: "/courses?category=design",
    },
    {
      icon: Megaphone,
      title: "Marketing",
      color: "bg-aalemni-orange/10",
      textColor: "text-aalemni-orange",
      href: "/courses?category=marketing",
    },
    {
      icon: Brain,
      title: "Personal Development",
      color: "bg-aalemni-navy/10",
      textColor: "text-aalemni-navy",
      href: "/courses?category=personal-development",
    },
  ];
  return (
    <>
      {/* Hero Section */}
      <Navbar user={user} logged_in_user={logged_in_user} />
      <section className="relative overflow-hidden bg-gradient-to-b from-aalemni-navy/10 via-background to-background pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <Badge
                className="mb-4 w-fit bg-aalemni-orange text-white"
                variant="outline"
              >
                Become a Trainer
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-aalemni-navy sm:text-5xl md:text-6xl">
                Learn Without Limits
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Join over 100,000 learners mastering new skills with Aalemni's
                expert-led courses. Advance your career, explore new passions,
                and learn at your own pace.{" "}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="bg-aalemni-orange hover:bg-aalemni-orange/90"
                  asChild
                >
                  <Link href="/signup">Get Started for Free </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
                  asChild
                >
                  <Link href="/courses">Explore Courses </Link>
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
                        src={`/placeholder.svg?height=40&width=40&text=U${i}`}
                        alt={`User ${i}`}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold">4.9/5</span> Explore Courses{" "}
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-lg rounded-lg border bg-background shadow-xl">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=720&width=1280&text=Aalemni+Learning"
                    alt="Aalemni Learning Platform"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button
                      size="icon"
                      className="h-16 w-16 rounded-full bg-aalemni-orange/90 text-white hover:bg-aalemni-orange"
                    >
                      <Play className="h-8 w-8" />
                      <span className="sr-only">Play video</span>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-aalemni-navy">
                    Why Choose Aalemni?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Watch how our platform is transforming education for
                    learners worldwide.
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

      {/* Stats Section */}
      <section className="py-16 bg-aalemni-light">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "2000+", label: "Active Learners" },
              { value: "50+", label: "Expert Instructors" },
              { value: "3000+", label: "Courses Available" },
              { value: "532+", label: "Learning Hours" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="text-3xl font-bold text-aalemni-navy sm:text-4xl md:text-5xl">
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

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              className="mb-4 bg-aalemni-orange/10 text-aalemni-orange"
              variant="outline"
            >
              Explore Our Top Categories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
              Explore Our Top Categories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover courses in the most in-demand skills across
              industries.{" "}
            </p>
          </div>

          <CategoriesCarousel categories={categories} />
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-aalemni-light md:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Badge
                className="mb-4 bg-aalemni-orange/10 text-aalemni-orange"
                variant="outline"
              >
                Featured Courses{" "}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
                Featured Courses{" "}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Handpicked courses to get you started on your learning
                journey.{" "}
              </p>
            </div>
            <Button
              variant="outline"
              className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
              asChild
            >
              <Link href="/courses">
                View All Courses <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <FeaturedCoursesSwiper featured_courses={featured_courses} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24" id="company_features">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              className="mb-4 bg-aalemni-orange/10 text-aalemni-orange"
              variant="outline"
            >
              Benefits That Set Us Apart{" "}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
              Benefits That Set Us Apart{" "}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover why thousands of learners and instructors choose
              Aalemni.{" "}
            </p>
          </div>
          <FeaturesCarousel company_features={company_features} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-aalemni-navy text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Future?{" "}
            </h2>
            <p className="mt-4 text-xl text-white/80">
              Join over 100,000 learners already advancing their careers with
              Aalemni.{" "}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Button
                size="lg"
                className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                asChild
              >
                <Link href="/signup">Get Started for Free </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/20 hover:bg-white/10"
                asChild
              >
                <Link href="/courses">Explore Courses </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/70">
              No credit card required. Start learning today.{" "}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Student Success Stories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear from students who have transformed their careers with
              Aalemni.
            </p>
          </div>
          <TestimonialsCarousel testimonials={testimonials} />
          {/* <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 overflow-hidden rounded-full">
                      <Image
                        src={"/placeholder.svg"}
                        alt={testimonial.fullname}
                        width={80}
                        height={80} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-bold">
                      {testimonial.fullname}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.email}
                    </p>
                    <div className="mt-4 flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        ))}
                    </div>
                    <p className="mt-4 italic text-muted-foreground">
                      "{testimonial.description}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-muted md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Trusted Partners
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Educational Partners
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We collaborate with leading organizations to provide high-quality
              education.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <Image
                  src={`/placeholder.svg?height=60&width=180&text=Partner+${i}`}
                  alt={`Partner ${i}`}
                  width={180}
                  height={60}
                  className="h-12 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
