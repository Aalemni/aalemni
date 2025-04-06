export type Course = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  instructor: {
    id: number;
    name: string;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
  };
  rating: number;
  reviewCount: number;
  studentCount: number;
  level: string;
  lastUpdated: string;
  language: string;
  format: string;
  duration: {
    hours: number;
    weeks: number;
  };
  price: string;
  discountPrice: string;
  discountEnds: string;
  tags: string[];
  description: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  targetAudience: string[];
  syllabus: {
    title: string;
    date: string;
    classes: {
      title: string;
      date: string;
      dayOfWeek: string;
      sessions: {
        title: string;
        time: string;
        type: string;
        date?: string;
        dayOfWeek?: string;
      }[];
      moreItems: number;
    }[];
  }[];
  resources: {
    title: string;
    type: string;
    size: string;
    url: string;
  }[];
  projects: {
    title: string;
    description: string;
    image: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  reviews: {
    id: number;
    name: string;
    image: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  relatedCourses: {
    id: number;
    title: string;
    image: string;
    instructor: string;
    rating: number;
    price: string;
  }[];
};
