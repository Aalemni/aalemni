---- COMPANY INFO TABLE ----
CREATE TABLE company_info (
        companyID SERIAL PRIMARY KEY,
        headerLogo TEXT,
        footerLogo TEXT,
        name VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(50),
        email VARCHAR(255),
        location TEXT,
        location_coordinates TEXT,
        video_url TEXT,
        privacyPolicy TEXT,
        termsAndCondition TEXT
    );

---- COUNTRIES TABLE ----
CREATE TABLE countries (
        countryID SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phoneCode VARCHAR(10),
        flag TEXT,
        symbol VARCHAR(10),
        enabled BOOLEAN DEFAULT TRUE,
        editable BOOLEAN DEFAULT TRUE,
        deletable BOOLEAN DEFAULT FALSE
    );

---- CITIES TABLE ----
CREATE TABLE cities (
        cityID SERIAL PRIMARY KEY,
        countryID INT REFERENCES countries (countryID) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        enabled BOOLEAN DEFAULT TRUE,
        editable BOOLEAN DEFAULT TRUE,
        deletable BOOLEAN DEFAULT FALSE
    );

---- MENU LINKS TABLE ----
CREATE TABLE menu_links (
        menuID SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        link TEXT NOT NULL
    );

---- PARTNERSHIP FEATURES TABLE ----
CREATE TABLE partnership_features (
        partnershipFeatureID SERIAL PRIMARY KEY,
        companyID INT REFERENCES company_info (companyID) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        icon TEXT,
        description TEXT
    );

---- COMPANYY FEATURES TABLE ----
CREATE TABLE company_features (
        featureID SERIAL PRIMARY KEY,
        companyID INT REFERENCES company_info (companyID) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        icon TEXT,
        description TEXT
    );

---- PARTNERSHIP TYPE TABLE ----
CREATE TABLE partnership_type (
        partnershipTypeID SERIAL PRIMARY KEY,
        companyID INT REFERENCES company_info (companyID) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        icon TEXT,
        description TEXT
    );

---- PARTNERS TABLE ----
CREATE TABLE partners (
        partnerID UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logo TEXT,
        description TEXT,
        websiteLink TEXT,
        partnerSince DATE
    );

---- PARTNERS TESTIMONIALS TABLE ----
CREATE TABLE partners_testimonials (
        testimonialID SERIAL PRIMARY KEY,
        partnerID UUID REFERENCES partners (partnerID) ON DELETE CASCADE,
        description TEXT,
        rate INT CHECK (rate BETWEEN 1 AND 5)
    );

---- TESTIMONIALS TABLE ----
CREATE TABLE testimonials (
        testimonialID SERIAL PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        rate INT CHECK (rate BETWEEN 1 AND 5),
        companyID INT REFERENCES company_info (companyID) ON DELETE CASCADE
    );


---- USERS TABLE ----
CREATE TABLE users (
    userID UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    fullName TEXT NOT NULL,
    userName TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phoneNumber TEXT UNIQUE,
    role TEXT CHECK (role IN ('admin', 'instructor', 'student')) NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive', 'pending', 'banned')) NOT NULL
);


---- SUBSCRIPTIONS PLANS TABLE ----
CREATE TABLE subscription_plans (
    planID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price_per_month DECIMAL(10,2) NOT NULL,
    price_per_year DECIMAL(10,2) NOT NULL,
    description TEXT,
    userType TEXT CHECK (userType IN ('instructor', 'student')) NOT NULL
);

---- SUBSCRIPTIONS TABLE ----
CREATE TABLE subscriptions (
    subscriptionID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    planID UUID NOT NULL,
    userID UUID NOT NULL,
    status TEXT CHECK (status IN ('pending', 'paid', 'canceled')) NOT NULL,
    CONSTRAINT fk_plan FOREIGN KEY (planID) REFERENCES subscription_plans(planID) ON DELETE CASCADE,
    CONSTRAINT fk_instructor FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);

---- INSTRUCTOR DETAILS TABLE ----
CREATE TABLE instructor_details (
    detailID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructorID UUID REFERENCES users(userID) ON DELETE CASCADE,
    bio TEXT,
    experience JSONB,  -- Storing experience in structured format
    certificates JSONB  -- Certificates as JSON array
);

