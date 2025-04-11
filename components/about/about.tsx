import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Users,
  BookOpen,
  Clock,
  Globe,
  DollarSign,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Education background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80"></div>
        </div>

        <div className="relative z-10 py-20 px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empowering Learning, Connecting Minds.
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Aalemni is revolutionizing education by connecting passionate
            instructors with eager learners in an interactive, accessible
            platform designed for the modern world.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="mb-16">
        <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <video
            src="/aalemni.mp4"
            autoPlay
            controls
            style={{
              height: "100%",
              width: "100%",
            }}
          />
          {/* <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Play className="h-10 w-10 text-primary fill-primary" />
            </button>
          </div> */}
        </div>
      </section>

      {/* Who We Are */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Founded in 2023, Aalemni was born from a vision to democratize
            education and make quality learning accessible to everyone. We
            believe that knowledge should know no boundaries, and our platform
            connects expert instructors with eager learners from around the
            globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">10,000+</h3>
              <p className="text-muted-foreground">Students</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">500+</h3>
              <p className="text-muted-foreground">Expert Instructors</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">1,200+</h3>
              <p className="text-muted-foreground">Courses</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">50+</h3>
              <p className="text-muted-foreground">Countries</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Aalemni */}
      <section className="mb-16 bg-muted py-16 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Aalemni?</h2>
            <p className="text-lg max-w-3xl mx-auto">
              We're not just another learning platform. Here's what makes us
              different:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from industry leaders with real-world experience who are
                passionate about teaching.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Learning</h3>
              <p className="text-muted-foreground">
                Choose between self-paced courses and live interactive sessions
                that fit your schedule.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Community</h3>
              <p className="text-muted-foreground">
                Connect with students and instructors from around the world for
                a diverse learning experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Affordable & Diverse</h3>
              <p className="text-muted-foreground">
                Access both free and premium content across a wide range of
                subjects and skill levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              Our Mission
            </h2>
            <p className="text-lg">
              To democratize education by connecting passionate instructors with
              eager learners through an accessible, interactive platform that
              breaks down geographical, financial, and social barriers to
              quality education.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-primary/10 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <div className="bg-blue-600/20 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              Our Vision
            </h2>
            <p className="text-lg">
              To create a world where quality education is accessible to
              everyone, empowering individuals to reach their full potential and
              fostering a global community of lifelong learners.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="mb-16 bg-muted py-16 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-lg max-w-3xl mx-auto">
              We're proud of the impact we've made in such a short time:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-4xl font-bold text-primary mb-2">95%</h3>
              <p className="text-lg">Student Satisfaction Rate</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-4xl font-bold text-primary mb-2">87%</h3>
              <p className="text-lg">Course Completion Rate</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h3 className="text-4xl font-bold text-primary mb-2">75%</h3>
              <p className="text-lg">Career Advancement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Be Part of the Aalemni Community!
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of learners and instructors who are already
          transforming their lives through education.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent hover:bg-white/10"
          >
            <Link href="/become-instructor">Become a Trainer</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
