import { createClient } from "@/supabase/utils/server";

export const getAllInstructors = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("instructor_details").select("*, users(*)");

    if (error) {
        return {
          success: false,
          message: `Failed to fetch instructors: ${error.message}`,
          data: [],
        };
      }
    
      return { success: true, message: "Instructors fetched successfully", data };
}

export const  getInstructorsBySpecialties = async (
  specialtyIds: string | string[]
) => {
  const supabase = await createClient();

  const searchSpecialtyIds = Array.isArray(specialtyIds)
    ? specialtyIds
    : specialtyIds
      ? [specialtyIds]
      : [];
  
      if (searchSpecialtyIds.length === 0) {
        const { data: instructors, error } = await supabase
          .from("instructor_details")
          .select("*");
    
        if (error) {
          return {
            success: false,
            message: `Error fetching instructors: ${error.message}`,
          };
        }
    
        return {
          success: true,
          data: instructors,
        };
      }

  const { data: instructorsMatch, error: fetchError } = await supabase
    .from("instructor_specialties")
    .select("instructor_specialtiesid")
    .filter("categoryIds", "cs", `{${searchSpecialtyIds.join(",")}}`);

  if (fetchError) {
    return {
      success: false,
      message: `Error fetching instructor categories: ${fetchError.message}`,
    };
  }

  const matchedInstructorIds = instructorsMatch.map((row) => row.instructor_specialtiesid);

  if (matchedInstructorIds.length === 0) {
    return {
      success: true,
      data: [],
      message: "No instructors found for the provided category IDs.",
    };
  }

  const { data: instructors, error: instructorsError } = await supabase
    .from("users")
    .select("*")
    .in("id", matchedInstructorIds);

  if (instructorsError) {
    return {
      success: false,
      message: `Error fetching courses: ${instructorsError.message}`,
    };
  }

  return {
    success: true,
    message: "Courses Fetched Successfully",
    data: instructors,
  };
}

export const getInstructorByRatings = async (
  ratings: number | number[] = 0
) => {
  const supabase = await createClient();

  const searchRatings = Array.isArray(ratings)
    ? ratings
    : ratings
    ? [ratings]
    : [];

  if (searchRatings.length === 0) {
    const { data: instructors, error } = await supabase
      .from("instructor_details")
      .select("*");

    if (error) {
      return {
        success: false,
        message: `Error fetching instructors: ${error.message}`,
      };
    }

    return {
      success: true,
      data: instructors,
    };
  }

  const { data: avgRatings, error: ratingError } = await supabase
    .from("instructor_avg_ratings")
    .select("instructorid, average_rating");

  if (ratingError) {
    return {
      success: false,
      message: `Error fetching average ratings: ${ratingError.message}`,
    };
  }

  const filteredInstructorIds = avgRatings
    ?.filter((r: any) =>
      searchRatings.includes(Math.round(Number(r.average_rating)))
    )
    .map((r: any) => r.instructorid);

  if (!filteredInstructorIds || filteredInstructorIds.length === 0) {
    return {
      success: true,
      data: [],
    };
  }

  const { data: instructors, error: instructorError } = await supabase
    .from("instructor_details")
    .select("*")
    .in("instructorid", filteredInstructorIds);

  if (instructorError) {
    return {
      success: false,
      message: `Error fetching instructors: ${instructorError.message}`,
    };
  }

  return {
    success: true,
    data: instructors,
  };
};

export const getInstructorsByLanguages = async (
  languages: string | string[] = []
) => {
  const supabase = await createClient();

  const searchLanguages = Array.isArray(languages)
    ? languages
    : languages
    ? [languages]
    : [];

  if (searchLanguages.length === 0) {
    const { data: instructors, error } = await supabase
      .from("instructor_details")
      .select("*");

    if (error) {
      return {
        success: false,
        message: `Error fetching instructors: ${error.message}`,
      };
    }

    return {
      success: true,
      data: instructors,
    };
  }

  const { data: instructors, error } = await supabase
    .from("instructor_details")
    .select("*")
    .overlaps("languages", searchLanguages);

  if (error) {
    return {
      success: false,
      message: `Error filtering instructors: ${error.message}`,
    };
  }

  return {
    success: true,
    data: instructors,
  };
};

