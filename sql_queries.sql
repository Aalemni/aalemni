-- Enable Row-Level Security for Supabase
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

ALTER TABLE menu_links ENABLE ROW LEVEL SECURITY;

ALTER TABLE partnership_features ENABLE ROW LEVEL SECURITY;

ALTER TABLE company_features ENABLE ROW LEVEL SECURITY;

ALTER TABLE partnership_type ENABLE ROW LEVEL SECURITY;

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

ALTER TABLE partners_testimonials ENABLE ROW LEVEL SECURITY;

-- Create company_info table
CREATE TABLE
    company_info (
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

-- Create countries table
CREATE TABLE
    countries (
        countryID SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phoneCode VARCHAR(10),
        flag TEXT,
        symbol VARCHAR(10),
        enabled BOOLEAN DEFAULT TRUE,
        editable BOOLEAN DEFAULT TRUE,
        deletable BOOLEAN DEFAULT FALSE
    );

-- Create cities table
CREATE TABLE
    cities (
        cityID SERIAL PRIMARY KEY,
        countryID INT REFERENCES countries (countryID) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        enabled BOOLEAN DEFAULT TRUE,
        editable BOOLEAN DEFAULT TRUE,
        deletable BOOLEAN DEFAULT FALSE
    );

-- Create menu_links table
CREATE TABLE
    menu_links (
        menuID SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        link TEXT NOT NULL
    );

-- Create partnership_features table
CREATE TABLE
    partnership_features (
        partnershipFeatureID SERIAL PRIMARY KEY,
        companyID INT REFERENCES company_info (companyID) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        icon TEXT,
        description TEXT
    );

-- Create company_features table
CREATE TABLE
    company_features (
        featureID SERIAL PRIMARY KEY,
        companyID INT REFERENCES company_info (companyID) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        icon TEXT,
        description TEXT
    );

-- Create partnership_type table
CREATE TABLE
    partnership_type (
        partnershipTypeID SERIAL PRIMARY KEY,
        companyID INT REFERENCES company_info (companyID) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        icon TEXT,
        description TEXT
    );

-- Create partners table
CREATE TABLE
    partners (
        partnerID SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logo TEXT,
        description TEXT,
        websiteLink TEXT,
        partnerSince DATE
    );

-- Create partners_testimonials table
CREATE TABLE
    partners_testimonials (
        testimonialID SERIAL PRIMARY KEY,
        partnerID INT REFERENCES partners (partnerID) ON DELETE CASCADE,
        description TEXT,
        rate INT CHECK (rate BETWEEN 1 AND 5)
    );

-- Create testimonials table
CREATE TABLE
    testimonials (
        testimonialID SERIAL PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        rate INT CHECK (rate BETWEEN 1 AND 5),
        companyID INT REFERENCES company_info (companyID) ON DELETE CASCADE
    );

-- Indexes for faster queries
CREATE INDEX idx_companyID ON company_info (companyID);

CREATE INDEX idx_countryID ON countries (countryID);

CREATE INDEX idx_city_country ON cities (countryID);

CREATE INDEX idx_partnershipFeature_company ON partnership_features (companyID);

CREATE INDEX idx_companyFeature_company ON company_features (companyID);

CREATE INDEX idx_partnershipType_company ON partnership_type (companyID);

CREATE INDEX idx_partners_testimonials ON partners_testimonials (partnerID);

CREATE INDEX idx_testimonials_company ON testimonials (companyID);

-- Enable Row-Level Security in Supabase
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

ALTER TABLE menu_links ENABLE ROW LEVEL SECURITY;

ALTER TABLE partnership_features ENABLE ROW LEVEL SECURITY;

ALTER TABLE company_features ENABLE ROW LEVEL SECURITY;

ALTER TABLE partnership_type ENABLE ROW LEVEL SECURITY;

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

ALTER TABLE partners_testimonials ENABLE ROW LEVEL SECURITY;

-- Create RLS policies in Supabase
CREATE POLICY "Enable full access for authenticated users" ON company_info FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON testimonials FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON countries FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON cities FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON menu_links FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON partnership_features FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON company_features FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON partnership_type FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON partners FOR
SELECT
    USING (auth.role () = 'authenticated');

CREATE POLICY "Enable full access for authenticated users" ON partners_testimonials FOR
SELECT
    USING (auth.role () = 'authenticated');

-- Commit transaction
COMMIT;


CREATE TABLE users (
    userID UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    fullName TEXT NOT NULL,
    userName TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phoneNumber TEXT UNIQUE,
    role TEXT CHECK (role IN ('admin', 'instructor', 'student')) NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive')) NOT NULL
);

CREATE TABLE subscription_plans (
    planID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price_per_month DECIMAL(10,2) NOT NULL,
    price_per_year DECIMAL(10,2) NOT NULL,
    description TEXT,
    userType TEXT CHECK (userType IN ('instructor', 'student')) NOT NULL
);

CREATE TABLE subscriptions (
    subscriptionID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    planID UUID NOT NULL,
    instructorID UUID NOT NULL,
    status TEXT CHECK (status IN ('pending', 'paid', 'canceled')) NOT NULL,
    CONSTRAINT fk_plan FOREIGN KEY (planID) REFERENCES subscription_plans(planID) ON DELETE CASCADE,
    CONSTRAINT fk_instructor FOREIGN KEY (instructorID) REFERENCES users(userID) ON DELETE CASCADE
);


CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(userName);
CREATE INDEX idx_subscription_plan ON subscriptions(planID);
CREATE INDEX idx_subscription_instructor ON subscriptions(instructorID);


ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Users can see their own data"
ON users
FOR SELECT
USING (auth.uid() = userID);

CREATE POLICY "Allow users to insert their subscriptions"
ON subscriptions
FOR INSERT
WITH CHECK (auth.uid() = instructorID);

CREATE POLICY "Allow users to view their own subscriptions"
ON subscriptions
FOR SELECT
USING (auth.uid() = instructorID);


CREATE POLICY "Prevent users from deleting subscriptions they don’t own"
ON subscriptions
FOR DELETE
USING (auth.uid() = instructorID);

CREATE POLICY "Admins can manage all subscriptions"
ON subscriptions
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Allow everyone to view subscription plans"
ON subscription_plans
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage all subscription plans"
ON subscription_plans
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));



