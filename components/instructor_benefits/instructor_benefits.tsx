"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Award,
  BookOpen,
  CreditCard,
  Lightbulb,
  MessageSquare,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Instructor_Benefit } from "@/types/types";

const benefitsIconMap = {
  CreditCard,
  Users,
  Lightbulb,
  Award,
  MessageSquare,
  BookOpen,
};
interface InstructorBenefitsCarouselProps {
  instructor_benefits: Instructor_Benefit[];
}

export default function InstructorBenefitsCarousel({
  instructor_benefits,
}: InstructorBenefitsCarouselProps) {
  return (
    <div className="mt-16">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay
        loop
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {instructor_benefits.map((benefit, i) => (
          <SwiperSlide key={i}>
            <Card className="border-none shadow-none hover:bg-aalemni-light/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {(() => {
                      const IconComponent =
                        benefitsIconMap[
                          benefit.icon as keyof typeof benefitsIconMap
                        ];
                      return IconComponent ? (
                        <IconComponent className="h-6 w-6" />
                      ) : null;
                    })()}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{benefit.title}</h3>
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