export const getInstructorsByNameOrCategory = async (searchValue: string) => {
  const supabase = await createClient();

  const searchTerm = searchValue.trim().toLowerCase();

  const { data: nameMatches, error: nameError } = await supabase
    .from("users")
    .select("*")
    .ilike("fullname", `%${searchTerm}%`)
    .eq("role", "instructor");

  if (nameError) {
    return {
      success: false,
      message: `Error searching by name: ${nameError.message}`,
    };
  }

  const { data: specialtyMatches, error: specialtyError } = await supabase
    .from("instructor_specialties")
    .select("instructorid, specialties(specialityname)")
    .ilike("specialties.specialityname", `%${searchTerm}%`);

  if (specialtyError) {
    return {
      success: false,
      message: `Error searching by specialty: ${specialtyError.message}`,
    };
  }

  const instructorIdsFromName = nameMatches?.map((u) => u.userid) || [];
  const instructorIdsFromSpecialty =
    specialtyMatches?.map((s) => s.instructorid) || [];

  const allInstructorIds = Array.from(
    new Set([...instructorIdsFromName, ...instructorIdsFromSpecialty])
  );

  if (allInstructorIds.length === 0) {
    return {
      success: true,
      data: [],
    };
  }

  const { data: instructors, error: instructorError } = await supabase
    .from("users")
    .select("*")
    .in("userid", allInstructorIds);

  if (instructorError) {
    return {
      success: false,
      message: `Error fetching instructor details: ${instructorError.message}`,
    };
  }

  return {
    success: true,
    data: instructors,
  };
};

export const createInstructor = async (formData: FormData) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must be signed in to become a trainer.",
    };
  }

  const fullName = formData.get("Full Name") as string;
  const username = formData.get("Username") as string;
  const email = formData.get("Email") as string;
  const phone = formData.get("Phone Number") as string;
  const subjectArea = formData.get("Subject Area") as string;
  const yearsOfExperience = parseFloat(formData.get("Years of Experience") as string);
  const courseIdea = formData.get("Course Idea") as string;
  const portfolioUrl = formData.get("Portfolio or LinkedIn URL") as string;

  const userId = user.id;

  const { error: userError } = await supabase
    .from("users")
    .upsert([
      {
        userid: userId,
        fullname: fullName,
        username: username,
        email: email,
        phone: phone,
        role: "instructor",
        status: "active",
      },
    ])
    .eq("userid", userId);

  if (userError) {
    return {
      success: false,
      message: `Failed to create instructor profile: ${userError.message}`,
    };
  }

  const { error: detailError } = await supabase
    .from("instructor_details")
    .insert([
      {
        instructorid: userId,
        bio: courseIdea,
        experience: [],
        certificates: [],
        role: "instructor",
        years_exp: yearsOfExperience,
        social_links: [
          {
            url: portfolioUrl,
            name: "LinkedIn/Portfolio",
          },
        ],
      },
    ]);

  if (detailError) {
    return {
      success: false,
      message: `Failed to save instructor details: ${detailError.message}`,
    };
  }

  const { data: specialtyData, error: specialtyError } = await supabase
    .from("specialties")
    .select("specialityid")
    .ilike("name", subjectArea);

  if (specialtyError || !specialtyData || specialtyData.length === 0) {
    return {
      success: false,
      message: `Subject Area "${subjectArea}" not found in specialties.`,
    };
  }

  const specialtyId = specialtyData[0].specialityid;

  //Insert into instructor_specialties
  const { error: instructorSpecialtyError } = await supabase
    .from("instructor_specialties")
    .insert([
      {
        instructorid: userId,
        specialityid: specialtyId,
      },
    ]);

  if (instructorSpecialtyError) {
    return {
      success: false,
      message: `Failed to link instructor to specialty: ${instructorSpecialtyError.message}`,
    };
  }

  return {
    success: true,
    message: "Instructor profile created successfully!",
  };
};
