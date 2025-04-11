"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { PublicTestimonial } from "@/types/types";
import RatingStars from "../rate-stars/rate_stars";

interface TestimonialsCarouselProps {
  testimonials: PublicTestimonial[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  return (
    <div className="mt-16">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg"
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
                    <RatingStars rating={testimonial.rate} />
                  </div>
                  <p className="mt-4 italic text-muted-foreground">
                    "{testimonial.description}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
