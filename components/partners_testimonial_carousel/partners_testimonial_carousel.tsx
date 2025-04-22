"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { PartnerTestimonialWithPartner } from "@/types/types";

interface PartnersTestimonialsCarouselProps {
  partners_testimonials: PartnerTestimonialWithPartner[];
}

export default function PartnersTestimonialsCarousel({
  partners_testimonials,
}: PartnersTestimonialsCarouselProps) {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay
        loop
        pagination={{ clickable: true }}
      >
        {partners_testimonials.map((partners_testimonial, i) => (
          <SwiperSlide key={i}>
            <div key={i} className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={"/placeholder.svg"}
                    alt={partners_testimonial.partners.users.fullname}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">
                    {partners_testimonial.partners.users.fullname}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {partners_testimonial.partners.description}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm italic">"{partners_testimonial.description}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
