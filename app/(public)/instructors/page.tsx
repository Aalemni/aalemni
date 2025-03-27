import {
  Search,
  Star,
  BookOpen,
  Users,
  Award,
  ChevronDown,
  Grid3X3,
  List,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/uii_/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/uii_/input";
import { Badge } from "@/components/uii_/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/uii_/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for instructors
const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Web Development Expert",
    image: "/placeholder.svg?height=400&width=400&text=SJ",
    rating: 4.9,
    reviewCount: 842,
    studentCount: 15420,
    courseCount: 8,
    specialties: ["JavaScript", "React", "Node.js"],
    bio: "Former Google engineer with 10+ years of experience in web development. Passionate about teaching modern JavaScript frameworks and helping students build real-world applications.",
    featured: true,
    languages: ["English", "Spanish"],
    price: "$19.99/hour",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Data Science Instructor",
    image: "/placeholder.svg?height=400&width=400&text=MC",
    rating: 4.8,
    reviewCount: 756,
    studentCount: 12850,
    courseCount: 6,
    specialties: ["Python", "Machine Learning", "Data Analysis"],
    bio: "Data scientist with experience at Amazon and Microsoft. Specializes in machine learning algorithms and data visualization techniques.",
    featured: true,
    languages: ["English", "Mandarin"],
    price: "$24.99/hour",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX/UI Design Specialist",
    image: "/placeholder.svg?height=400&width=400&text=ER",
    rating: 4.9,
    reviewCount: 689,
    studentCount: 9870,
    courseCount: 5,
    specialties: ["UI Design", "User Research", "Figma", "Adobe XD"],
    bio: "Award-winning designer with a background in product design at top tech companies. Focuses on teaching practical design skills and portfolio development.",
    featured: false,
    languages: ["English", "Portuguese"],
    price: "$22.99/hour",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Business Strategy Expert",
    image: "/placeholder.svg?height=400&width=400&text=JW",
    rating: 4.7,
    reviewCount: 512,
    studentCount: 8640,
    courseCount: 4,
    specialties: ["Business Strategy", "Marketing", "Entrepreneurship"],
    bio: "Harvard MBA with 15+ years of consulting experience. Helps students understand business fundamentals and develop strategic thinking skills.",
    featured: false,
    languages: ["English"],
    price: "$29.99/hour",
  },
  {
    id: 5,
    name: "Priya Patel",
    title: "Mobile App Development Instructor",
    image: "/placeholder.svg?height=400&width=400&text=PP",
    rating: 4.8,
    reviewCount: 478,
    studentCount: 7320,
    courseCount: 6,
    specialties: ["iOS Development", "Android Development", "React Native"],
    bio: "Mobile developer with experience building apps for startups and enterprise companies. Passionate about teaching cross-platform development techniques.",
    featured: true,
    languages: ["English", "Hindi"],
    price: "$21.99/hour",
  },
  {
    id: 6,
    name: "Robert Kim",
    title: "Cybersecurity Specialist",
    image: "/placeholder.svg?height=400&width=400&text=RK",
    rating: 4.9,
    reviewCount: 423,
    studentCount: 6540,
    courseCount: 5,
    specialties: ["Network Security", "Ethical Hacking", "Security Auditing"],
    bio: "Certified security professional with experience at major financial institutions. Teaches practical security skills with hands-on labs and real-world scenarios.",
    featured: false,
    languages: ["English", "Korean"],
    price: "$26.99/hour",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    title: "Digital Marketing Expert",
    image: "/placeholder.svg?height=400&width=400&text=SM",
    rating: 4.7,
    reviewCount: 387,
    studentCount: 5980,
    courseCount: 4,
    specialties: ["SEO", "Content Marketing", "Social Media Strategy"],
    bio: "Marketing director with experience managing campaigns for Fortune 500 companies. Focuses on teaching data-driven marketing strategies.",
    featured: false,
    languages: ["English", "Spanish"],
    price: "$19.99/hour",
  },
  {
    id: 8,
    name: "David Thompson",
    title: "Cloud Computing Instructor",
    image: "/placeholder.svg?height=400&width=400&text=DT",
    rating: 4.8,
    reviewCount: 356,
    studentCount: 5420,
    courseCount: 3,
    specialties: ["AWS", "Azure", "DevOps", "Kubernetes"],
    bio: "Cloud architect with AWS and Azure certifications. Helps students master cloud technologies and implement scalable infrastructure solutions.",
    featured: true,
    languages: ["English"],
    price: "$24.99/hour",
  },
  {
    id: 9,
    name: "Aisha Johnson",
    title: "Graphic Design Instructor",
    image: "/placeholder.svg?height=400&width=400&text=AJ",
    rating: 4.9,
    reviewCount: 312,
    studentCount: 4870,
    courseCount: 5,
    specialties: ["Adobe Photoshop", "Illustrator", "Brand Design"],
    bio: "Creative director with experience at top design agencies. Teaches both technical skills and creative thinking processes.",
    featured: false,
    languages: ["English", "French"],
    price: "$20.99/hour",
  },
  {
    id: 10,
    name: "Carlos Mendez",
    title: "Blockchain Development Expert",
    image: "/placeholder.svg?height=400&width=400&text=CM",
    rating: 4.8,
    reviewCount: 289,
    studentCount: 4320,
    courseCount: 3,
    specialties: ["Blockchain", "Smart Contracts", "Cryptocurrency"],
    bio: "Blockchain developer who has worked on several major cryptocurrency projects. Specializes in teaching smart contract development and blockchain architecture.",
    featured: false,
    languages: ["English", "Spanish"],
    price: "$27.99/hour",
  },
  {
    id: 11,
    name: "Lisa Wang",
    title: "Data Analytics Instructor",
    image: "/placeholder.svg?height=400&width=400&text=LW",
    rating: 4.7,
    reviewCount: 267,
    studentCount: 3980,
    courseCount: 4,
    specialties: ["SQL", "Tableau", "Power BI", "Excel"],
    bio: "Data analyst with experience in healthcare and finance industries. Teaches practical data analysis skills with a focus on business applications.",
    featured: false,
    languages: ["English", "Mandarin"],
    price: "$22.99/hour",
  },
  {
    id: 12,
    name: "Ahmed Hassan",
    title: "Artificial Intelligence Specialist",
    image: "/placeholder.svg?height=400&width=400&text=AH",
    rating: 4.9,
    reviewCount: 245,
    studentCount: 3650,
    courseCount: 3,
    specialties: ["Machine Learning", "Deep Learning", "Computer Vision"],
    bio: "AI researcher with publications in top conferences. Makes complex AI concepts accessible to students of all backgrounds.",
    featured: true,
    languages: ["English", "Arabic"],
    price: "$28.99/hour",
  },
];

