// import { useState } from "react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import { GitHubLogoIcon } from "@radix-ui/react-icons";
// import { buttonVariants } from "./ui/button";
// import { Menu } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
// import { LogoIcon } from "./Icons";

// interface RouteProps {
//   href: string;
//   label: string;
// }

// const routeList: RouteProps[] = [
//   {
//     href: "#courses",
//     label: "Courses",
//   },
//   {
//     href: "#community",
//     label: "Community",
//   },
//   {
//     href: "#pricing",
//     label: "Pricing",
//   },
//   {
//     href: "#faq",
//     label: "FAQ",
//   },
// ];

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   return (
//     <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
//       <NavigationMenu className="mx-auto">
//         <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
//           <NavigationMenuItem className="font-bold flex">
//             <a
//               rel="noreferrer noopener"
//               href="/"
//               className="ml-2 font-bold text-xl flex"
//             >
//               <LogoIcon />
//               Million Techies
//             </a>
//           </NavigationMenuItem>

//           {/* mobile */}
//           <span className="flex md:hidden">
//             <ModeToggle />

//             <Sheet
//               open={isOpen}
//               onOpenChange={setIsOpen}
//             >
//               <SheetTrigger className="px-2">
//                 <Menu
//                   className="flex md:hidden h-5 w-5"
//                   onClick={() => setIsOpen(true)}
//                 >
//                   <span className="sr-only">Menu Icon</span>
//                 </Menu>
//               </SheetTrigger>

//               <SheetContent side={"left"}>
//                 <SheetHeader>
//                   <SheetTitle className="font-bold text-xl">
//                     Million Techies
//                   </SheetTitle>
//                 </SheetHeader>
//                 <nav className="flex flex-col justify-center items-center gap-2 mt-4">
//                   {routeList.map(({ href, label }: RouteProps) => (
//                     <a
//                       rel="noreferrer noopener"
//                       key={label}
//                       href={href}
//                       onClick={() => setIsOpen(false)}
//                       className={buttonVariants({ variant: "ghost" })}
//                     >
//                       {label}
//                     </a>
//                   ))}
//                   <a
//                     rel="noreferrer noopener"
//                     href="https://github.com/Alekita254/amilliontechies.git"
//                     target="_blank"
//                     className={`w-[110px] border ${buttonVariants({
//                       variant: "secondary",
//                     })}`}
//                   >
//                     <GitHubLogoIcon className="mr-2 w-5 h-5" />
//                     Github
//                   </a>
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </span>

//           {/* desktop */}
//           <nav className="hidden md:flex gap-2">
//             {routeList.map((route: RouteProps, i) => (
//               <a
//                 rel="noreferrer noopener"
//                 href={route.href}
//                 key={i}
//                 className={`text-[17px] ${buttonVariants({
//                   variant: "ghost",
//                 })}`}
//               >
//                 {route.label}
//               </a>
//             ))}
//           </nav>

//           <div className="hidden md:flex gap-2">
//             <a
//               rel="noreferrer noopener"
//               href="https://github.com/Alekita254/amilliontechies.git"
//               target="_blank"
//               className={`border ${buttonVariants({ variant: "secondary" })}`}
//             >
//               <GitHubLogoIcon className="mr-2 w-5 h-5" />
//               Github
//             </a>

//           </div>
//         </NavigationMenuList>
//       </NavigationMenu>
//     </header>
//   );
// };


import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

const coursesList: RouteProps[] = [
  { href: "#linux", label: "Linux" },
  { href: "#python", label: "Python" },
  { href: "#cybersecurity", label: "Cybersecurity" },
  { href: "#webdev", label: "Web Development" },
];

const communityList: RouteProps[] = [
  { href: "#forums", label: "Forums" },
  { href: "#discord", label: "Discord" },
  { href: "#mentorship", label: "Mentorship" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex w-screen h-14 px-4 justify-between">
          {/* Logo */}
          <NavigationMenuItem className="font-bold flex">
            <a href="/" className="ml-2 flex text-xl font-bold">
              <LogoIcon />
              Million Techies
            </a>
          </NavigationMenuItem>

          {/* Mobile Menu */}
          <span className="flex md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="h-5 w-5" onClick={() => setIsOpen(true)} />
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">
                    Million Techies
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col items-center gap-2">
                  <a href="/" className={buttonVariants({ variant: "ghost" })}>
                    Home
                  </a>
                  {/* Courses Dropdown */}
                  <details className="w-full">
                    <summary className="cursor-pointer p-2">Courses</summary>
                    <ul className="ml-4 flex flex-col gap-2">
                      {coursesList.map(({ href, label }) => (
                        <li key={label}>
                          <a href={href} className="text-sm text-gray-600 dark:text-gray-300">
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                  {/* Community Dropdown */}
                  <details className="w-full">
                    <summary className="cursor-pointer p-2">Community</summary>
                    <ul className="ml-4 flex flex-col gap-2">
                      {communityList.map(({ href, label }) => (
                        <li key={label}>
                          <a href={href} className="text-sm text-gray-600 dark:text-gray-300">
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                  <a
                    href="#get-started"
                    className={buttonVariants({ variant: "default" })}
                  >
                    Get Started
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 items-center">
            <a href="/" className={buttonVariants({ variant: "ghost" })}>
              Home
            </a>

            {/* Courses Dropdown */}
            <NavigationMenuItem className="relative">
            <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 top-full mt-2 w-40 bg-white dark:bg-gray-900 shadow-md rounded-md">
              {coursesList.map(({ href, label }) => (
                <NavigationMenuLink
                  key={label}
                  href={href}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
           
           {/* Community Dropdown */}
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger>Community</NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-0 top-full mt-2 w-40 bg-white dark:bg-gray-900 shadow-md rounded-md">
                {communityList.map(({ href, label }) => (
                  <NavigationMenuLink
                    key={label}
                    href={href}
                    className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {label}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex gap-3">
            <a
              href="#get-started"
              className={buttonVariants({ variant: "default" })}
            >
              Get Started
            </a>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

