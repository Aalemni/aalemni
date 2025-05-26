"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Star,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Course_courses } from "@/types/types";
import { deleteCourse } from "@/supabase/actions/course_actions";
import { useSearchParams, useRouter } from "next/navigation";

type CoursesPageProps = {
  courses: Course_courses[];
  itemsPerPage: number;
  courses_count: number;
};

export default function InstructorCourses({
  courses,
  itemsPerPage,
  courses_count,
}: CoursesPageProps) {
  // console.log(courses);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | "">("");

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [isFreeChecked, setIsFreeChecked] = useState(false);
  const [isNoPriceChecked, setIsNoPriceChecked] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedRates, setselectedRates] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("none");
  const [selectedStatus, setSelectedStatus] = useState<string | "">("all");

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

    const rateFromURL = searchParams.get("rate")?.split(",").map(Number) || [];
    setselectedRates(rateFromURL);

    const sortFromURL = searchParams.get("sort") || "none";
    setSelectedSort(sortFromURL);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim().length > 0) {
      params.set("q", search.trim());
    } else {
      params.delete("q");
    }

    // Optional: Reset to first page on new search
    params.delete("currentPage");

    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    params.delete("currentPage");
    router.push(`?${params.toString()}`);
  };

  const handleCategoryChange = (checked: boolean, categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      let updatedCategories = checked
        ? [...prevSelectedCategories, categoryId]
        : prevSelectedCategories.filter((id) => id !== categoryId);

      updateParamArray("category", updatedCategories);

      return updatedCategories;
    });
  };

  const handleLevelChange = (checked: boolean, levelId: string) => {
    setSelectedLevels((prevSelectedLevels) => {
      let updatedLevels = checked
        ? [...prevSelectedLevels, levelId]
        : prevSelectedLevels.filter((id) => id !== levelId);

      updateParamArray("level", updatedLevels);

      return updatedLevels;
    });
  };

  const handleRateChange = (checked: boolean, rate: number) => {
    setselectedRates((prevSelectedRates) => {
      let updatedRates = checked
        ? [...prevSelectedRates, rate]
        : prevSelectedRates.filter((item) => item !== rate);

      updateParamArray("rating", updatedRates);

      return updatedRates;
    });
  };

  const HandlePriceChange = (checked: boolean, price: number) => {
    setPriceRange((prevSelectedPrice) => {
      let updatedPriceRange = checked
        ? [...prevSelectedPrice, price]
        : prevSelectedPrice.filter((item) => item !== price);

      updateParamArray("price", updatedPriceRange);

      return updatedPriceRange;
    });
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    params.delete("currentPage");
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("currentPage", page.toString());
    setCurrentPage(page);
    router.push(`?${params.toString()}`);
  };

  const updateParamArray = (key: string, values: any[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }
    params.delete("currentPage");
    router.push(`?${params.toString()}`);
  };

  // Mock data - would come from API in production
  const coursess = [
    {
      id: 1,
      title: "Advanced Web Development with React",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 342,
      rating: 4.9,
      lastUpdated: "2025-03-15",
      status: "published",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 256,
      rating: 4.7,
      lastUpdated: "2025-02-28",
      status: "published",
      category: "Data Science",
    },
    {
      id: 3,
      title: "Data Science for Beginners",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 189,
      rating: 4.6,
      lastUpdated: "2025-01-20",
      status: "published",
      category: "Data Science",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 215,
      rating: 4.8,
      lastUpdated: "2025-03-05",
      status: "published",
      category: "Design",
    },
    {
      id: 5,
      title: "Introduction to Blockchain",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 0,
      rating: 0,
      lastUpdated: "2025-04-01",
      status: "draft",
      category: "Blockchain",
    },
  ];

  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the course
    console.log(`Deleting course ${courseToDelete}`);
    // deleteCourse(courseToDelete);
    setDeleteDialogOpen(false);
    setCourseToDelete("");
  };

  const safeItemsPerPage = Number(itemsPerPage) || 10;
  const safeCoursesCount = Number(courses_count) || 0;

  const totalPages = Math.ceil(safeCoursesCount / safeItemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage My Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Create, edit and manage your courses
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <form
                onSubmit={handleSearch}
                id="seach_form"
                className="relative w-full max-w-2xl"
              >
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                  }}
                />
              </form>
            </div>
            <div className="flex gap-4">
              <Select
                value={selectedStatus}
                onValueChange={(value) => handleStatusChange(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedSort}
                onValueChange={(e) => handleSortChange(e)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Sorting</SelectItem>
                  <SelectItem value="rating-low">
                    Rating: Low to High
                  </SelectItem>
                  <SelectItem value="rating-high">
                    Rating: High to Low
                  </SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>
            You have {courses.length} course
            {courses.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Course
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">
                    Students
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">
                    Rating
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">
                    Last Updated
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.courseid}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Image
                          src={"/placeholder.svg"}
                          alt={course.title}
                          width={60}
                          height={40}
                          className="rounded mr-3"
                        />
                        <div>
                          <span className="font-medium block">
                            {course.title}
                          </span>
                          <span className="text-sm text-gray-500">
                            {course.categoryname}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">not now</td>
                    <td className="text-center py-4 px-4">
                      {course.average_rating > 0 ? (
                        <div className="flex items-center justify-center">
                          <span className="mr-1">{course.average_rating}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {new Date(course.last_updated).toLocaleDateString()}
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge
                        variant={
                          course.status === "published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {course.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/instructor/courses/${course.courseid}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link
                            href={`/instructor/courses/${course.courseid}`}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(course.courseid)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {courses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No courses found. Try adjusting your filters or create a
                      new course.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  <ChevronDown className="h-4 w-4 rotate-90" />
                  <span className="sr-only">Previous page</span>
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "outline" : "ghost"}
                      size="sm"
                      className="h-8 w-8"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={courses.length < itemsPerPage}
                >
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