// Categories for filtering
const categories = [
  "Web Development",
  "Data Science",
  "Design",
  "Business",
  "Mobile Development",
  "Cybersecurity",
  "Marketing",
  "Cloud Computing",
  "Blockchain",
  "Artificial Intelligence",
];

// Languages for filtering
const languages = [
  "English",
  "Spanish",
  "Mandarin",
  "Hindi",
  "Arabic",
  "Portuguese",
  "French",
  "Korean",
];

export default function InstructorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Learn from Expert Instructors
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Connect with industry professionals who are passionate about
              teaching and helping you succeed.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for instructors by name, specialty, or keyword..."
                  className="w-full pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-lg border bg-background p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm">
                    Reset
                  </Button>
                </div>

                <Accordion type="multiple" className="mt-4 w-full">
                  <AccordionItem value="category">
                    <AccordionTrigger>Specialties</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`category-${category}`} />
                            <label
                              htmlFor={`category-${category}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rating">
                    <AccordionTrigger>Rating</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                          <div
                            key={rating}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`rating-${rating}`} />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="flex items-center space-x-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              <span>{rating}+</span>
                              <div className="flex">
                                {Array(Math.floor(rating))
                                  .fill(null)
                                  .map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-3 w-3 fill-primary text-primary"
                                    />
                                  ))}
                                {rating % 1 !== 0 && (
                                  <Star className="h-3 w-3 fill-primary text-primary" />
                                )}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider defaultValue={[0, 50]} max={100} step={1} />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">$0</span>
                          <span className="text-sm">$100+</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="language">
                    <AccordionTrigger>Languages</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {languages.map((language) => (
                          <div
                            key={language}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`language-${language}`} />
                            <label
                              htmlFor={`language-${language}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {language}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="experience">
                    <AccordionTrigger>Experience Level</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[
                          "Beginner-friendly",
                          "Intermediate",
                          "Advanced",
                          "All Levels",
                        ].map((level) => (
                          <div
                            key={level}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`level-${level}`} />
                            <label
                              htmlFor={`level-${level}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button className="mt-6 w-full">Apply Filters</Button>
              </div>
            </div>

            {/* Instructor Listings */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold">Our Instructors</h2>
                  <p className="text-sm text-muted-foreground">
                    Showing 1-12 of 42 instructors
                  </p>
                </div>
                <div className="flex w-full items-center gap-4 sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Grid3X3 className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                  </div>
                  <Select defaultValue="rating">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="students">Most Students</SelectItem>
                      <SelectItem value="courses">Most Courses</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {instructors.map((instructor) => (
                  <Link
                    key={instructor.id}
                    href={`/instructors/${instructor.id}`}
                  >
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="relative">
                        <div className="aspect-square relative">
                          <Image
                            src={instructor.image || "/placeholder.svg"}
                            alt={instructor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {instructor.featured && (
                          <div className="absolute left-2 top-2">
                            <Badge className="bg-primary text-primary-foreground">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{instructor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {instructor.title}
                        </p>

                        <div className="mt-2 flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">
                            {instructor.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({instructor.reviewCount} reviews)
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {instructor.specialties
                            .slice(0, 3)
                            .map((specialty, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {specialty}
                              </Badge>
                            ))}
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>
                              {instructor.studentCount.toLocaleString()}{" "}
                              students
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{instructor.courseCount} courses</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-xs">
                            {instructor.languages.slice(0, 2).join(", ")}
                            {instructor.languages.length > 2 && " +"}
                          </div>
                          <div className="font-semibold">
                            {instructor.price}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                    <span className="sr-only">Previous page</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8">
                    1
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8">
                    3
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8">
                    4
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                    <span className="sr-only">Next page</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet Our Top Instructors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn from industry leaders with proven teaching experience and
              exceptional student reviews.
            </p>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="web" className="w-full">
              <TabsList className="mx-auto flex max-w-lg justify-center">
                <TabsTrigger value="web">Web Development</TabsTrigger>
                <TabsTrigger value="data">Data Science</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>

              <TabsContent value="web" className="mt-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {instructors
                    .filter((i) =>
                      i.specialties.some((s) =>
                        [
                          "JavaScript",
                          "React",
                          "Node.js",
                          "Web Development",
                        ].includes(s)
                      )
                    )
                    .slice(0, 3)
                    .map((instructor) => (
                      <Card key={instructor.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="aspect-square w-full sm:w-1/3">
                            <Image
                              src={instructor.image || "/placeholder.svg"}
                              alt={instructor.name}
                              width={150}
                              height={150}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-4">
                            <h3 className="font-semibold">{instructor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {instructor.title}
                            </p>
                            <div className="mt-2 flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm">
                                {instructor.rating}
                              </span>
                            </div>
                            <p className="mt-2 text-xs line-clamp-3">
                              {instructor.bio}
                            </p>
                            <Button
                              variant="link"
                              size="sm"
                              asChild
                              className="mt-2 px-0"
                            >
                              <Link href={`/instructors/${instructor.id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="data" className="mt-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {instructors
                    .filter((i) =>
                      i.specialties.some((s) =>
                        [
                          "Python",
                          "Machine Learning",
                          "Data Analysis",
                          "Data Science",
                        ].includes(s)
                      )
                    )
                    .slice(0, 3)
                    .map((instructor) => (
                      <Card key={instructor.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="aspect-square w-full sm:w-1/3">
                            <Image
                              src={instructor.image || "/placeholder.svg"}
                              alt={instructor.name}
                              width={150}
                              height={150}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-4">
                            <h3 className="font-semibold">{instructor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {instructor.title}
                            </p>
                            <div className="mt-2 flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm">
                                {instructor.rating}
                              </span>
                            </div>
                            <p className="mt-2 text-xs line-clamp-3">
                              {instructor.bio}
                            </p>
                            <Button
                              variant="link"
                              size="sm"
                              asChild
                              className="mt-2 px-0"
                            >
                              <Link href={`/instructors/${instructor.id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {instructors
                    .filter((i) =>
                      i.specialties.some((s) =>
                        [
                          "UI Design",
                          "User Research",
                          "Figma",
                          "Adobe XD",
                          "Graphic Design",
                        ].includes(s)
                      )
                    )
                    .slice(0, 3)
                    .map((instructor) => (
                      <Card key={instructor.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="aspect-square w-full sm:w-1/3">
                            <Image
                              src={instructor.image || "/placeholder.svg"}
                              alt={instructor.name}
                              width={150}
                              height={150}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-4">
                            <h3 className="font-semibold">{instructor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {instructor.title}
                            </p>
                            <div className="mt-2 flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm">
                                {instructor.rating}
                              </span>
                            </div>
                            <p className="mt-2 text-xs line-clamp-3">
                              {instructor.bio}
                            </p>
                            <Button
                              variant="link"
                              size="sm"
                              asChild
                              className="mt-2 px-0"
                            >
                              <Link href={`/instructors/${instructor.id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="business" className="mt-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {instructors
                    .filter((i) =>
                      i.specialties.some((s) =>
                        [
                          "Business Strategy",
                          "Marketing",
                          "Entrepreneurship",
                        ].includes(s)
                      )
                    )
                    .slice(0, 3)
                    .map((instructor) => (
                      <Card key={instructor.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="aspect-square w-full sm:w-1/3">
                            <Image
                              src={instructor.image || "/placeholder.svg"}
                              alt={instructor.name}
                              width={150}
                              height={150}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-4">
                            <h3 className="font-semibold">{instructor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {instructor.title}
                            </p>
                            <div className="mt-2 flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="text-sm">
                                {instructor.rating}
                              </span>
                            </div>
                            <p className="mt-2 text-xs line-clamp-3">
                              {instructor.bio}
                            </p>
                            <Button
                              variant="link"
                              size="sm"
                              asChild
                              className="mt-2 px-0"
                            >
                              <Link href={`/instructors/${instructor.id}`}>
                                View Profile
                              </Link>
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Become an Instructor CTA */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-lg bg-primary p-8 md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
                  Share Your Knowledge
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/90">
                  Join our community of expert instructors and help students
                  around the world achieve their goals.
                </p>
                <ul className="mt-6 space-y-2 text-primary-foreground/90">
                  <li className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary-foreground" />
                    <span>Reach thousands of eager students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary-foreground" />
                    <span>
                      Create courses on subjects you're passionate about
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary-foreground" />
                    <span>Join a supportive community of educators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary-foreground" />
                    <span>Earn income sharing your expertise</span>
                  </li>
                </ul>
                <Button size="lg" variant="secondary" className="mt-8" asChild>
                  <Link href="/become-instructor">Become an Instructor</Link>
                </Button>
              </div>
              <div className="relative hidden md:block">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Teaching"
                  alt="Become an instructor"
                  width={600}
                  height={400}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