---- INSTRUCTOR TESTIMONIALS TABLE ----
CREATE TABLE instructor_testimonials (
    testimonialID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructorID UUID REFERENCES users(userID) ON DELETE CASCADE,
    description TEXT NOT NULL,
    rate INT CHECK (rate BETWEEN 1 AND 5) NOT NULL
);

---- INSTRUCTOR REVIEWS TABLE ----
CREATE TABLE instructor_reviews (
    reviewID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructorID UUID REFERENCES users(userID) ON DELETE CASCADE,
    userID UUID REFERENCES users(userID) ON DELETE CASCADE,
    description TEXT NOT NULL,
    rate INT CHECK (rate BETWEEN 1 AND 5) NOT NULL
);

---- PAYMENT PROVIDERS TABLE ----
CREATE TABLE payment_providers (
    paywithID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    enabled BOOLEAN DEFAULT TRUE,
    type TEXT CHECK (type IN ('Deposit', 'Withdraw')) NOT NULL,
    api_URL TEXT NOT NULL,
    payTransactionDataURL TEXT NOT NULL,
    currency TEXT NOT NULL,
    callbackURL TEXT NOT NULL,
    returnURL TEXT NOT NULL
);

---- USER TRANSACTIONS TABLE ----
CREATE TABLE user_transactions (
    transactionID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    userID UUID REFERENCES users(userID) ON DELETE CASCADE,
    paymentID UUID REFERENCES payment_providers(paywithID) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    coupons TEXT,
    credit_card_info TEXT,  -- (should be encrypted)
    note TEXT,  -- Notes like (course payment, subscription, etc.)
    moreInfo JSONB  -- Contains related IDs like CourseID or PlanID
);

---- COURSE LEVELS TABLE ----
CREATE TABLE course_levels (
    levelID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    display_order INT NOT NULL
);

---- COURSES TABLE ----
CREATE TABLE courses (
    courseID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructorID UUID REFERENCES users(userID) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    overview TEXT,  -- Course description
    resources TEXT[], -- Array of links
    levelID UUID REFERENCES course_levels(levelID) ON DELETE SET NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    keyTopics TEXT[], -- Enum-like array
    previewImage TEXT
);

ALTER TABLE courses
ADD COLUMN categoryid UUID,
ADD CONSTRAINT courses_categoryid_fkey
FOREIGN KEY (categoryid)
REFERENCES categories(categoryid)
ON DELETE SET NULL;

---- FEATURED COURSES TABLE ----
CREATE TABLE featured_courses (
    featured_coursesID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseIDs UUID[] NOT NULL, -- Array of course IDs
    display_order INT NOT NULL
);

---- COURSE CATEGORIES TABLE ----
CREATE TABLE course_categories (
    courseCategoryID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseID UUID REFERENCES courses(courseID) ON DELETE CASCADE,
    categoryIDs UUID[] NOT NULL
);


---- CATEGORIES TABLE ----
CREATE TABLE categories (
    categoryID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    categoryName TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT NOT NULL
);


---- COURSE TAGS TABLE ----
CREATE TABLE course_tags (
    courseTagID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseID UUID REFERENCES courses(courseID) ON DELETE CASCADE,
    tagIDs UUID[] NOT NULL
);

---- TAGS TABLE ----
CREATE TABLE tags (
    tagID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tagName TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT NOT NULL
);

---- MODULE TABLE ----
CREATE TABLE module (
    moduleID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseID UUID REFERENCES courses(courseID) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    overview TEXT, -- HTML from text editor
    display_order INT NOT NULL
);

---- LESSON TABLE ----
CREATE TABLE lesson (
    lessonID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    moduleID UUID REFERENCES module(moduleID) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    overview TEXT, -- HTML from text editor
    display_order INT NOT NULL
);

