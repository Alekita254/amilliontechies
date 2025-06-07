import { useState } from "react";
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
import { ContactPopover } from "./contactPopover";

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
  { href: "/community", label: "Forums" },
  { href: "/community", label: "Discord" },
  { href: "/community", label: "Mentorship" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState<boolean>(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:border-b-slate-700 dark:bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="ml-2 flex text-xl font-bold">
          <img
            src="/src/assets/amilliontechies.png"
            alt="A Million Techies Logo"
            className="h-8 w-8"
          />
          A Million Techies
        </a>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
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

                <details className="w-full">
                  <summary className="cursor-pointer p-2">Community</summary>
                  <ul className="ml-4 flex flex-col gap-2">
                    {communityList.map(({ href, label }) => (
                      <li key={label}>
                        <a
                          href={href}
                          className="text-sm text-gray-600 dark:text-gray-300"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
                <a
                  href="/blog"
                  className={buttonVariants({ variant: "default" })}
                >
                  Our Blogs
                </a>
                <a
                  href="/community"
                  className={buttonVariants({ variant: "default" })}
                >
                  Community
                </a>
                <a
                  href="/joinus"
                  className={buttonVariants({ variant: "default" })}
                >
                  Join Us
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          <a href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </a>
          <a href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Our Blogs
          </a>
          {/* Courses Dropdown
           */}
          {/* Community Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCommunityOpen(!isCommunityOpen)}
              className={buttonVariants({ variant: "ghost" })}
            >
              Community
            </button>
            {isCommunityOpen && (
              <div className="absolute left-0 top-full mt-2 w-40 bg-white dark:bg-gray-900 shadow-md rounded-md">
                {communityList.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="/joinus" className={buttonVariants({ variant: "default" })}>
            Join Us
          </a>
        </nav>
      </div>
    </header>
  );
};
