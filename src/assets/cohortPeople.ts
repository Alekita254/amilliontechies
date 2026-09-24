export interface CohortPerson {
  id: string;
  name: string;
  title: string;
  summary: string;
}

interface CohortPeople {
  mentees: CohortPerson[];
  mentors: CohortPerson[];
}

const defaultPeople: CohortPeople = {
  mentees: [
    {
      id: "mentee-1",
      name: "Amina Otieno",
      title: "Frontend Track",
      summary: "Focused on accessible React interfaces and design systems.",
    },
    {
      id: "mentee-2",
      name: "David Mwangi",
      title: "Backend Track",
      summary: "Building API services with Django and production-ready testing.",
    },
    {
      id: "mentee-3",
      name: "Faith Njeri",
      title: "Data Track",
      summary: "Learning data storytelling and analytics dashboard workflows.",
    },
    {
      id: "mentee-4",
      name: "Kevin Kiptoo",
      title: "DevOps Track",
      summary: "Practicing CI/CD, containerization, and cloud deployment basics.",
    },
  ],
  mentors: [
    {
      id: "mentor-1",
      name: "Grace Wambui",
      title: "Lead Mentor - Frontend",
      summary: "Guides mentees on modern UI architecture and code quality.",
    },
    {
      id: "mentor-2",
      name: "Samuel Ochieng",
      title: "Lead Mentor - Backend",
      summary: "Supports API design, database modeling, and backend scaling.",
    },
    {
      id: "mentor-3",
      name: "Linda Mutheu",
      title: "Career Mentor",
      summary: "Helps mentees convert projects into portfolio and job outcomes.",
    },
  ],
};

const cohortPeopleBySlug: Record<string, CohortPeople> = {
  "frontend-foundations": {
    mentees: [
      {
        id: "ff-mentee-1",
        name: "Brian Karanja",
        title: "Frontend Track",
        summary: "Building responsive product pages with React and Tailwind.",
      },
      {
        id: "ff-mentee-2",
        name: "Mercy Atieno",
        title: "Frontend Track",
        summary: "Specializing in component reuse and UI consistency.",
      },
      {
        id: "ff-mentee-3",
        name: "Ian Muturi",
        title: "Frontend Track",
        summary: "Focused on state management and frontend testing workflows.",
      },
      {
        id: "ff-mentee-4",
        name: "Purity Nduta",
        title: "Frontend Track",
        summary: "Learning interaction design and performance optimization.",
      },
    ],
    mentors: [
      {
        id: "ff-mentor-1",
        name: "Sharon Naliaka",
        title: "Frontend Mentor",
        summary: "Coaches UI engineering best practices and design implementation.",
      },
      {
        id: "ff-mentor-2",
        name: "Victor Mumo",
        title: "Senior Frontend Mentor",
        summary: "Guides architecture, component libraries, and review quality.",
      },
    ],
  },
};

export const getCohortPeople = (slug?: string): CohortPeople => {
  if (!slug) {
    return defaultPeople;
  }

  return cohortPeopleBySlug[slug] || defaultPeople;
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};