---- PAGE TABLE ----
CREATE TABLE page (
    pageID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lessonID UUID REFERENCES lesson(lessonID) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    overview TEXT, -- HTML from text editor
    content TEXT, -- HTML content from text editor
    display_order INT NOT NULL,
    estimatedDuration INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

---- COURSE REVIEWS TABLE ---- 
CREATE TABLE course_reviews (
    reviewID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseID UUID NOT NULL,
    userID UUID NOT NULL,
    description TEXT NOT NULL,
    rate INT CHECK (rate BETWEEN 1 AND 5),
    FOREIGN KEY (courseID) REFERENCES courses(courseID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);


---- COMMUNITY TABLE ---- 
CREATE TABLE community (
    communityID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT CHECK (type IN ('general', 'course')) NOT NULL,
    courseID UUID, -- Nullable if type is 'general'
    Title TEXT NOT NULL,
    FOREIGN KEY (courseID) REFERENCES courses(courseID) ON DELETE CASCADE
);


---- WHISHLIST TABLE ----
CREATE TABLE course_wishlist (
    wishlistID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    userID UUID NOT NULL,
    courseID UUID NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);


---- QUESTIONS TABLE -----
CREATE TABLE questions (
    questionID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    communityID UUID NOT NULL,
    userID UUID NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (communityID) REFERENCES community(communityID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);


---- REPLIES TALBE ----
CREATE TABLE replies (
    replyID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    questionID UUID NOT NULL,
    userID UUID NOT NULL,
    text TEXT NOT NULL,
    isParent BOOLEAN NOT NULL DEFAULT FALSE,
    parentID UUID,
    FOREIGN KEY (questionID) REFERENCES questions(questionID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (parentID) REFERENCES replies(replyID) ON DELETE CASCADE
);


---- CERTIFICATES TABLE ----
CREATE TABLE certificates (
    certificateID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseID UUID NOT NULL,
    userID UUID NOT NULL,
    onlineLink TEXT NOT NULL,
    pdfLink TEXT NOT NULL,
    FOREIGN KEY (courseID) REFERENCES courses(courseID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);


---- USER ENROLLED TALBE ----
CREATE TABLE user_enrolled (
    courseID UUID NOT NULL,
    userID UUID NOT NULL,
    DateEnrolled TIMESTAMP DEFAULT now(),
    PRIMARY KEY (courseID, userID),
    FOREIGN KEY (courseID) REFERENCES courses(courseID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);



-- Indexes for faster queries
CREATE INDEX idx_companyID ON company_info (companyID);
CREATE INDEX idx_countryID ON countries (countryID);
CREATE INDEX idx_city_cityID ON cities (cityID);
CREATE INDEX idx_city_countryID ON cities (countryID);
CREATE INDEX idx_menu_links_menuID ON menu_links (menuID);
CREATE INDEX idx_partnershipFeature_partnershipFeatureID ON partnership_features (partnershipFeatureID);
CREATE INDEX idx_partnershipFeature_companyID ON partnership_features (companyID);
CREATE INDEX idx_companyFeature_featureID ON company_features (featureID);
CREATE INDEX idx_companyFeature_companyID ON company_features (companyID);
CREATE INDEX idx_partnershipType_partnershipTypeID ON partnership_type (partnershipTypeID);
CREATE INDEX idx_partnershipType_company ON partnership_type (companyID);
CREATE INDEX idx_partners_partnersID ON partners (partnerID);
CREATE INDEX idx_partners_testimonials_testimonialID ON partners_testimonials (testimonialID);
CREATE INDEX idx_partners_testimonials_partnerID ON partners_testimonials (partnerID);
CREATE INDEX idx_testimonials_testimonialID ON testimonials (testimonialID);
CREATE INDEX idx_testimonials_companyID ON testimonials (companyID);
CREATE INDEX idx_users_userID ON users(userID);
CREATE INDEX idx_users_username ON users(userName);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX subscription_plans_planID ON subscription_plans(planID);
CREATE INDEX idx_subscription_subscriptionID ON subscriptions(subscriptionID);
CREATE INDEX idx_subscription_planID ON subscriptions(planID);
CREATE INDEX idx_subscription_userID ON subscriptions(userID);
CREATE INDEX idx_instructor_details_detailID ON instructor_details(detailID);
CREATE INDEX idx_instructor_details_instructorID ON instructor_details(instructorID);
CREATE INDEX idx_instructor_testimonials_testimonialID ON instructor_testimonials(testimonialID);
CREATE INDEX idx_instructor_testimonials_instructorID ON instructor_testimonials(instructorID);
CREATE INDEX idx_instructor_reviews_reviewID ON instructor_reviews(reviewID);
CREATE INDEX idx_instructor_reviews_instructorID ON instructor_reviews(instructorID);
CREATE INDEX idx_instructor_reviews_userID ON instructor_reviews(userID);
CREATE INDEX idx_payment_providers_paywithID ON payment_providers(paywithID);
CREATE INDEX idx_user_transactions_transactionID ON user_transactions(transactionID);
CREATE INDEX idx_user_transactions_userID ON user_transactions(userID);
CREATE INDEX idx_user_transactions_paymentID ON user_transactions(paymentID);
CREATE INDEX idx_courses_courseID ON courses(courseID);
CREATE INDEX idx_courses_instructorID ON courses(instructorID);
CREATE INDEX idx_courses_levelID ON courses(levelID);
CREATE INDEX idx_featured_courses_featured_coursesID ON featured_courses(featured_coursesID);
CREATE INDEX idx_course_levels_levelID ON course_levels(levelID);
CREATE INDEX idx_course_categories_courseCategoryID ON course_categories(courseCategoryID);
CREATE INDEX idx_course_categories_courseID ON course_categories(courseID);
CREATE INDEX idx_categories_categoryID ON categories(categoryID);
CREATE INDEX idx_course_tags_courseTagID ON course_tags(courseTagID);
CREATE INDEX idx_course_tags_courseID ON course_tags(courseID);
CREATE INDEX idx_tags_tagID ON tags(tagID);
CREATE INDEX idx_module_moduleID ON module(moduleID);
CREATE INDEX idx_module_courseID ON module(courseID);
CREATE INDEX idx_lesson_lessonID ON lesson(lessonID);
CREATE INDEX idx_lessons_moduleID ON lesson(moduleID);
CREATE INDEX idx_pages_pageID ON page(pageID);
CREATE INDEX idx_pages_lessonID ON page(lessonID);
CREATE INDEX idx_course_reviews_reviewID ON course_reviews(reviewID);
CREATE INDEX idx_course_reviews_courseID ON course_reviews(courseID);
CREATE INDEX idx_course_reviews_userID ON course_reviews(userID);
CREATE INDEX idx_community_communityID ON community(communityID);
CREATE INDEX idx_community_courseID ON community(courseID);
CREATE INDEX idx_course_wishlist_wishlistID ON course_wishlist(wishlistID);
CREATE INDEX idx_course_wishlist_userID ON course_wishlist(userID);
CREATE INDEX idx_course_wishlist_courseID ON course_wishlist(courseID);
CREATE INDEX idx_questions_questionID ON questions(questionID);
CREATE INDEX idx_questions_communityID ON questions(communityID);
CREATE INDEX idx_questions_userID ON questions(userID);
CREATE INDEX idx_replies_replyID ON replies(replyID);
CREATE INDEX idx_replies_questionID ON replies(questionID);
CREATE INDEX idx_replies_userID ON replies(userID);
CREATE INDEX idx_certificates_certificateID ON certificates(certificateID);
CREATE INDEX idx_certificates_courseID ON certificates(courseID);
CREATE INDEX idx_certificates_userID ON certificates(userID);
CREATE INDEX idx_user_enrolled_courseID ON user_enrolled(courseID);
CREATE INDEX idx_user_enrolled_userID ON user_enrolled(userID);


-- Enable Row-Level Security in Supabase
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE module ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson ENABLE ROW LEVEL SECURITY;
ALTER TABLE page ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE community ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_enrolled ENABLE ROW LEVEL SECURITY;

-- Create RLS policies in Supabase

---- COMPANY INFO ---- 
CREATE POLICY "Everyone can see company_info"
ON "public"."company_info"
FOR SELECT TO public
USING (true);

---- COUNTRIES ---- 
CREATE POLICY "Everyone can see countries"
ON "public"."countries"
FOR SELECT TO public
USING (true);


---- CITIES ---- 
CREATE POLICY "Everyone can see cities"
ON "public"."cities"
FOR SELECT TO public
USING (true);



---- MENU LINKS ----- 
CREATE POLICY "Everyone can see menu_links"
ON "public"."menu_links"
FOR SELECT TO public
USING (true);


---- PARTNERSHIP FEATURES ---- 
CREATE POLICY "Everyone can see partnership_features"
ON "public"."partnership_features"
FOR SELECT TO public
USING (true);



---- COMPANY FEATUERS ---- 
CREATE POLICY "Everyone can see company_features"
ON "public"."company_features"
FOR SELECT TO public
USING (true);


---- PARTNERSHIP TYPE ---- 
CREATE POLICY "Everyone can see partnership_type"
ON "public"."partnership_type"
FOR SELECT TO public
USING (true);


---- PARTNERS ----- 
CREATE POLICY "Everyone can see partners"
ON "public"."partners"
FOR SELECT TO public
USING (true);
CREATE POLICY "Everyone can apply to become partners"
ON "public"."partners"
FOR INSERT TO public
WITH CHECK (true);


---- PARTNERS TESTIMONIALS ----
CREATE POLICY "Everyone can see partners' testimonials"
ON "public"."partners_testimonials"
FOR SELECT TO public
USING (true);

CREATE POLICY "Only partners can add testimonials"
ON "public"."partners_testimonials"
FOR INSERT TO authenticated
WITH CHECK (EXISTS (
    SELECT 1 FROM public.partners WHERE partners.partnerid = auth.uid()
));

CREATE POLICY "Partners can edit or delete their own testimonials"
  ON "public"."partners_testimonials"
  FOR ALL TO authenticated 
  USING (auth.uid() = partnerid)
  WITH CHECK (auth.uid() = partnerid);


---- TESTIMONIALS ----
CREATE POLICY "Everyone can see testimonials"
ON "public"."testimonials"
FOR SELECT To public
USING (true);
CREATE POLICY "Everyone can add testimonials"
ON "public"."testimonials"
FOR INSERT TO public
WITH CHECK (true);



---- USERS ----
CREATE POLICY "Everyone can register"
ON "public"."users"
FOR INSERT To public
WITH CHECK (true);

CREATE POLICY "Users can see their own data"
ON users
FOR SELECT To authenticated
  USING (userid = auth.uid());

CREATE POLICY "Users can edit their own data"
ON users
FOR UPDATE To authenticated
  USING (userid = auth.uid())
  WITH CHECK (userid = auth.uid());


---- SUBSCRIPTIONS ----
CREATE POLICY "Allow users to insert their subscriptions"
ON subscriptions
FOR INSERT To authenticated
WITH CHECK (userid = auth.uid());
CREATE POLICY "Allow users to view their own subscriptions"
ON subscriptions
FOR SELECT To authenticated
USING (userid = auth.uid());
CREATE POLICY "Prevent users from deleting subscriptions they don’t own"
ON subscriptions
FOR DELETE To authenticated
USING (userid = auth.uid());


---- SUBSICRIPTIONS PLANS ----
CREATE POLICY "Allow everyone to view subscription plans"
ON subscription_plans
FOR SELECT To public
USING (true);


---- INSTRUCTOR REVIEW ----
CREATE POLICY "Authenticated users can view instructor reviews"
ON instructor_reviews
FOR SELECT To authenticated
USING (true);


---- INSTRUCTOR DETAIS ----
CREATE POLICY "Authenticated users can view instructor details"
ON instructor_details
FOR SELECT To authenticated
USING (true);

CREATE POLICY "Instructors can edit their own details"
ON instructor_details
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE auth.uid() = userID 
    AND role = 'instructor'
  )
  AND instructorid = auth.uid()
);

---- PAYMENT PROVIDERS ----
CREATE POLICY "Authenticated users can view payment providers"
ON payment_providers
FOR SELECT To authenticated
USING (true);


---- TRANSACTIONS ----
CREATE POLICY "Users can view their own transactions"
ON user_transactions
FOR SELECT To authenticated
USING (userid = auth.uid());


---- INSTRUCTOR TESTIMONIALS ----
CREATE POLICY "Everyone can view instructor testimonials"
ON instructor_testimonials
FOR SELECT To public
USING (true);

CREATE POLICY "Instructors can add testimonials"
ON instructor_testimonials
FOR INSERT To authenticated
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'instructor'));



---- COURSES ----
CREATE POLICY "Allow read access for all guests" ON courses
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow instructors to manage their own courses" ON courses
  FOR ALL TO authenticated
  USING (instructorid = auth.uid())
  WITH CHECK (instructorid = auth.uid());

---- MODULE ----
CREATE POLICY "Everyone can view modules"
ON module
FOR SELECT To public
USING (true);

CREATE POLICY "Instructors can manage their own modules"
ON module
FOR ALL
USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
        SELECT 1 FROM courses WHERE courses.courseID = module.courseID 
        AND auth.uid() = courses.instructorID
    )
)
WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
        SELECT 1 FROM courses WHERE courses.courseID = module.courseID 
        AND auth.uid() = courses.instructorID
    )
);

