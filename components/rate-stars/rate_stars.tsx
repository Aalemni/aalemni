import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  total?: number;
  className?: string;
}

export default function RatingStars({
  rating,
  total = 5,
  className,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const stars = [];

  for (let i = 0; i < total; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 fill-primary text-primary ${className}`}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className={`h-4 w-4 fill-primary text-primary ${className}`}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 text-muted-foreground ${className}`}
        />
      );
    }
  }

  return <div className="flex">{stars}</div>;
}
