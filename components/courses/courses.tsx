"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, ChevronDown, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/uii_/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/uii_/badge";
import { Input } from "@/components/uii_/input";
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
import { Checkbox } from "@/components/uii_/checkbox";
import { Slider } from "@/components/ui/slider";
import { Category_courses, Course_courses, Level_courses } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type CoursesPageProps = {
  courses: Course_courses[];
  categories: Category_courses[];
  course_levels: Level_courses[];
};

export default function CoursesPage({
  courses,
  categories,
  course_levels,
}: CoursesPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [isFreeChecked, setIsFreeChecked] = useState(false);
  const [isNoPriceChecked, setIsNoPriceChecked] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  useEffect(() => {
    if (searchParams) {
      const query = searchParams.get("q") || "";
      setSearch(query);
    }
    const categoriesFromURL = searchParams.get("category")?.split(",") || [];
    setSelectedCategories(categoriesFromURL);

    const levelsFromURL = searchParams.get("level")?.split(",") || [];
    setSelectedLevels(levelsFromURL);

    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "200");
    setPriceRange([minPrice, maxPrice]);

    const durationsFromURL = searchParams.get("duration")?.split(",") || [];
    setSelectedDurations(durationsFromURL);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?q=${encodeURIComponent(search)}`);
  };

  const handleCategoryChange = (checked: boolean, categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      let updatedCategories = [...prevSelectedCategories];

      if (checked) {
        if (!updatedCategories.includes(categoryId)) {
          updatedCategories.push(categoryId);
        }
      } else {
        updatedCategories = updatedCategories.filter((id) => id !== categoryId);
      }

      return updatedCategories;
    });
  };

  const handleLevelChange = (checked: boolean, levelId: string) => {
    setSelectedLevels((prevSelectedLevels) => {
      let updatedLevels = [...prevSelectedLevels];

      if (checked) {
        if (!updatedLevels.includes(levelId)) {
          updatedLevels.push(levelId);
        }
      } else {
        updatedLevels = updatedLevels.filter((id) => id !== levelId);
      }

      return updatedLevels;
    });
  };

  const handleDurationChange = (checked: boolean, duration: string) => {
    setSelectedDurations((prevSelectedDurations) => {
      let updatedDurations = [...prevSelectedDurations];

      if (checked) {
        if (!updatedDurations.includes(duration)) {
          updatedDurations.push(duration);
        }
      } else {
        updatedDurations = updatedDurations.filter((item) => item !== duration);
      }

      return updatedDurations;
    });
  };

  const handleRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleFreeChange = (checked: boolean) => {
    setIsFreeChecked(checked);
    if (checked) {
      setPriceRange([0, 0]);
    } else {
      setPriceRange([0, 200]);
    }
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    } else {
      params.delete("category");
    }

    if (selectedLevels.length > 0) {
      params.set("level", selectedLevels.join(","));
    } else {
      params.delete("level");
    }

    if (isNoPriceChecked) {
    } else {
      if (isFreeChecked) {
        params.set("minPrice", "0");
        params.set("maxPrice", "0");
      } else {
        params.set("minPrice", priceRange[0].toString());
        params.set("maxPrice", priceRange[1].toString());
      }
    }

    if (selectedDurations.length > 0) {
      params.set("duration", selectedDurations.join(","));
    } else {
      params.delete("duration");
    }

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {

  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Discover Courses Tailored to Your Goals
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse by category, level, or instructor to start learning today.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <form
                onSubmit={handleSearch}
                id="seach_form"
                className="relative w-full max-w-2xl"
              >
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses by title, trainer, or keyword..."
                  className="w-full pl-10"
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                  }}
                />
              </form>
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
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    Reset
                  </Button>
                </div>

                <Accordion type="multiple" className="mt-4 w-full">
                  <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category) => {
                          const isChecked = selectedCategories.includes(
                            category.categoryid
                          );

                          return (
                            <div
                              key={category.categoryid}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`category-${category.categoryid}`}
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  handleCategoryChange(
                                    checked === true,
                                    category.categoryid
                                  )
                                }
                              />
                              <label
                                htmlFor={`category-${category.categoryid}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.categoryname}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={priceRange}
                          max={200}
                          step={1}
                          onValueChange={handleRangeChange}
                          disabled={isFreeChecked}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">${priceRange[0]}</span>
                          <span className="text-sm">${priceRange[1]}+</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="free-courses"
                            checked={isFreeChecked}
                            onCheckedChange={handleFreeChange}
                          />
                          <label
                            htmlFor="free-courses"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Free Courses
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="no-price-filter"
                            checked={isNoPriceChecked}
                            onCheckedChange={(checked) => {
                              setIsNoPriceChecked(checked === true);
                            }}
                          />
                          <label
                            htmlFor="no-price-filter"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            No Price Filter
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="level">
                    <AccordionTrigger>Difficulty Level</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {course_levels.map((level) => {
                          const isChecked = selectedLevels.includes(
                            level.levelid
                          );
                          return (
                            <div
                              key={level.levelid}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`level-${level.levelid}`}
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  handleLevelChange(
                                    checked === true,
                                    level.levelid
                                  )
                                }
                              />
                              <label
                                htmlFor={`level-${level.levelid}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {level.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="duration">
                    <AccordionTrigger>Course Duration</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {[
                          { id: "0-4", text: "0-4 hours" },
                          { id: "4-10", text: "4-10 hours" },
                          { id: "10-20", text: "10-20 hours" },
                          { id: "20-40", text: "20-40 hours" },
                          { id: "40", text: "40+ hours" },
                        ].map((duration) => (
                          <div
                            key={duration.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`duration_${duration.id}`}
                              checked={selectedDurations.includes(duration.id)}
                              onCheckedChange={(checked) =>
                                handleDurationChange(
                                  checked === true,
                                  duration.id
                                )
                              }
                            />
                            <label
                              htmlFor={`duration_${duration.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {duration.text}
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
                </Accordion>

                <Button className="mt-6 w-full" onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>

            {/* Course Listings */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold">All Courses</h2>
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    {courses.length == 1
                      ? "1 Course"
                      : `${courses.length} Courses`}
                  </p>
                </div>
                <div className="flex w-full items-center gap-4 sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Grid3X3 className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                  </div>
                  <Select defaultValue="popularity">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array(12)
                  .fill(null)
                  .map((_, i) => (
                    <Link key={i} href={`/courses/${i + 1}`}>
                      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                        <div className="aspect-video relative">
                          <Image
                            src={`/placeholder.svg?height=200&width=360&text=Course+${i + 1}`}
                            alt={`Course ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute right-2 top-2">
                            <Badge
                              variant="secondary"
                              className="bg-background/80 backdrop-blur-sm"
                            >
                              {i % 3 === 0
                                ? "Bestseller"
                                : i % 4 === 0
                                  ? "New"
                                  : "Popular"}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {i % 6 === 0
                                ? "Development"
                                : i % 6 === 1
                                  ? "Business"
                                  : i % 6 === 2
                                    ? "Design"
                                    : i % 6 === 3
                                      ? "Marketing"
                                      : i % 6 === 4
                                        ? "Photography"
                                        : "Music"}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span>{(4 + (i % 10) / 10).toFixed(1)}</span>
                            </div>
                          </div>
                          <h3 className="mt-2 font-semibold">
                            {i % 6 === 0
                              ? "Complete Web Development Bootcamp"
                              : i % 6 === 1
                                ? "Business Strategy Fundamentals"
                                : i % 6 === 2
                                  ? "UI/UX Design Masterclass"
                                  : i % 6 === 3
                                    ? "Digital Marketing Essentials"
                                    : i % 6 === 4
                                      ? "Photography for Beginners"
                                      : "Music Theory 101"}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {i % 6 === 0
                              ? "Learn modern web development from scratch"
                              : i % 6 === 1
                                ? "Master business strategy principles"
                                : i % 6 === 2
                                  ? "Create stunning user interfaces"
                                  : i % 6 === 3
                                    ? "Learn effective digital marketing"
                                    : i % 6 === 4
                                      ? "Master photography basics"
                                      : "Understand music theory fundamentals"}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-primary/20" />
                              <span className="text-xs">
                                {i % 4 === 0
                                  ? "John Doe"
                                  : i % 4 === 1
                                    ? "Jane Smith"
                                    : i % 4 === 2
                                      ? "Robert Johnson"
                                      : "Emily Davis"}
                              </span>
                            </div>
                            <span className="font-semibold">
                              {i % 5 === 0
                                ? "Free"
                                : `$${19 + (i % 4) * 10}.99`}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div> */}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Link
                    key={course.courseid}
                    href={`/courses/${course.courseid}`}
                  >
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video relative">
                        <Image
                          src={
                            course.previewimage ||
                            "/placeholder.svg?height=200&width=360&text=No+Image"
                          }
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute right-2 top-2">
                          <Badge
                            variant="secondary"
                            className="bg-background/80 backdrop-blur-sm"
                          >
                            Bestseller{" "}
                            {/* or something dynamic later if you add a field for it */}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {course.category.categoryname}
                            {/* or replace with a `category` if you have one */}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span>4.8</span>{" "}
                            {/* Replace with a real rating if available */}
                          </div>
                        </div>
                        <h3 className="mt-2 font-semibold">{course.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {course.overview}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-primary/20" />
                            <span className="text-xs">
                              {course.instructor.fullname}
                            </span>
                          </div>
                          <span className="font-semibold">
                            {course.price === 0 ? "Free" : `$${course.price}`}
                          </span>
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
    </>
  );
}