---- COURSE LEVEL ----
CREATE POLICY "Everyone can view course levels"
ON course_levels
FOR SELECT To public
USING (true);


---- CAREGORIES ----
CREATE POLICY "Everyone can view categories"
ON categories
FOR SELECT To public
USING (true);


---- COURSE CATEGORIES ----
CREATE POLICY "Instructors can manage their own course course_categories"
ON course_categories
FOR ALL To authenticated
USING (
    EXISTS (
        SELECT 1 FROM courses WHERE courses.courseID = course_categories.courseID 
        AND auth.uid() = courses.instructorID
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM courses WHERE courses.courseID = course_categories.courseID 
        AND auth.uid() = courses.instructorID
    )
);


---- FEATURED COURSES ----
CREATE POLICY "Everyone can view featured courses"
ON featured_courses
FOR SELECT To public
USING (true);


---- TAGS ----
CREATE POLICY "Everyone can view tags"
ON tags
FOR SELECT To public
USING (true);


---- LESSONS ----
CREATE POLICY "Authenticated users can view lessons"
ON lesson
FOR SELECT To authenticated
USING (true);

CREATE POLICY "Instructors can manage their own lessons"
ON lesson
FOR ALL To authenticated
USING (
    EXISTS (
        SELECT 1 FROM module WHERE module.moduleID = lesson.moduleID 
        AND EXISTS (
            SELECT 1 FROM courses WHERE courses.courseID = module.courseID 
            AND auth.uid() = courses.instructorID
        )
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM module WHERE module.moduleID = lesson.moduleID 
        AND EXISTS (
            SELECT 1 FROM courses WHERE courses.courseID = module.courseID 
            AND auth.uid() = courses.instructorID
        )
    )
);


