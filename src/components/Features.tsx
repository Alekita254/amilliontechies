

import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import learningImage from "../assets/learning.svg";
import collaborationImage from "../assets/collaboration.svg";
import networkingImage from "../assets/networking.svg";
import recognitionImage from "../assets/appreciation.svg";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Learn & Upskill",
    description:
      "Access curated courses, mentorship, and hands-on challenges to grow your skills—whether you're a beginner or a pro.",
    image: learningImage,
  },
  {
    title: "Build & Collaborate",
    description:
      "Work on open-source projects, hackathons, and real-world challenges to gain practical experience.",
    image: collaborationImage,
  },
  {
    title: "Connect & Network",
    description:
      "Join events, meetups, and online forums to grow your network and discover opportunities.",
    image: networkingImage,
  },
  {
    title: "Recognition & Growth",
    description:
      "Earn certifications, gain visibility, and get access to job opportunities and funding.",
    image: recognitionImage,
  },
];

const featureList: string[] = [
  "Tech Courses",
  "Open Source",
  "Hackathons",
  "Networking",
  "Mentorship",
  "Freelancing",
  "Job Board",
  "Tech Talks",
  "Incubation Hub",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        What Makes{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          A Million Techies Unique?
        </span>
      </h2>

      <p className="text-xl text-muted-foreground md:w-3/4 mx-auto text-center">
        We provide a holistic platform for learning, collaboration, and career growth in tech.
      </p>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature) => (
          <Badge key={feature} variant="secondary" className="text-sm">
            {feature}
          </Badge>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ title, description, image }) => (
          <Card key={title} className="bg-muted/50 hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-center text-xl">{title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground text-center">{description}</p>
            </CardContent>

            <CardFooter>
              <img
                src={image}
                alt={title}
                className="w-[200px] lg:w-[250px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
