import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { Category_courses } from "@/types/types";
import { ArrowRight, Code, LineChart } from "lucide-react";
interface CategoriesCarouselProps {
  categories: Category_courses[];
}

const CategoriesCarousel = ({ categories }: CategoriesCarouselProps) => {
  const iconMap = {
    Code: Code,
    LineChart: LineChart,
  };

  return (
    <div className="mt-16">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 3000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
          1600: { slidesPerView: 6 },
        }}
      >
        {categories.map((category, i) => (
          <SwiperSlide key={i}>
            <Link
              href={"/courses?category=" + category.categoryid}
              className="group"
            >
              <div className="flex flex-col items-center rounded-lg p-6 text-center transition-all hover:bg-aalemni-light">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${category.color}`}
                >
                  {(() => {
                    const IconComponent =
                      iconMap[category.icon as keyof typeof iconMap];
                    return IconComponent ? (
                      <IconComponent
                        className={`h-8 w-8 ${category.text_color}`}
                      />
                    ) : null;
                  })()}
                </div>
                <h3 className="mt-4 font-semibold text-aalemni-navy">
                  {category.categoryname}
                </h3>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <span className="transition-all group-hover:mr-2">
                    Explore
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesCarousel;