---- PAGES ----
CREATE POLICY "Authenticated users can view pages"
ON page
FOR SELECT To authenticated
USING (true);

CREATE POLICY "Instructors can manage their own pages"
ON page
FOR ALL To authenticated
USING (
    EXISTS (
        SELECT 1 FROM lesson WHERE lesson.lessonID = page.lessonID 
        AND EXISTS (
            SELECT 1 FROM module WHERE module.moduleID = lesson.moduleID 
            AND EXISTS (
                SELECT 1 FROM courses WHERE courses.courseID = module.courseID 
                AND auth.uid() = courses.instructorID
            )
        )
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM lesson WHERE lesson.lessonID = page.lessonID 
        AND EXISTS (
            SELECT 1 FROM module WHERE module.moduleID = lesson.moduleID 
            AND EXISTS (
                SELECT 1 FROM courses WHERE courses.courseID = module.courseID 
                AND auth.uid() = courses.instructorID
            )
        )
    )
);


---- COURSE TAGS ----
CREATE POLICY "Instructors can manage their own course course_tags"
ON course_tags
FOR ALL To authenticated
USING (
    EXISTS (
        SELECT 1 FROM courses WHERE courses.courseID = course_tags.courseID 
        AND auth.uid() = courses.instructorID
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM courses WHERE courses.courseID = course_tags.courseID 
        AND auth.uid() = courses.instructorID
    )
);


