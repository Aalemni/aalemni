"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for wishlist courses
const wishlistCoursesData = [
  {
    id: 1,
    title: "Advanced JavaScript Programming",
    instructor: "David Miller",
    image: "/placeholder.svg?height=200&width=300",
    price: 89.99,
    dateAdded: "2025-03-20",
    order: 1,
  },
  {
    id: 2,
    title: "Financial Planning and Investment",
    instructor: "Jennifer Adams",
    image: "/placeholder.svg?height=200&width=300",
    price: 129.99,
    dateAdded: "2025-03-15",
    order: 2,
  },
  {
    id: 3,
    title: "Graphic Design Masterclass",
    instructor: "Robert Chen",
    image: "/placeholder.svg?height=200&width=300",
    price: 74.99,
    dateAdded: "2025-03-10",
    order: 3,
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    instructor: "Sophia Rodriguez",
    image: "/placeholder.svg?height=200&width=300",
    price: 149.99,
    dateAdded: "2025-03-05",
    order: 4,
  },
];

export default function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCourses, setWishlistCourses] = useState(wishlistCoursesData);

  // Filter courses based on search query
  const filteredCourses = wishlistCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort courses by order
  const sortedCourses = [...filteredCourses].sort((a, b) => a.order - b.order);

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRemoveFromWishlist = (courseId: number) => {
    setWishlistCourses(
      wishlistCourses.filter((course) => course.id !== courseId)
    );
  };

  const moveItemUp = (courseId: number) => {
    const courseIndex = wishlistCourses.findIndex(
      (course) => course.id === courseId
    );
    if (courseIndex <= 0) return; // Already at the top

    const newWishlist = [...wishlistCourses];
    const temp = newWishlist[courseIndex].order;
    newWishlist[courseIndex].order = newWishlist[courseIndex - 1].order;
    newWishlist[courseIndex - 1].order = temp;

    setWishlistCourses(newWishlist);
  };

  const moveItemDown = (courseId: number) => {
    const courseIndex = wishlistCourses.findIndex(
      (course) => course.id === courseId
    );
    if (courseIndex >= wishlistCourses.length - 1) return; // Already at the bottom

    const newWishlist = [...wishlistCourses];
    const temp = newWishlist[courseIndex].order;
    newWishlist[courseIndex].order = newWishlist[courseIndex + 1].order;
    newWishlist[courseIndex + 1].order = temp;

    setWishlistCourses(newWishlist);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            Courses you've saved for later
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by course title or instructor..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Wishlist Course List */}
      {sortedCourses.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">
            {searchQuery ? "No courses found" : "No saved courses"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? "Try a different search term"
              : "Add courses to your wishlist by clicking the heart icon on course pages"}
          </p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white text-red-500 rounded-full"
                    onClick={() => handleRemoveFromWishlist(course.id)}
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {course.instructor}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-xl font-bold text-primary">
                    ${course.price}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Added on {formatDate(course.dateAdded)}
                  </p>
                </div>

                <div className="flex justify-center space-x-2 mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 p-0"
                    onClick={() => moveItemUp(course.id)}
                    disabled={course.order === 1}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 p-0"
                    onClick={() => moveItemDown(course.id)}
                    disabled={course.order === wishlistCourses.length}
                  >
                    ↓
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="px-6 py-4 bg-muted/30 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50"
                  onClick={() => handleRemoveFromWishlist(course.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
                <Button asChild>
                  <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
