export const questions = {
    EXERCISE: {
        ACTIVE: ["A", "Active"],
        SOME_TIMES: ["S", "Sometimes"],
        NEVER: ["N", "Never"]
    },
    EDUCATION: {
        HIGH_SCHOOL: ["HS", "High School"],
        TECH_SCHOOL: ["TS", "Tech School"],
        IN_COLLEGE: ["IC", "In College"],
        UNDERGRAD: ["UG", "Under Graduate"],
        GRADUATED: ["G", "Graduated"]
    },
    SMOKING: {
        SOCIALLY: ["S", "Socially"],
        NEVER: ["N", "Never"],
        REGULAR: ["R", "Regular"],
    },
    WANT_CHILDRENS: {
        WANT_SOMEDAY: ["WS", "Want Someday"],
        DONT_WANT: ["DW", "Don't Want"],
        HAVE_AND_WANT_MORE: ["HM", "Have and want more"],
        HAVE_AND_DONT_WANT_MORE: ["HDM", "Have and dont' want more"],
        NOT_SURE: ["NS", "Not Sure"],
    },
    RELIGION: {
        VERY_RELIGIOUS: ["VR", "Very Religious"],
        RELIGIOUS: ["R", "Religious"],
        NOT_REILGIOUS: ["NR", "Not Reiligous"],
    },
    MARITAL_STATUS: {
        NEVER_MARRIED: ["NM", "Never Married"],
        DIVORCED: ["D", "Divorced"],
        WIDOWED: ["W", "Widowed"],
        SEPARATED: ["S", "Separated"],
        MARRIED: ["M", "Married"],
    },
    BODY_TYPE: {
        SILM: ["SL", "Slim"],
        ATHLETIC: ["AT", "Athletic"],
        AVERAGE: ["AV", "Average"],
        CURVY: ["C", "Curvy"],
        FULL_FIGURED: ["FF", "Full-figured"],
        PETITE: ["P", "Petite"],
    }
}

/**
 * getAnswer - get question full answer 
 * @param data question data array that consits [key, charKey] 
 * @returns string question full answer 
 */
export function getAnswer(data: string[]): string {
    let result = ""
    Object.entries(questions).forEach(q => {
        if (q[0] == data[0]) {
            Object.entries(q[1]).forEach(ans => {
                if (ans[1][0] == data[1]) {
                    result = ans[1][1]
                }
            })
        }
    })
    return result
}