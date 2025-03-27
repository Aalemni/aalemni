// import Hero from "@/components/hero";
// import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
// import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";

// export default async function Home() {
//   return (
//     <>
//       <Hero />
//       <main className="flex-1 flex flex-col gap-6 px-4">
//         <h2 className="font-medium text-xl mb-4">Next steps</h2>
//         {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
//       </main>
//     </>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  GraduationCap,
  Play,
  Star,
  BarChart,
  Globe,
  Clock,
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
import { TranslatedContent } from "@/components/translated-content";

export default function HomePage() {
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
                <TranslatedContent translationKey="common.becomeTrainer" />
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-aalemni-navy sm:text-5xl md:text-6xl">
                <TranslatedContent translationKey="hero.title" />
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                <TranslatedContent translationKey="hero.subtitle" />
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="bg-aalemni-orange hover:bg-aalemni-orange/90"
                  asChild
                >
                  <Link href="/signup">
                    <TranslatedContent translationKey="hero.getStarted" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
                  asChild
                >
                  <Link href="/courses">
                    <TranslatedContent translationKey="hero.exploreCourses" />
                  </Link>
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
                  <span className="font-bold">4.9/5</span>{" "}
                  <TranslatedContent translationKey="hero.reviews" />
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
              { value: "X,XXX+", label: "stats.activeLearnersTitle" },
              { value: "X,XXX+", label: "stats.expertInstructorsTitle" },
              { value: "X,XXX+", label: "stats.coursesAvailableTitle" },
              { value: "XXM+", label: "stats.learningHoursTitle" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="text-3xl font-bold text-aalemni-navy sm:text-4xl md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground sm:text-base">
                  <TranslatedContent translationKey={stat.label} />
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
              <TranslatedContent translationKey="categories.title" />
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
              <TranslatedContent translationKey="categories.title" />
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              <TranslatedContent translationKey="categories.subtitle" />
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {[
              {
                icon: Code,
                title: "categories.webDevelopment",
                color: "bg-aalemni-blue/10",
                textColor: "text-aalemni-blue",
                href: "/courses?category=web-development",
              },
              {
                icon: LineChart,
                title: "categories.business",
                color: "bg-aalemni-orange/10",
                textColor: "text-aalemni-orange",
                href: "/courses?category=business",
              },
              {
                icon: BarChart,
                title: "categories.dataScience",
                color: "bg-aalemni-navy/10",
                textColor: "text-aalemni-navy",
                href: "/courses?category=data-science",
              },
              {
                icon: Palette,
                title: "categories.design",
                color: "bg-aalemni-blue/10",
                textColor: "text-aalemni-blue",
                href: "/courses?category=design",
              },
              {
                icon: Megaphone,
                title: "categories.marketing",
                color: "bg-aalemni-orange/10",
                textColor: "text-aalemni-orange",
                href: "/courses?category=marketing",
              },
              {
                icon: Brain,
                title: "categories.personalDevelopment",
                color: "bg-aalemni-navy/10",
                textColor: "text-aalemni-navy",
                href: "/courses?category=personal-development",
              },
            ].map((category, i) => (
              <Link key={i} href={category.href} className="group">
                <div className="flex flex-col items-center rounded-lg p-6 text-center transition-all hover:bg-aalemni-light">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${category.color}`}
                  >
                    <category.icon
                      className={`h-8 w-8 ${category.textColor}`}
                    />
                  </div>
                  <h3 className="mt-4 font-semibold text-aalemni-navy">
                    <TranslatedContent translationKey={category.title} />
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <span className="transition-all group-hover:mr-2">
                      Explore
                    </span>
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
                <TranslatedContent translationKey="featuredCourses.title" />
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
                <TranslatedContent translationKey="featuredCourses.title" />
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                <TranslatedContent translationKey="featuredCourses.subtitle" />
              </p>
            </div>
            <Button
              variant="outline"
              className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
              asChild
            >
              <Link href="/courses">
                <TranslatedContent translationKey="featuredCourses.viewAll" />
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                title: "Complete Web Development Bootcamp",
                instructor: "Dr. Sarah Johnson",
                image: "/placeholder.svg?height=200&width=360&text=Web+Dev",
                price: "$89.99",
                rating: 4.9,
                reviews: 842,
                level: "Beginner to Advanced",
                category: "Web Development",
              },
              {
                title: "Data Science and Machine Learning",
                instructor: "Michael Chen",
                image:
                  "/placeholder.svg?height=200&width=360&text=Data+Science",
                price: "$79.99",
                rating: 4.8,
                reviews: 756,
                level: "Intermediate",
                category: "Data Science",
              },
              {
                title: "UI/UX Design Masterclass",
                instructor: "Emily Rodriguez",
                image: "/placeholder.svg?height=200&width=360&text=UI/UX",
                price: "$69.99",
                rating: 4.9,
                reviews: 689,
                level: "All Levels",
                category: "Design",
              },
              {
                title: "Business Strategy Fundamentals",
                instructor: "Dr. James Wilson",
                image: "/placeholder.svg?height=200&width=360&text=Business",
                price: "$59.99",
                rating: 4.7,
                reviews: 512,
                level: "Beginner",
                category: "Business",
              },
            ].map((course, i) => (
              <Link key={i} href={`/courses/${i + 1}`}>
                <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-video relative">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute right-2 top-2">
                      <Badge
                        variant="secondary"
                        className="bg-aalemni-navy text-white"
                      >
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 text-aalemni-navy">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {course.instructor}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-aalemni-orange text-aalemni-orange" />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({course.reviews})
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge
                        variant="outline"
                        className="text-xs font-normal border-aalemni-blue text-aalemni-blue"
                      >
                        {course.level}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex items-center justify-between">
                    <span className="font-bold text-aalemni-navy">
                      {course.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                    >
                      View Course
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              className="mb-4 bg-aalemni-orange/10 text-aalemni-orange"
              variant="outline"
            >
              <TranslatedContent translationKey="benefits.title" />
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
              <TranslatedContent translationKey="benefits.title" />
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              <TranslatedContent translationKey="benefits.subtitle" />
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "benefits.curriculum.title",
                description: "benefits.curriculum.description",
                color: "bg-aalemni-orange/10",
                iconColor: "text-aalemni-orange",
              },
              {
                icon: Users,
                title: "benefits.instructors.title",
                description: "benefits.instructors.description",
                color: "bg-aalemni-navy/10",
                iconColor: "text-aalemni-navy",
              },
              {
                icon: Clock,
                title: "benefits.flexibility.title",
                description: "benefits.flexibility.description",
                color: "bg-aalemni-blue/10",
                iconColor: "text-aalemni-blue",
              },
              {
                icon: Award,
                title: "benefits.certificates.title",
                description: "benefits.certificates.description",
                color: "bg-aalemni-orange/10",
                iconColor: "text-aalemni-orange",
              },
              {
                icon: Globe,
                title: "benefits.community.title",
                description: "benefits.community.description",
                color: "bg-aalemni-navy/10",
                iconColor: "text-aalemni-navy",
              },
              {
                icon: BarChart,
                title: "benefits.career.title",
                description: "benefits.career.description",
                color: "bg-aalemni-blue/10",
                iconColor: "text-aalemni-blue",
              },
            ].map((benefit, i) => (
              <Card
                key={i}
                className="border-none shadow-none hover:bg-aalemni-light/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${benefit.color} ${benefit.iconColor}`}
                    >
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-aalemni-navy">
                      <TranslatedContent translationKey={benefit.title} />
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      <TranslatedContent translationKey={benefit.description} />
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-aalemni-navy text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <TranslatedContent translationKey="cta.title" />
            </h2>
            <p className="mt-4 text-xl text-white/80">
              <TranslatedContent translationKey="cta.subtitle" />
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Button
                size="lg"
                className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                asChild
              >
                <Link href="/signup">
                  <TranslatedContent translationKey="cta.getStarted" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/20 hover:bg-white/10"
                asChild
              >
                <Link href="/courses">
                  <TranslatedContent translationKey="cta.exploreCourses" />
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/70">
              <TranslatedContent translationKey="cta.noCreditCard" />
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

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Web Developer",
                image: "/placeholder.svg?height=100&width=100&text=SJ",
                quote:
                  "Aalemni's web development bootcamp completely changed my career trajectory. I went from a marketing assistant to a full-stack developer in just 6 months. The instructors were incredibly supportive and the curriculum was comprehensive and up-to-date.",
              },
              {
                name: "Michael Chen",
                role: "Data Scientist",
                image: "/placeholder.svg?height=100&width=100&text=MC",
                quote:
                  "The data science course on Aalemni provided me with the practical skills I needed to transition into the field. The hands-on projects and real-world datasets made learning complex concepts much easier. I now work at a top tech company thanks to Aalemni.",
              },
              {
                name: "Emily Rodriguez",
                role: "UX Designer",
                image: "/placeholder.svg?height=100&width=100&text=ER",
                quote:
                  "As someone with no design background, I was worried about learning UX design. Aalemni's step-by-step approach and supportive community made the journey enjoyable. I'm now freelancing as a UX designer and loving every minute of it!",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-bold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
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
                      "{testimonial.quote}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
      <footer className="border-t bg-background">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Aalemni</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-md">
                Aalemni is a comprehensive e-learning platform connecting
                students with expert trainers. Our mission is to make quality
                education accessible to everyone, everywhere.
              </p>
              <div className="mt-6 flex gap-4">
                {[
                  "facebook",
                  "twitter",
                  "instagram",
                  "linkedin",
                  "youtube",
                ].map((social) => (
                  <Link
                    key={social}
                    href={`#${social}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <span className="sr-only">{social}</span>
                    {/* Placeholder for social icons */}
                    <div className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { title: "Home", href: "/" },
                  { title: "Courses", href: "/courses" },
                  { title: "Instructors", href: "/instructors" },
                  { title: "Become a Trainer", href: "/become-instructor" },
                  { title: "Partners", href: "/partners" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">About Us</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { title: "Our Story", href: "/about" },
                  { title: "Team", href: "/team" },
                  { title: "Careers", href: "/careers" },
                  { title: "Press", href: "/press" },
                  { title: "Blog", href: "/blog" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Support</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { title: "Help Center", href: "/help" },
                  { title: "Contact Us", href: "/contact" },
                  { title: "Privacy Policy", href: "/privacy" },
                  { title: "Terms of Service", href: "/terms" },
                  { title: "Cookie Policy", href: "/cookies" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Aalemni. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
