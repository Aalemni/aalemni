export type Locale = "en" | "ar"

export type TranslationKey =
  | "common.home"
  | "common.courses"
  | "common.instructors"
  | "common.becomeTrainer"
  | "common.partners"
  | "common.community"
  | "common.contactUs"
  | "common.login"
  | "common.signup"
  | "common.search"
  | "common.searchCourses"
  | "common.help"
  | "common.language"
  | "hero.title"
  | "hero.subtitle"
  | "hero.getStarted"
  | "hero.exploreCourses"
  | "hero.reviews"
  | "stats.activeLearnersTitle"
  | "stats.expertInstructorsTitle"
  | "stats.coursesAvailableTitle"
  | "stats.learningHoursTitle"
  | "categories.title"
  | "categories.subtitle"
  | "categories.webDevelopment"
  | "categories.business"
  | "categories.dataScience"
  | "categories.design"
  | "categories.marketing"
  | "categories.personalDevelopment"
  | "featuredCourses.title"
  | "featuredCourses.subtitle"
  | "featuredCourses.viewAll"
  | "benefits.title"
  | "benefits.subtitle"
  | "benefits.curriculum.title"
  | "benefits.curriculum.description"
  | "benefits.instructors.title"
  | "benefits.instructors.description"
  | "benefits.flexibility.title"
  | "benefits.flexibility.description"
  | "benefits.certificates.title"
  | "benefits.certificates.description"
  | "benefits.community.title"
  | "benefits.community.description"
  | "benefits.career.title"
  | "benefits.career.description"
  | "cta.title"
  | "cta.subtitle"
  | "cta.getStarted"
  | "cta.exploreCourses"
  | "cta.noCreditCard"
  | "becomeInstructor.hero.title"
  | "becomeInstructor.hero.subtitle"
  | "becomeInstructor.hero.applyButton"
  | "becomeInstructor.hero.learnMoreButton"
  | "becomeInstructor.hero.joinInstructors"
  | "testimonials.title"
  | "testimonials.subtitle"
  | "partners.title"
  | "partners.subtitle"
  | "footer.about"
  | "footer.quickLinks"
  | "footer.support"
  | "footer.legal"
  | "footer.subscribe"
  | "footer.subscribeText"
  | "footer.copyright"

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    "common.home": "Home",
    "common.courses": "Courses",
    "common.instructors": "Instructors",
    "common.becomeTrainer": "Become a Trainer",
    "common.partners": "Partners",
    "common.community": "Community",
    "common.contactUs": "Contact Us",
    "common.login": "Login",
    "common.signup": "Sign Up",
    "common.search": "Search",
    "common.searchCourses": "Search courses...",
    "common.help": "Help",
    "common.language": "Language",
    "hero.title": "Learn Without Limits",
    "hero.subtitle":
      "Join over 100,000 learners mastering new skills with Aalemni's expert-led courses. Advance your career, explore new passions, and learn at your own pace.",
    "hero.getStarted": "Get Started for Free",
    "hero.exploreCourses": "Explore Courses",
    "hero.reviews": "from over 10,000+ reviews",
    "stats.activeLearnersTitle": "Active Learners",
    "stats.expertInstructorsTitle": "Expert Instructors",
    "stats.coursesAvailableTitle": "Courses Available",
    "stats.learningHoursTitle": "Learning Hours",
    "categories.title": "Explore Our Top Categories",
    "categories.subtitle": "Discover courses in the most in-demand skills across industries.",
    "categories.webDevelopment": "Web Development",
    "categories.business": "Business",
    "categories.dataScience": "Data Science",
    "categories.design": "Design",
    "categories.marketing": "Marketing",
    "categories.personalDevelopment": "Personal Development",
    "featuredCourses.title": "Featured Courses",
    "featuredCourses.subtitle": "Handpicked courses to get you started on your learning journey.",
    "featuredCourses.viewAll": "View All Courses",
    "benefits.title": "Benefits That Set Us Apart",
    "benefits.subtitle": "Discover why thousands of learners and instructors choose Aalemni.",
    "benefits.curriculum.title": "Comprehensive Curriculum",
    "benefits.curriculum.description":
      "Access over 5,000 courses covering the most in-demand skills across industries.",
    "benefits.instructors.title": "Expert Instructors",
    "benefits.instructors.description":
      "Learn from industry professionals with real-world experience and proven teaching methods.",
    "benefits.flexibility.title": "Flexible Learning",
    "benefits.flexibility.description":
      "Study at your own pace, anytime and anywhere, with lifetime access to your courses.",
    "benefits.certificates.title": "Recognized Certificates",
    "benefits.certificates.description":
      "Earn certificates that are recognized by top employers and institutions worldwide.",
    "benefits.community.title": "Global Community",
    "benefits.community.description": "Join a diverse community of learners and instructors from over 150 countries.",
    "benefits.career.title": "Career Advancement",
    "benefits.career.description": "Gain the skills you need to advance your career or pivot to a new industry.",
    "cta.title": "Ready to Transform Your Future?",
    "cta.subtitle": "Join over 100,000 learners already advancing their careers with Aalemni.",
    "cta.getStarted": "Get Started for Free",
    "cta.exploreCourses": "Explore Courses",
    "cta.noCreditCard": "No credit card required. Start learning today.",
    "becomeInstructor.hero.title": "Share Your Expertise",
    "becomeInstructor.hero.subtitle":
      "Become an instructor on Aalemni and help thousands of learners achieve their goals while building your reputation and earning income from your knowledge.",
    "becomeInstructor.hero.applyButton": "Apply to Teach",
    "becomeInstructor.hero.learnMoreButton": "Learn More",
    "becomeInstructor.hero.joinInstructors": "Join 1,200+ instructors already teaching on Aalemni",
    "testimonials.title": "What Our Students Say",
    "testimonials.subtitle": "Hear from students who have transformed their careers with Aalemni.",
    "partners.title": "Our Educational Partners",
    "partners.subtitle": "We collaborate with leading organizations to provide high-quality education.",
    "footer.about": "About Us",
    "footer.quickLinks": "Quick Links",
    "footer.support": "Support",
    "footer.legal": "Legal",
    "footer.subscribe": "Subscribe to our newsletter",
    "footer.subscribeText": "Get the latest news and updates from Aalemni.",
    "footer.copyright": "All rights reserved.",
  },
  ar: {
    "common.home": "الرئيسية",
    "common.courses": "الدورات",
    "common.instructors": "المدربون",
    "common.becomeTrainer": "كن مدربًا",
    "common.partners": "الشركاء",
    "common.community": "المجتمع",
    "common.contactUs": "اتصل بنا",
    "common.login": "تسجيل الدخول",
    "common.signup": "إنشاء حساب",
    "common.search": "بحث",
    "common.searchCourses": "ابحث عن الدورات...",
    "common.help": "المساعدة",
    "common.language": "اللغة",
    "hero.title": "تعلم بلا حدود",
    "hero.subtitle":
      "انضم إلى أكثر من 100,000 متعلم يتقنون مهارات جديدة مع دورات علمني التي يقودها خبراء. طور حياتك المهنية، واستكشف شغفًا جديدًا، وتعلم بوتيرتك الخاصة.",
    "hero.getStarted": "ابدأ مجانًا",
    "hero.exploreCourses": "استكشف الدورات",
    "hero.reviews": "من أكثر من 10,000+ تقييم",
    "stats.activeLearnersTitle": "متعلم نشط",
    "stats.expertInstructorsTitle": "مدرب خبير",
    "stats.coursesAvailableTitle": "دورة متاحة",
    "stats.learningHoursTitle": "ساعة تعليمية",
    "categories.title": "استكشف أهم الفئات لدينا",
    "categories.subtitle": "اكتشف الدورات في المهارات الأكثر طلبًا عبر مختلف الصناعات.",
    "categories.webDevelopment": "تطوير الويب",
    "categories.business": "الأعمال",
    "categories.dataScience": "علوم البيانات",
    "categories.design": "التصميم",
    "categories.marketing": "التسويق",
    "categories.personalDevelopment": "التطوير الشخصي",
    "featuredCourses.title": "الدورات المميزة",
    "featuredCourses.subtitle": "دورات مختارة بعناية لمساعدتك في بدء رحلة التعلم الخاصة بك.",
    "featuredCourses.viewAll": "عرض جميع الدورات",
    "benefits.title": "المزايا التي تميزنا",
    "benefits.subtitle": "اكتشف لماذا يختار الآلاف من المتعلمين والمدربين علمني.",
    "benefits.curriculum.title": "منهج شامل",
    "benefits.curriculum.description": "الوصول إلى أكثر من 5,000 دورة تغطي المهارات الأكثر طلبًا في مختلف الصناعات.",
    "benefits.instructors.title": "مدربون خبراء",
    "benefits.instructors.description": "تعلم من محترفين في الصناعة ذوي خبرة عملية وأساليب تدريس مثبتة.",
    "benefits.flexibility.title": "تعلم مرن",
    "benefits.flexibility.description": "ادرس بوتيرتك الخاصة، في أي وقت وأي مكان، مع وصول مدى الحياة إلى دوراتك.",
    "benefits.certificates.title": "شهادات معترف بها",
    "benefits.certificates.description":
      "احصل على شهادات معترف بها من قبل أفضل أرباب العمل والمؤسسات في جميع أنحاء العالم.",
    "benefits.community.title": "مجتمع عالمي",
    "benefits.community.description": "انضم إلى مجتمع متنوع من المتعلمين والمدربين من أكثر من 150 دولة.",
    "benefits.career.title": "التقدم المهني",
    "benefits.career.description": "اكتسب المهارات التي تحتاجها للتقدم في حياتك المهنية أو الانتقال إلى صناعة جديدة.",
    "cta.title": "هل أنت مستعد لتحويل مستقبلك؟",
    "cta.subtitle": "انضم إلى أكثر من 100,000 متعلم يطورون حياتهم المهنية بالفعل مع علمني.",
    "cta.getStarted": "ابدأ مجانًا",
    "cta.exploreCourses": "استكشف الدورات",
    "cta.noCreditCard": "لا حاجة لبطاقة ائتمان. ابدأ التعلم اليوم.",
    "becomeInstructor.hero.title": "شارك خبرتك",
    "becomeInstructor.hero.subtitle":
      "كن مدربًا على علمني وساعد آلاف المتعلمين على تحقيق أهدافهم مع بناء سمعتك وكسب الدخل من معرفتك.",
    "becomeInstructor.hero.applyButton": "تقدم للتدريس",
    "becomeInstructor.hero.learnMoreButton": "اعرف المزيد",
    "becomeInstructor.hero.joinInstructors": "انضم إلى أكثر من 1,200 مدرب يدرسون بالفعل على علمني",
    "testimonials.title": "ماذا يقول طلابنا",
    "testimonials.subtitle": "اسمع من الطلاب الذين غيروا حياتهم المهنية مع علمني.",
    "partners.title": "شركاؤنا التعليميون",
    "partners.subtitle": "نتعاون مع المنظمات الرائدة لتقديم تعليم عالي الجودة.",
    "footer.about": "من نحن",
    "footer.quickLinks": "روابط سريعة",
    "footer.support": "الدعم",
    "footer.legal": "قانوني",
    "footer.subscribe": "اشترك في نشرتنا الإخبارية",
    "footer.subscribeText": "احصل على آخر الأخبار والتحديثات من علمني.",
    "footer.copyright": "جميع الحقوق محفوظة.",
  },
}

