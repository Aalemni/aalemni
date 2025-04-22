"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Partner } from "@/types/types";

interface PartnersCarouselProps {
  partners: Partner[];
}

export default function PartnersCarousel({ partners }: PartnersCarouselProps) {
  return (
    <div className="mt-16">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 3000, // optional, default is 3000ms
          disableOnInteraction: false, // optional
        }}
        loop
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {partners.map((partner, i) => (
          <SwiperSlide key={i}>
            <Card className="border border-transparent transition-all duration-300 hover:border-aalemni-orange/30 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border bg-background">
                    <Image
                      src={
                        partner.logo ||
                        `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(partner.users.fullname || `Partner ${i + 1}`)}`
                      }
                      alt={partner.users.fullname || `Partner ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold text-sm md:text-base">
                    {partner.users.fullname || `Partner ${i + 1}`}
                  </h3>
                  {partner.description && (
                    <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                      {partner.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
