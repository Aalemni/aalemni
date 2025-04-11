"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Course_courses_with_level } from "@/types/types";

interface FeaturedCoursesSwiperProps {
  featured_courses: Course_courses_with_level[];
}

export default function FeaturedCoursesSwiper({
  featured_courses,
}: FeaturedCoursesSwiperProps) {
  return (
    <div className="mt-12">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay
        loop
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {featured_courses.map((course, i) => (
          <SwiperSlide key={i} className="my-4">
            <Link href={`/courses/${course.courseid}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-aalemni-blue">
                <div className="aspect-video relative">
                  <Image
                    src={"/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute right-2 top-2">
                    <Badge
                      variant="secondary"
                      className="bg-aalemni-navy text-white"
                    >
                      {course.category.categoryname}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 text-aalemni-navy">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.instructor.fullname}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-aalemni-orange text-aalemni-orange" />
                    <span className="text-sm font-medium">3</span>
                    <span className="text-xs text-muted-foreground">(50)</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge
                      variant="outline"
                      className="text-xs font-normal border-aalemni-blue text-aalemni-blue"
                    >
                      {course.level.name}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
