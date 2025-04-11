"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FullInstructorTestimonial } from "@/types/types";

interface InstructorTestimonialsCarouselProps {
  instructor_testimonials: FullInstructorTestimonial[];
}

export default function InstructorTestimonialsCarousel({
  instructor_testimonials,
}: InstructorTestimonialsCarouselProps) {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {instructor_testimonials.map((testimonial, i) => (
          <SwiperSlide key={testimonial.testimonialid}>
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition duration-300 h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-primary shadow-sm">
                  <Image
                    src={"/placeholder.svg"} // Replace with actual dynamic image if available
                    alt={testimonial.fullname}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">
                  {testimonial.fullname}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.instructor_role || testimonial.role}
                </p>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">
                    {testimonial.rate}
                  </span>
                </div>

                <p className="italic text-muted-foreground mt-2 text-sm leading-relaxed">
                  "{testimonial.description}"
                </p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