-- INSTRUCTOR DETAILS
CREATE TABLE instructor_details (
    detailID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructorID UUID REFERENCES users(userID) ON DELETE CASCADE,
    bio TEXT,
    experience JSONB,  -- Storing experience in structured format
    certificates JSONB  -- Certificates as JSON array
);

-- INSTRUCTOR TESTIMONIALS
CREATE TABLE instructor_testimonials (
    testimonialID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructorID UUID REFERENCES users(userID) ON DELETE CASCADE,
    description TEXT NOT NULL,
    rate INT CHECK (rate BETWEEN 1 AND 5) NOT NULL
);

-- INSTRUCTOR REVIEWS
CREATE TABLE instructor_reviews (
    reviewID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instructorID UUID REFERENCES users(userID) ON DELETE CASCADE,
    userID UUID REFERENCES users(userID) ON DELETE CASCADE,
    description TEXT NOT NULL,
    rate INT CHECK (rate BETWEEN 1 AND 5) NOT NULL
);

-- PAYMENT PROVIDERS (PSP)
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

-- USER TRANSACTIONS
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

CREATE INDEX idx_instructor_reviews_instructorID ON instructor_reviews(instructorID);
CREATE INDEX idx_instructor_reviews_userID ON instructor_reviews(userID);

CREATE INDEX idx_instructor_details_instructorID ON instructor_details(instructorID);
CREATE INDEX idx_instructor_testimonials_instructorID ON instructor_testimonials(instructorID);

CREATE INDEX idx_user_transactions_userID ON user_transactions(userID);
CREATE INDEX idx_user_transactions_paymentID ON user_transactions(paymentID);


ALTER TABLE instructor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_testimonials ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Authenticated users can view instructor reviews"
ON instructor_reviews
FOR SELECT
USING (auth.role() IS NOT NULL);

CREATE POLICY "Authenticated users can view instructor details"
ON instructor_details
FOR SELECT
USING (auth.role() IS NOT NULL);

CREATE POLICY "Authenticated users can view payment providers"
ON payment_providers
FOR SELECT
USING (auth.role() IS NOT NULL);

CREATE POLICY "Users can view their own transactions"
ON user_transactions
FOR SELECT
USING (auth.uid() = userID);

CREATE POLICY "Everyone can view instructor testimonials"
ON instructor_testimonials
FOR SELECT
USING (true);

CREATE POLICY "Instructors can add testimonials"
ON instructor_testimonials
FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'instructor'));


-- Admin can manage users
CREATE POLICY "Admins can manage users"
ON users
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

-- Admin can manage instructor details
CREATE POLICY "Admins can manage instructor details"
ON instructor_details
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

