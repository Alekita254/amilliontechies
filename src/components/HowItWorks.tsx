// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

// interface FeatureProps {
//   icon: JSX.Element;
//   title: string;
//   description: string;
// }

// const features: FeatureProps[] = [
//   {
//     icon: <MedalIcon />,
//     title: "Learn & Upskill",
//     description:
//       "We provide access to curated courses, mentorship, and learning resources to help techies enhance their skills—whether they are beginners or professionals.",
//   },
//   {
//     icon: <MapIcon />,
//     title: "Build & Collaborate",
//     description:
//       "Learning by doing! Members work on real-world projects, open-source contributions, and hackathons, fostering hands-on experience and teamwork",
//   },
//   {
//     icon: <PlaneIcon />,
//     title: "Connect & Network",
//     description:
//       "A strong community is key. We facilitate networking through events, meetups, and online forums, helping members grow together and find opportunities.",
//   },
//   {
//     icon: <GiftIcon />,
//     title: " Mentor & Give Back ",
//     description:
//       "The cycle continues! Experienced techies mentor newcomers, ensuring continuous knowledge-sharing and community growth.",
//   },
// ];

// export const HowItWorks = () => {
//   return (
//     <section
//       id="howItWorks"
//       className="container text-center py-24 sm:py-32"
//     >
//       <h2 className="text-3xl md:text-4xl font-bold ">
//         How We {" "}
//         <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
//           Work{" "}
//         </span>
//        at A Million Techies
//       </h2>
//       <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
//         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
//         dolor pariatur sit!
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {features.map(({ icon, title, description }: FeatureProps) => (
//           <Card
//             key={title}
//             className="bg-muted/50"
//           >
//             <CardHeader>
//               <CardTitle className="grid gap-4 place-items-center">
//                 {icon}
//                 {title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>{description}</CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// };


import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  GraduationCap, 
  Users, 
  Rocket, 
  Handshake 
} from "lucide-react"; // Better icons

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <GraduationCap size={40} className="text-primary" />, 
    title: "Learn & Upskill",
    description:
      "Access curated courses, mentorship, and real-world projects to sharpen your skills—whether you're a beginner or a pro.",
  },
  {
    icon: <Users size={40} className="text-primary" />,
    title: "Build & Collaborate",
    description:
      "Work on open-source projects, contribute to hackathons, and grow through hands-on teamwork.",
  },
  {
    icon: <Rocket size={40} className="text-primary" />,
    title: "Connect & Network",
    description:
      "Join a thriving community through events, meetups, and discussions to expand your opportunities.",
  },
  {
    icon: <Handshake size={40} className="text-primary" />,
    title: "Mentor & Give Back",
    description:
      "Experienced techies mentor newcomers, ensuring a continuous cycle of learning and growth.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        How We{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Work
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        We empower techies to learn, build, network, and mentor—driving a future of innovation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50 transition-transform transform hover:-translate-y-2 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                <span className="text-lg font-semibold">{title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

