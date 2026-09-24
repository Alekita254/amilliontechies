import growthImage from "@/assets/growth.png";
import lookingAheadImage from "@/assets/looking-ahead.png";
import reflectingImage from "@/assets/reflecting.png";

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
  coverImage: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  content: string[];
};

export type Mentor = {
  name: string;
  slug: string;
  headline: string;
  shortBio: string;
  expertise: string[];
  cohorts: string[];
  mentorImage?: string;
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
    coverImage: growthImage,
    publishedAt: "2026-08-12",
    readTime: "6 min read",
    tags: ["Growth", "Backend", "Confidence"],
    featured: true,
    content: [
      "When I joined A Million Techies, my biggest challenge was believing I could build something real. I had watched tutorials for months, but I had never completed a production-ready project.",
      "The cohort structure gave me momentum. Weekly sprints, mentor reviews, and peer accountability helped me stop overthinking and start shipping. I moved from simple endpoint exercises to designing full API flows with authentication, error handling, and deployment.",
      "The turning point was demo day prep. Explaining my architecture choices to others made me realize how much I had grown. I was no longer just learning concepts. I was practicing delivery, communication, and engineering judgment.",
      "Today, I have a deployed API in my portfolio and the confidence to keep building. My biggest takeaway is that community-backed consistency beats isolated motivation every time.",
    ],
  },
  {
    title: "Mentoring Across Borders",
    slug: "mentoring-across-borders",
    author: "David Kamau",
    personType: "MENTOR",
    cohort: "Frontend Engineering Cohort 05",
    excerpt: "How mentorship circles helped learners collaborate and grow faster.",
    coverImage: lookingAheadImage,
    publishedAt: "2026-09-01",
    readTime: "5 min read",
    tags: ["Mentorship", "Frontend", "Community"],
    content: [
      "Mentoring across countries taught me that learners often share the same blockers, regardless of location: uncertainty, inconsistency, and lack of feedback loops.",
      "We introduced smaller mentorship circles so learners could receive targeted support while still contributing to a larger cohort. The quality of questions improved, and peers started helping each other before waiting for mentor intervention.",
      "The biggest gain was confidence transfer. Once a learner solved a challenge in one circle, that learning spread quickly through demos and async notes. Community became an accelerator.",
      "For me, mentoring is not just about technical correction. It is about building momentum systems that make growth repeatable.",
    ],
  },
  {
    title: "How Cohorts Opened My Career Path",
    slug: "how-cohorts-opened-my-career-path",
    author: "Faith Achieng",
    personType: "ALUMNI",
    cohort: "DevOps Foundations Cohort 01",
    excerpt: "A practical story of learning, building, and landing opportunities.",
    coverImage: reflectingImage,
    publishedAt: "2026-09-14",
    readTime: "7 min read",
    tags: ["Career", "DevOps", "Opportunities"],
    content: [
      "Before the cohort, I knew DevOps terms but had no practical workflow. I could describe CI/CD, but I had not built reliable delivery pipelines myself.",
      "Inside the cohort, we worked through real deployment cycles, including troubleshooting failures and documenting decisions. That practical repetition changed how I approached problems.",
      "By the end, I had a portfolio story I could clearly explain in interviews: what I built, why I built it that way, what broke, and how I fixed it.",
      "The opportunities that followed came from clarity. The cohort gave me evidence of capability, not just certificates.",
    ],
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
    mentorImage: growthImage,
  },
  {
    name: "Ruth Wambui",
    slug: "ruth-wambui",
    headline: "Frontend Mentor",
    shortBio: "Helps learners craft accessible and high-performing frontends.",
    expertise: ["React", "TypeScript", "UX"],
    cohorts: ["Frontend Engineering Cohort 05"],
    mentorImage: lookingAheadImage,
  },
  {
    name: "Kevin Otieno",
    slug: "kevin-otieno",
    headline: "DevOps Mentor",
    shortBio: "Guides teams through deployment automation and observability.",
    expertise: ["Docker", "Kubernetes", "CI/CD"],
    cohorts: ["DevOps Foundations Cohort 01"],
    mentorImage: reflectingImage,
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
