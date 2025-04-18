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

export type Instructor = {
  id: number;
  name: string;
  title: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  courseCount: number;
  specialties: string[];
  bio: string;
  featured: boolean;
  languages: string[];
  price: string;
  location: string;
  experience: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  about: string;
  courses: {
    id: number;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
    studentCount: number;
    level: string;
    hours: number;
    price: string;
    description: string;
  }[];
  reviews: {
    id: number;
    name: string;
    image: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  schedule: {
    id: number;
    title: string;
    date: string;
    time: string;
    spots: string;
  }[];
};

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export type Course_2 = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  students: number;
  rating: number;
  lastUpdated: string; // or Date if you prefer
  status: "draft" | "published" | "archived"; // assuming fixed statuses
  category: string;
  modules: {
    id: number;
    title: string;
    description: string;
    lessons: {
      id: number;
      title: string;
      description: string;
      duration: string;
      pages: {
        id: number;
        title: string;
      }[];
    }[];
  }[];
  forum: {
    totalTopics: number;
    unansweredQuestions: number;
  };
  reviews: {
    total: number;
    average: number;
    distribution: {
      stars: 1 | 2 | 3 | 4 | 5;
      count: number;
    }[];
  };
};

export type CoursePayload = {
  title: string;
  name: string;
  overview: string;
  description: string;
  levelId: string;
  keyTopics: string[];
  previewImage?: string | null;
  resources: string[];
  price: number;
};

export type Instructor_courses = {
  userid: string;
  fullname: string;
  username: string;
  email: string;
  phonenumber: string;
  role: string;
  status: string;
};

export type Category_courses = {
  categoryid: string;
  categoryname: string;
  color: string;
  icon: string;
  text_color: string;
};

export type Tag_courses = {
  tagid: string;
  tagname: string;
  color: string;
  icon: string;
  text_color: string;
};

export type PublicTestimonial = {
  testimonialid: string;
  fullname: string;
  email: string;
  description: string;
  rate: number;
  companyid: number;
};

export type User = {
  userid: string;
  fullname: string;
  username: string;
  email: string;
  phonenumber: string;
  role: string;
  status: string;
};

export type Level_courses = {
  levelid: string;
  name: string;
  display_order: number;
};

export type Course_courses = {
  courseid: string;
  instructorid: string;
  name: string;
  title: string;
  overview: string;
  resources: string[] | null;
  levelid: string;
  createdat: string;
  keytopics: string[] | null;
  previewimage: string | null;
  price: number;
  instructor: Instructor_courses;
  categoryid: number;
  category: Category_courses;
};

export type Course_courses_with_level = {
  courseid: string;
  instructorid: string;
  name: string;
  title: string;
  overview: string;
  resources: string[] | null;
  levelid: string;
  createdat: string;
  keytopics: string[] | null;
  previewimage: string | null;
  price: number;
  instructor: Instructor_courses;
  categoryid: number;
  category: Category_courses;
  level: Level_courses;
};

export type Instructor_testimonial_raw = {
  testimonialid: string;
  instructorid: string;
  description: string;
  rate: number;
  instructor: {
    userid: string;
    fullname: string;
    username: string;
    email: string;
    phonenumber: string;
    role: string;
    status: string;
  };
};

export type Instructor_detail = {
  detailid: string;
  instructorid: string;
  bio: string | null;
  experience: any; // Or define a proper export type if needed
  certificates: any;
  role: string | null;
};

export type FullInstructorTestimonial = {
  testimonialid: string;
  instructorid: string;
  description: string;
  rate: number;
  userid: string;
  fullname: string;
  username: string;
  email: string;
  phonenumber: string;
  role: string;
  status: string;
  detailid: string | null;
  bio: string | null;
  experience: any;
  certificates: any;
  instructor_role: string | null;
};

export type Feature = {
  featureid: number;
  companyid: number;
  name: string;
  icon: string;
  description: string;
  color: string;
  icon_color: string;
};

export type Specialty = {
  specialityid: string;
  specialityname: string;
  color: string;
  icon: string;
};

export type Instructor_Benefit = {
  benefitid: string;
  title: string;
  description: string;
  icon: string;
};

export type InstructorSpecialty = {
  instructor_specialtiesid?: string;
  specialityid: string;
  instructorid: string;
};
