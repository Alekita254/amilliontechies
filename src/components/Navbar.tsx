
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

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
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

