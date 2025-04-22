export type Course = {
  id: number;
  title: string;
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
  duration: {
    hours: number;
    weeks: number;
  };
  price: string;
  discountPrice: string;
  discountEnds: string;
  tags: string[];
  overview: string;
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

export type Logged_In_User = {
  userid: string;
  fullname: string;
  username: string;
  email: string;
  phonenumber: string;
  role: string;
  status: string;
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

export type Course_courses_2 = {
  courseid: string;
  instructorid: string;
  name: string;
  title: string;
  overview: string;
  resources: string[] | null;
  levelid: string;
  createdat: string;
  updatedat: string;
  keytopics: string[] | null;
  previewimage: string | null;
  price: number;
  instructor: Instructor_courses;
  categoryid: number;
  category: Category_courses;
  average_rating: number;
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
  last_updated: string;
  keytopics: string[] | null;
  previewimage: string | null;
  price: number;
  categoryid: string;
  userid: string;
  fullname: string;
  username: string;
  email: string;
  phonenumber: string;
  role: string;
  status: string;
  categoryname: string;
  color: string;
  icon: string;
  text_color: string;
  average_rating: number;
  total_duration_minutes: number;
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
  updatedat: string;
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

export type Course_by_id = {
  courseid: string;
  instructorid: string;
  name: string;
  title: string;
  overview: string;
  resources: string | null;
  levelid: string;
  createdat: string; // ISO date string
  updatedat: string; // ISO date string
  keytopics: string | null;
  previewimage: string | null;
  price: number;
  categoryid: string;
  instructor: Instructor_In_Course;
  instructor_details: Instructor_Detail_In_Course;
  category: Category_In_Course;
  level: Level;
  module: Module[];
  totalDurationMinutes: number;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
};

export type Instructor_In_Course = {
  role: string;
  email: string;
  status: string;
  userid: string;
  fullname: string;
  username: string;
  phonenumber: string;
};

export type Category_In_Course = {
  icon: string;
  color: string;
  categoryid: string;
  text_color: string;
  categoryname: string;
};

export type Level = {
  name: string;
  levelid: string;
  display_order: number;
};

export type Module = {
  name: string;
  title: string;
  lesson: Lesson[];
  courseid: string;
  moduleid: string;
  overview: string;
  display_order: number;
};

export type Lesson = {
  name: string;
  title: string;
  page: Page[];
  lessonid: string;
  moduleid: string;
  overview: string;
  display_order: number;
};

export type Page = {
  name: string;
  title: string;
  pageid: string;
  content: string;
  lessonid: string;
  overview: string;
  completed: boolean;
  display_order: number;
  estimatedduration: number;
};

export type Review = {
  reviewid: string;
  courseid: string;
  userid: string;
  description: string;
  rate: number;
  createdat: string;
  user: Logged_In_User;
};

type Instructor_Detail_In_Course = {
  detailid: string; // UUID
  instructorid: string; // UUID
  bio: string; // Bio is a string but could be null if not available
  experience: Array<{
    date: string; // Year or date of experience
    company: string; // Company name
    job_title: string; // Job title at the company
  }>;
  certificates: Array<{
    date: string; // Date or year of certification
    company: string; // Issuing company
    job_title: string; // Job title related to the certification
  }>;
  role: string; // Instructor's role (e.g., "Data Science Instructor")
  languages: string[] | null; // List of languages or null if not available
  years_exp: number; // Years of experience
  social_links: Array<{
    url: string; // URL for the social platform
    name: string; // Name of the platform (e.g., "LinkedIn")
  }>;
};

export type Partner = {
  logo: string | null;
  description: string;
  websitelink: string | null;
  partnersince: string;
  partnerid: string;
  partnership_type: number;
  userid: number;
  users: {
    fullname: string;
    username: string;
    email: string;
    phonenumber: string;
    role: string;
    status: string;
  };
};

export type PartnershipType = {
  partnershiptypeid: number;
  companyid: number | 1;
  name: string;
  icon: string;
  description: string;
};

export interface PartnershipFeature {
  partnershipfeatureid: number;
  name: string;
  icon: string ;
  description: string;
  companyid: number | 1;
}

export interface PartnerTestimonial {
  testimonialid: number;
  partnerid: string;
  description: string;
  rate: number | 0;
}

export interface PartnerTestimonialWithPartner {
  testimonialid: number;
  partnerid: string;
  description: string;
  rate: number;
  partners: Partner;
}