---- COMMUNITY ----
CREATE POLICY "Authenticated can view general communities"
ON community FOR SELECT To authenticated
USING (auth.role() IS NOT NULL AND type = 'general');

CREATE POLICY "Enrolled users can view course-specific communities"
ON community FOR SELECT To authenticated
USING (
    (type = 'general'  
    OR (type = 'course' AND EXISTS (
        SELECT 1 FROM user_enrolled ue 
        WHERE ue.userID = auth.uid() 
        AND ue.courseID = community.courseID
    )))
);


---- QUESTIONS ----
CREATE POLICY "Authenticated can see questions in general communities"
ON questions FOR SELECT To authenticated
USING (
    EXISTS (
        SELECT 1 FROM community c 
        WHERE c.communityID = questions.communityID 
        AND c.type = 'general'
    )
);
CREATE POLICY "Enrolled users can see questions in course communities"
ON questions FOR SELECT To authenticated
USING (
    EXISTS (
        SELECT 1 FROM community c 
        JOIN user_enrolled ue ON c.courseID = ue.courseID
        WHERE c.communityID = questions.communityID 
        AND c.type = 'course' 
        AND ue.userID = auth.uid()
    )
);

CREATE POLICY "Users can add questions"
ON questions FOR INSERT To authenticated
WITH CHECK (auth.uid() = userID);

