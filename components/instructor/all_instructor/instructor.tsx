"use client";
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
import { useState, useEffect } from "react";
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
import type { IntructorDetails, IntructorFilter } from "@/types/types";

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
const languages = ["English", "Arabic", "French"];

interface InstructorsPageProps {
  instructors: IntructorDetails[];
}

export default function InstructorsPage({ instructors }: InstructorsPageProps) {
  console.log("instructors", instructors);

  const [allInstructors, setAllInstructors] = useState<IntructorDetails[]>([]);
  const [filteredInstructors, setFilteredInstructors] = useState<
    IntructorDetails[]
  >([]);
  useEffect(() => {
    setAllInstructors(instructors);
    setFilteredInstructors(instructors);
  }, [instructors]);

  const [filters, setFilters] = useState<IntructorFilter>({
    languages: [],
    specialities: [],
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    maxRating: 0,
    experience: [],
  });

  const applyFilters = () => {
    const filtered = allInstructors.filter((instructor) => {
      if (filters.languages.length > 0) {
        const hasMatch = instructor.languages.some((lang) =>
          filters.languages.includes(lang)
        );
        if (!hasMatch) return false;
      }

      if (filters.specialities.length > 0) {
        const hasSpeciality = instructor.specialties?.some((spec) =>
          filters.specialities.includes(spec.specialityname)
        );
        if (!hasSpeciality) return false;
      }

      if (
        instructor.price < filters.minPrice ||
        instructor.price > filters.maxPrice
      ) {
        return false;
      }

      if (filters.experience.length > 0) {
        const experienceRanges: Record<string, [number, number]> = {
          Beginner: [1, 2],
          Intermediate: [2, 4],
          Advanced: [5, Infinity],
        };
        console.log("button pressed");
        const matchesExperience = filters.experience.some((level) => {
          const [min, max] = experienceRanges[level];
          return instructor.years_exp >= min && instructor.years_exp <= max;
        });

        if (!matchesExperience) return false;
      }
    });

    setFilteredInstructors(filtered);
  };
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
                            <Checkbox
                              id={`category-${category}`}
                              checked={filters.specialities.includes(category)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFilters((prev) => ({
                                    ...prev,
                                    specialities: [
                                      ...prev.specialities,
                                      category,
                                    ],
                                  }));
                                } else {
                                  setFilters((prev) => ({
                                    ...prev,
                                    specialities: prev.specialities.filter(
                                      (c) => c !== category
                                    ),
                                  }));
                                }
                              }}
                            />
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
                  {/* <AccordionItem value="rating">
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
                  </AccordionItem> */}
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[0, 100]}
                          max={100}
                          step={1}
                          onValueChange={([min, max]) =>
                            setFilters((prev) => ({
                              ...prev,
                              minPrice: min,
                              maxPrice: max,
                            }))
                          }
                        />
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
                      {languages.map((language) => (
                        <div
                          key={language}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`language-${language}`}
                            checked={filters.languages.includes(language)}
                            onCheckedChange={(checked) => {
                              setFilters((prev) => ({
                                ...prev,
                                languages: checked
                                  ? [...prev.languages, language]
                                  : prev.languages.filter(
                                      (l) => l !== language
                                    ),
                              }));
                            }}
                          />
                          <label
                            htmlFor={`language-${language}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {language}
                          </label>
                        </div>
                      ))}
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

                <Button className="mt-6 w-full" onClick={applyFilters}>
                  Apply Filters
                </Button>
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
                  {/* <Select defaultValue="rating">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      {<SelectItem value="students">Most Students</SelectItem>}
                      {<SelectItem value="courses">Most Courses</SelectItem>}
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select> */}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredInstructors.map((instructor) => (
                  <Link
                    key={instructor.userid}
                    href={`/instructors/${instructor.userid}`}
                  >
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="relative">
                        <div className="aspect-square relative">
                          <Image
                            src={"/placeholder.svg"}
                            alt={instructor.fullname}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {instructor.username && (
                          <div className="absolute left-2 top-2">
                            <Badge className="bg-primary text-primary-foreground">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{instructor.fullname}</h3>
                        <p className="text-sm text-muted-foreground">
                          {instructor.email}
                        </p>

                        <div className="mt-2 flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">
                            {instructor.average_rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({instructor.skills?.length ?? 0} skills)
                          </span>
                        </div>

                        {instructor.specialties && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {instructor.specialties
                              .slice(0, 3)
                              .map((specialty, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {specialty.specialityname}
                                </Badge>
                              ))}
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>
                              {instructor.languages.slice(0, 2).join(", ")}
                              {instructor.languages.length > 2 && " +"}
                            </span>
                          </div>
                          <div className="font-semibold">
                            {instructor.years_exp} yrs
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
