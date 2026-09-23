export type Cohort = {
  title: string;
  slug: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  shortDescription: string;
  duration: string;
  learnerCount: number;
  mentorCount: number;
  track: "Backend" | "Frontend" | "Mobile" | "DevOps";
};

export type Story = {
  title: string;
  slug: string;
  author: string;
  personType: "MENTEE" | "MENTOR" | "ALUMNI";
  cohort: string;
  excerpt: string;
};

export type Mentor = {
  name: string;
  slug: string;
  headline: string;
  shortBio: string;
  expertise: string[];
  cohorts: string[];
};

export type Project = {
  name: string;
  slug: string;
  description: string;
  tech: string[];
  projectType: "Web" | "Mobile" | "AI" | "Open Source";
  cohort: string;
};

export type Event = {
  title: string;
  slug: string;
  eventType: "MEETUP" | "WORKSHOP" | "WEBINAR" | "HACKATHON";
  startDate: string;
  location: string;
  shortDescription: string;
};

export const cohorts: Cohort[] = [
  {
    title: "Backend Engineering Cohort 03",
    slug: "backend-engineering-cohort-03",
    status: "ACTIVE",
    shortDescription: "Build scalable APIs and production-ready backend services.",
    duration: "12 weeks",
    learnerCount: 34,
    mentorCount: 6,
    track: "Backend",
  },
  {
    title: "Frontend Engineering Cohort 05",
    slug: "frontend-engineering-cohort-05",
    status: "UPCOMING",
    shortDescription: "Design and ship modern user experiences with React.",
    duration: "10 weeks",
    learnerCount: 42,
    mentorCount: 5,
    track: "Frontend",
  },
  {
    title: "DevOps Foundations Cohort 01",
    slug: "devops-foundations-cohort-01",
    status: "COMPLETED",
    shortDescription: "Hands-on CI/CD, containers, and cloud deployment workflows.",
    duration: "8 weeks",
    learnerCount: 28,
    mentorCount: 4,
    track: "DevOps",
  },
];

export const stories: Story[] = [
  {
    title: "From Curiosity to Shipping a Real Product",
    slug: "from-curiosity-to-shipping-a-real-product",
    author: "Mary Njeri",
    personType: "MENTEE",
    cohort: "Backend Engineering Cohort 03",
    excerpt: "I joined with no confidence in my coding journey and left with my first deployed API.",
  },
  {
    title: "Mentoring Across Borders",
    slug: "mentoring-across-borders",
    author: "David Kamau",
    personType: "MENTOR",
    cohort: "Frontend Engineering Cohort 05",
    excerpt: "How mentorship circles helped learners collaborate and grow faster.",
  },
  {
    title: "How Cohorts Opened My Career Path",
    slug: "how-cohorts-opened-my-career-path",
    author: "Faith Achieng",
    personType: "ALUMNI",
    cohort: "DevOps Foundations Cohort 01",
    excerpt: "A practical story of learning, building, and landing opportunities.",
  },
];

export const mentors: Mentor[] = [
  {
    name: "Alex Murimi",
    slug: "alex-murimi",
    headline: "Backend Engineer and Community Lead",
    shortBio: "Supports learners building resilient backend systems and APIs.",
    expertise: ["Django", "REST APIs", "System Design"],
    cohorts: ["Backend Engineering Cohort 03"],
  },
  {
    name: "Ruth Wambui",
    slug: "ruth-wambui",
    headline: "Frontend Mentor",
    shortBio: "Helps learners craft accessible and high-performing frontends.",
    expertise: ["React", "TypeScript", "UX"],
    cohorts: ["Frontend Engineering Cohort 05"],
  },
  {
    name: "Kevin Otieno",
    slug: "kevin-otieno",
    headline: "DevOps Mentor",
    shortBio: "Guides teams through deployment automation and observability.",
    expertise: ["Docker", "Kubernetes", "CI/CD"],
    cohorts: ["DevOps Foundations Cohort 01"],
  },
];

export const projects: Project[] = [
  {
    name: "Katiba News",
    slug: "katiba-news",
    description: "A civic information platform built by learners for transparent public access.",
    tech: ["React", "Django", "PostgreSQL"],
    projectType: "Web",
    cohort: "Backend Engineering Cohort 03",
  },
  {
    name: "AgriPulse",
    slug: "agripulse",
    description: "A mobile-first tool for farmer data capture and advisory insights.",
    tech: ["React", "TypeScript", "Charts"],
    projectType: "Mobile",
    cohort: "Frontend Engineering Cohort 05",
  },
  {
    name: "Open Community Portal",
    slug: "open-community-portal",
    description: "An open-source portal for managing communities and events.",
    tech: ["Node", "Docker", "Nginx"],
    projectType: "Open Source",
    cohort: "DevOps Foundations Cohort 01",
  },
];

export const events: Event[] = [
  {
    title: "Community Builders Meetup",
    slug: "community-builders-meetup",
    eventType: "MEETUP",
    startDate: "2026-10-05",
    location: "Nairobi + Online",
    shortDescription: "A meetup for mentors, learners, and alumni to share project outcomes.",
  },
  {
    title: "Backend Career Workshop",
    slug: "backend-career-workshop",
    eventType: "WORKSHOP",
    startDate: "2026-10-22",
    location: "Online",
    shortDescription: "Hands-on workshop on backend roadmap and portfolio building.",
  },
  {
    title: "AMT Demo Day",
    slug: "amt-demo-day",
    eventType: "HACKATHON",
    startDate: "2026-11-11",
    location: "Nairobi",
    shortDescription: "Learners showcase what they built across cohorts.",
  },
];