CREATE POLICY "Users can edit their own questions"
ON questions FOR UPDATE To authenticated USING (auth.uid() = userID);

CREATE POLICY "Users can delete their own questions"
ON questions FOR DELETE To authenticated USING (auth.uid() = userID);


---- REPLIES ----
CREATE POLICY "Authenticated can see replies in general communities"
ON replies FOR SELECT To authenticated
USING (
    EXISTS (
        SELECT 1 FROM community c 
        JOIN questions q ON c.communityID = q.communityID
        WHERE q.questionID = replies.questionID 
        AND c.type = 'general'
    )
);

CREATE POLICY "Enrolled users can see replies in course communities"
ON replies FOR SELECT To authenticated
USING (
    EXISTS (
        SELECT 1 FROM community c 
        JOIN questions q ON c.communityID = q.communityID
        JOIN user_enrolled ue ON c.courseID = ue.courseID
        WHERE q.questionID = replies.questionID
        AND ue.userID = auth.uid()
    )
);

CREATE POLICY "Users can add replies"
ON replies FOR INSERT To authenticated
WITH CHECK (auth.uid() = userID);

CREATE POLICY "Users can edit their own replies"
ON replies FOR UPDATE TO authenticated USING (auth.uid() = userID);

CREATE POLICY "Users can delete their own replies"
ON replies FOR DELETE To authenticated USING (auth.uid() = userID);

---- WHISHLIST ----
CREATE POLICY "Users can see their own wishlist"
ON course_wishlist FOR SELECT To authenticated
USING (auth.uid() = userID);

CREATE POLICY "Users can modify their own wishlist"
ON course_wishlist FOR UPDATE To authenticated
USING (auth.uid() = userID);

-- CERTIFICATES  -- 
CREATE POLICY "User can see their own certificates"
ON certificates FOR SELECT To authenticated
USING (auth.uid() = userID);

CREATE POLICY "Instructor can see certificates for their courses"
ON certificates FOR SELECT To authenticated
USING (
    EXISTS (
        SELECT 1 FROM courses 
        WHERE courses.courseID = certificates.courseID 
        AND courses.instructorID = auth.uid()
    )
);


---- USERS ENROLLED ----
CREATE POLICY "Instructor can see enrolled users in their courses"
ON user_enrolled FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM courses 
        WHERE courses.courseID = user_enrolled.courseID 
        AND courses.instructorID = auth.uid()
    )
);

---- COURSE REVIEWS ----
CREATE POLICY "Everyone can see course reviews"
ON course_reviews FOR SELECT To public USING (true);

CREATE POLICY "Authenticated and enrolled users can add reviews"
ON course_reviews FOR INSERT To authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM user_enrolled ue 
        WHERE ue.userID = auth.uid() 
        AND ue.courseID = course_reviews.courseID
    )
);

CREATE POLICY "Users can edit their own reviews"
ON course_reviews FOR UPDATE To authenticated USING (auth.uid() = userID);
CREATE POLICY "Users can delete their own reviews"
ON course_reviews FOR DELETE To authenticated USING (auth.uid() = userID );
CREATE POLICY "Instructor has full access on reviews for their course reviews"
ON course_reviews FOR ALL
USING (
    auth.role() = 'authenticated' AND 
    EXISTS (
        SELECT 1 FROM courses 
        WHERE courses.courseID = course_reviews.courseID 
        AND courses.instructorID = auth.uid()
    )
);
-- ============================================================ --