-- Admin can manage instructor reviews
CREATE POLICY "Admins can manage instructor reviews"
ON instructor_reviews
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

-- Admin can manage payment providers
CREATE POLICY "Admins can manage payment providers"
ON payment_providers
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

-- Admin can manage user transactions
CREATE POLICY "Admins can manage user transactions"
ON user_transactions
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));


-- COURSES TABLE
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

-- FEATURED COURSES TABLE
CREATE TABLE featured_courses (
    ID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseIDs UUID[] NOT NULL, -- Array of course IDs
    order INT NOT NULL
);

-- COURSE LEVELS TABLE
CREATE TABLE course_levels (
    levelID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    order INT NOT NULL
);

-- COURSE CATEGORIES TABLE
CREATE TABLE course_categories (
    courseCategoryID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseID UUID REFERENCES courses(courseID) ON DELETE CASCADE,
    categoryIDs UUID[] NOT NULL
);

-- CATEGORIES TABLE
CREATE TABLE categories (
    categoryID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    categoryName TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT NOT NULL
);

-- COURSE TAGS TABLE
CREATE TABLE course_tags (
    courseTagID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseID UUID REFERENCES courses(courseID) ON DELETE CASCADE,
    tagIDs UUID[] NOT NULL
);

-- TAGS TABLE
CREATE TABLE tags (
    tagID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tagName TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT NOT NULL
);

-- MODULE TABLE
CREATE TABLE module (
    moduleID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    courseID UUID REFERENCES courses(courseID) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    overview TEXT, -- HTML from text editor
    order INT NOT NULL
);

-- LESSON TABLE
CREATE TABLE lesson (
    lessonID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    moduleID UUID REFERENCES module(moduleID) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    overview TEXT, -- HTML from text editor
    order INT NOT NULL
);

-- PAGE TABLE
CREATE TABLE page (
    pageID UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lessonID UUID REFERENCES lesson(lessonID) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    overview TEXT, -- HTML from text editor
    content TEXT, -- HTML content from text editor
    order INT NOT NULL,
    estimatedDuration INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_courses_instructorID ON courses(instructorID);
CREATE INDEX idx_course_categories_courseID ON course_categories(courseID);
CREATE INDEX idx_course_tags_courseID ON course_tags(courseID);
CREATE INDEX idx_modules_courseID ON module(courseID);
CREATE INDEX idx_lessons_moduleID ON lesson(moduleID);
CREATE INDEX idx_pages_lessonID ON page(lessonID);


ALTER TABLE lesson ENABLE ROW LEVEL SECURITY;
ALTER TABLE page ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE module ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_courses ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Everyone can view courses"
ON courses
FOR SELECT
USING (true);

CREATE POLICY "Everyone can view modules"
ON module
FOR SELECT
USING (true);

CREATE POLICY "Everyone can view course levels"
ON course_levels
FOR SELECT
USING (true);

CREATE POLICY "Everyone can view categories"
ON categories
FOR SELECT
USING (true);

CREATE POLICY "Everyone can view featured courses"
ON featured_courses
FOR SELECT
USING (true);

CREATE POLICY "Everyone can view tags"
ON tags
FOR SELECT
USING (true);


CREATE POLICY "Authenticated users can view lessons"
ON lesson
FOR SELECT
USING (auth.role() IS NOT NULL);

CREATE POLICY "Authenticated users can view pages"
ON page
FOR SELECT
USING (auth.role() IS NOT NULL);

CREATE POLICY "Instructors can manage their own courses"
ON courses
FOR ALL
USING (auth.uid() = instructorID)
WITH CHECK (auth.uid() = instructorID);

CREATE POLICY "Instructors can manage their own modules"
ON module
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM courses WHERE courses.courseID = module.courseID 
        AND auth.uid() = courses.instructorID
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM courses WHERE courses.courseID = module.courseID 
        AND auth.uid() = courses.instructorID
    )
);

CREATE POLICY "Instructors can manage their own lessons"
ON lesson
FOR ALL
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

CREATE POLICY "Instructors can manage their own pages"
ON page
FOR ALL
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



CREATE POLICY "Admins can manage everything in courses"
ON courses
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in modules"
ON module
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in lessons"
ON lesson
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in pages"
ON page
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in categories"
ON page
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in tags"
ON page
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in course categories"
ON course_categories
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in course tags"
ON course_tags
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in course tags"
ON course_levels
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));

CREATE POLICY "Admins can manage everything in featured courses"
ON course_levels
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE auth.uid() = userID AND role = 'admin'));