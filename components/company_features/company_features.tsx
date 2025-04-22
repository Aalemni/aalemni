"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BookOpen, Users, Clock, Award, Globe, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Feature } from "@/types/types";

const featuresIconMap = {
  BookOpen,
  Users,
  Clock,
  Award,
  Globe,
  BarChart,
};

interface FeaturesCarouselProps {
  company_features: Feature[];
}

export default function FeaturesCarousel({
  company_features,
}: FeaturesCarouselProps) {
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
        }}        loop
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {company_features.map((benefit, i) => (
          <SwiperSlide key={i}>
            <Card className="border-none shadow-none hover:bg-aalemni-light/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${benefit.color} ${benefit.icon_color}`}
                  >
                    {(() => {
                      const IconComponent =
                        featuresIconMap[
                          benefit.icon as keyof typeof featuresIconMap
                        ];
                      return IconComponent ? (
                        <IconComponent className="h-6 w-6" />
                      ) : null;
                    })()}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-aalemni-navy">
                    {benefit.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {benefit.description}
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
