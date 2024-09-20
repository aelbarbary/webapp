export interface UserInformation {
    address: string;
    city: string;
    country: string;
    description: string;
    looking_for: string;
    education: string;
    employer: string;
    profession: string;
    job_title: string;
    exercise: string;
    height: number | null;
    religion: string;
    smoking: string;
    state: string;
    want_childrens: string;
    zip_code: string;
    marital_status: string;
    origin_country: string;
    praying: boolean;
    fasting: boolean;
    zakat: boolean;
    hajj: boolean;
    number_of_quran_chapters_memorized: number;
    only_halal_diet: boolean;
    hijab: boolean;
    alcohol: boolean;
    body_type: string;
    has_chronic_disease: boolean;
    has_children: boolean;
    children_count: number;
    children_ages: string;
    children_gender: string;
    legal_resident: boolean;
    usa_citizen: boolean;
    work_visa : boolean;
    usa_duration_stay_in_years: number;
    relocate_to_another_state: boolean;
    revert: boolean;
    hide_picture: boolean;
    hide_facebook: boolean;
    hide_phone: boolean;
    hide_email: boolean;
    hide_name: boolean;
}


export interface Filter {
    age_from: number;
    age_to: number;
    education: string;
    want_children: string;
    religion: string;
}

export interface UserProfile {
    id: number;
    image: string;
    first_name: string;
    last_name: string;
    status: string;
    gender: string;
    birthdate: string;
    age: number;
    userinformation: UserInformation;
    filter: Filter;
    female_match_pool: number;
    male_match_pool: number;
    state: string;
}

export interface ProfileData {
    id: number;
    image: string;
    first_name: string;
    last_name: string;
    status: string;
    gender: string;
    birthdate: string;
    age: number;
    female_match_pool: number;
    male_match_pool: number;
}

export interface Match {
    id: number,
    matcher: number,
    user: ProfileData,
    other_status: string,
    status: string,
    created_at: Date
}

export interface UserSocialLinks {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
}

export interface UserContact {
    email: string;
    phone: string;
    sociallinks: UserSocialLinks;
}

export interface IProfile {
    id: number;
    first_name: string;
    last_name: string;
    birthdate: string;
    full_name: string;
    email: string;
    age: number;
    gender: string;
    created_at: Date;
    image: string;
    city: string;
    state: string;
    country: string;
}

export interface CheckFilter {
    key: string;
    checked: boolean;
}

export interface MarriageFilters {
    genders: CheckFilter[];
    states: string[];
    ageRange: number[];
}

export interface LocationInfo {
    address: string,
    city: string;
    country: string;
    state: string;
    zip_code: string;
    origin_country: string;

    legal_resident: boolean;
    usa_citizen: boolean;
    work_visa: boolean;
    usa_duration_stay_in_years: number;
    relocate_to_another_state: boolean;
}

export interface EducationInfo {
    education: string;
    profession: string;
    job_title: string;
    employer: string;
}

export interface ReligionInfo {
    revert: boolean;
    praying: boolean;
    fasting: boolean;
    zakat: boolean;
    hajj: boolean;
    number_of_quran_chapters_memorized: number;
    only_halal_diet: boolean;
    hijab: boolean;
}

export interface HealthInfo {
    height: number;
    body_type: string;
    smoking: boolean;
    alcohol: boolean;
    exercise: string;
    has_chronic_disease: boolean;
}

export interface ChildrenInfo {
    want_childrens: string;
    has_children: boolean;
    children_count: number;
    children_ages: string;
    children_gender: string;
}

export interface MatchMakingEvent {
    event_id: string;
    id: number;
    name: string;
    description: string;
    date: string; // Assuming the date is represented as a string in 'YYYY-MM-DD' format
    time: string; // Assuming the time is represented as a string in 'HH:MM:SS' format
    age_group: string;
    image: string; // Add the image field of type string
    zoom: string;
    female_participants: number;
    male_participants: number;
    is_closed: boolean; 
    fees: string;
    event_type: string;
    participants: string[]
  }


export interface MatchmakerSocialLinks {
    id: number;
    matchmaker_name: string;
    whatsapp_link?: string | null;
    facebook_link?: string | null;
    telegram_link?: string | null;
    is_paid :boolean;
    descr: string;
    is_active :boolean;

  }

  export interface PublicVisibilityOptions {
    // Visibility options
    public_data_accepted: boolean;
    hide_picture: boolean;
    hide_phone: boolean;
    hide_email: boolean;
    hide_facebook: boolean;
    hide_name: boolean;
  }

  export interface Round {
    id: number;
    male_info: {
        id: number;
        name: string;
        email: string;
        registration_code: string;
    } | null;
    female_info: {
        id: number;
        name: string;
        email: string;
        registration_code: string;
    } | null;
    round_number: number;
    room_number: number;
    male_decision: string;
    female_decision: string;
    event: number;
    male: number;
    female: number | null;
}


export interface EmailTemplate {
    id: number;
    template_name: string;
    subject: string;
    body: string;
    variables: string;
  }


 export interface Member {
    id: number;
    full_name: string;
    age: number;
    state: string;
    email: string;
    registration_code: string;
    gender: string;
  }
  
export interface DiscussionGroupRound {
    id: number;
    round_number: number;
    room_number: string;
    event: number;
    members: Member[];
  }

  
  export interface MatcherProfile {
    name: string;
    logo?: string
    username?: string;
  }