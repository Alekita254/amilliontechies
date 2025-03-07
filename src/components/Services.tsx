// import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
// import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
// import cubeLeg from "../assets/cube-leg.png";

// interface ServiceProps {
//   title: string;
//   description: string;
//   icon: JSX.Element;
// }

// const serviceList: ServiceProps[] = [
//   {
//     title: "Code Collaboration",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
//     icon: <ChartIcon />,
//   },
//   {
//     title: "Project Management",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
//     icon: <WalletIcon />,
//   },
//   {
//     title: "Task Automation",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
//     icon: <MagnifierIcon />,
//   },
// ];

// export const Services = () => {
//   return (
//     <section className="container py-24 sm:py-32">
//       <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold">
//             <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
//               Client-Centric{" "}
//             </span>
//             Services
//           </h2>

//           <p className="text-muted-foreground text-xl mt-4 mb-8 ">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
//             dolor.
//           </p>

//           <div className="flex flex-col gap-8">
//             {serviceList.map(({ icon, title, description }: ServiceProps) => (
//               <Card key={title}>
//                 <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
//                   <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
//                     {icon}
//                   </div>
//                   <div>
//                     <CardTitle>{title}</CardTitle>
//                     <CardDescription className="text-md mt-2">
//                       {description}
//                     </CardDescription>
//                   </div>
//                 </CardHeader>
//               </Card>
//             ))}
//           </div>
//         </div>

//         <img
//           src={cubeLeg}
//           className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
//           alt="About services"
//         />
//       </div>
//     </section>
//   );
// };


import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Users, Code, Lightbulb, Briefcase } from "lucide-react";
import rolesImage from "../assets/goals.svg";

interface RoleProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const rolesList: RoleProps[] = [
  {
    title: "Tech Innovators",
    description:
      "Build groundbreaking solutions, contribute to open-source projects, and drive technological advancements.",
    icon: <Lightbulb className="w-6 h-6 text-primary" />,
  },
  {
    title: "Developers & Engineers",
    description:
      "Code, develop, and collaborate on real-world applications with fellow techies across different domains.",
    icon: <Code className="w-6 h-6 text-primary" />,
  },
  {
    title: "Community Leaders",
    description:
      "Mentor, guide, and help shape the future of tech by leading discussions, events, and knowledge-sharing sessions.",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    title: "Entrepreneurs & Freelancers",
    description:
      "Launch startups, find freelance gigs, and connect with clients looking for top-tier tech talent.",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
  },
];

export const Services  = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Roles Within{" "}
            </span>
            A Million Techies
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Whether you're a developer, innovator, or mentor, there's a role for everyone in shaping the future of technology.
          </p>

          <div className="flex flex-col gap-8">
            {rolesList.map(({ icon, title, description }: RoleProps) => (
              <Card key={title} className="hover:shadow-lg transition">
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-2xl">{icon}</div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">{description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={rolesImage}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="A Million Techies Roles"
        />
      </div>
    </section>
  );
};
