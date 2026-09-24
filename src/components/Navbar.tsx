import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";

interface RouteProps {
  href: string;
  label: string;
}

interface NavItemProps extends RouteProps {
  cta?: boolean;
}

const primaryLinks: RouteProps[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/cohorts", label: "Cohorts" },
  { href: "/stories", label: "Stories" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

const programsList: RouteProps[] = [
  { href: "/cohorts", label: "Cohorts" },
  { href: "https://learn.amilliontechies.com", label: "Mentorship / Learning" },
];

const communityList: RouteProps[] = [
  { href: "/community", label: "Our Community" },
  { href: "/mentors", label: "Mentors" },
  { href: "/events", label: "Events" },
];

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const isActivePath = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }

    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const isProgramsActive = programsList.some(
    (item) => item.href.startsWith("/") && isActivePath(item.href)
  );
  const isCommunityActive = communityList.some((item) => isActivePath(item.href));

  const navLinkClassName = (
    isActive: boolean,
    variant: "ghost" | "outline" = "ghost"
  ) =>
    cn(
      buttonVariants({ variant }),
      "transition-all duration-200",
      isActive &&
        (variant === "ghost"
          ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300"
          : "border-green-300 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300")
    );

  const dropdownTriggerClassName = (isActive: boolean) =>
    cn(navLinkClassName(isActive), "font-medium");

  const dropdownItemClassName = (href: string) =>
    cn(
      "block rounded-md px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
      isActivePath(href) && "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300"
    );

  const MobileNavLink = ({ href, label, cta = false }: NavItemProps) => (
    <NavLink
      to={href}
      className={cn(
        navLinkClassName(isActivePath(href), cta ? "outline" : "ghost"),
        "w-full justify-start"
      )}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </NavLink>
  );

  const DesktopNavLink = ({ href, label, cta = false }: NavItemProps) => (
    <NavLink to={href} className={navLinkClassName(isActivePath(href), cta ? "outline" : "ghost")}>
      {label}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-b-slate-700 dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-3 sm:px-4">
        <NavLink to="/" className="ml-1 flex min-w-0 items-center gap-2 text-sm font-bold leading-none sm:ml-2 sm:text-lg">
          <img
            src="/amilliontechies.png"
            alt="A Million Techies Logo"
            className="h-8 w-8 shrink-0"
          />
          <span className="max-w-[calc(100vw-7rem)] truncate sm:max-w-none">A Million Techies</span>
        </NavLink>

        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2">
              <Menu className="h-5 w-5" onClick={() => setIsOpen(true)} />
            </SheetTrigger>

            <SheetContent side="left" className="w-[85vw] max-w-sm px-5">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">A Million Techies</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-2">
                {primaryLinks.map((item) => (
                  <MobileNavLink key={item.href} {...item} />
                ))}

                <details className="w-full" open={isProgramsActive}>
                  <summary className={cn("cursor-pointer rounded-md px-3 py-2 text-sm font-medium", isProgramsActive && "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300")}>
                    Programs
                  </summary>
                  <ul className="ml-4 mt-2 flex flex-col gap-2">
                    {programsList.map(({ href, label }) => (
                      <li key={label}>
                        {href.startsWith("/") ? (
                          <NavLink
                            to={href}
                            className={dropdownItemClassName(href)}
                            onClick={() => setIsOpen(false)}
                          >
                            {label}
                          </NavLink>
                        ) : (
                          <a
                            href={href}
                            className="block rounded-md px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            {label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>

                <details className="w-full" open={isCommunityActive}>
                  <summary className={cn("cursor-pointer rounded-md px-3 py-2 text-sm font-medium", isCommunityActive && "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300")}>
                    Community
                  </summary>
                  <ul className="ml-4 mt-2 flex flex-col gap-2">
                    {communityList.map(({ href, label }) => (
                      <li key={label}>
                        <NavLink
                          to={href}
                          className={dropdownItemClassName(href)}
                          onClick={() => setIsOpen(false)}
                        >
                          {label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>

                <MobileNavLink href="/join-us" label="Join Us" cta />
                <div className="pt-2">
                  <ModeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden items-center gap-2 md:flex lg:gap-4">
          {primaryLinks.map((item) => (
            <DesktopNavLink key={item.href} {...item} />
          ))}

          <div className="relative">
            <button
              onClick={() => setIsProgramsOpen((open) => !open)}
              className={dropdownTriggerClassName(isProgramsActive)}
            >
              Programs
            </button>
            {isProgramsOpen && (
              <div className="absolute left-0 top-full mt-2 w-52 rounded-md bg-white shadow-md dark:bg-gray-900">
                {programsList.map(({ href, label }) =>
                  href.startsWith("/") ? (
                    <NavLink
                      key={label}
                      to={href}
                      className={dropdownItemClassName(href)}
                      onClick={() => setIsProgramsOpen(false)}
                    >
                      {label}
                    </NavLink>
                  ) : (
                    <a
                      key={label}
                      href={href}
                      className="block rounded-md px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {label}
                    </a>
                  )
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsCommunityOpen((open) => !open)}
              className={dropdownTriggerClassName(isCommunityActive)}
            >
              Community
            </button>
            {isCommunityOpen && (
              <div className="absolute left-0 top-full mt-2 w-40 rounded-md bg-white shadow-md dark:bg-gray-900">
                {communityList.map(({ href, label }) => (
                  <NavLink
                    key={label}
                    to={href}
                    className={dropdownItemClassName(href)}
                    onClick={() => setIsCommunityOpen(false)}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <DesktopNavLink href="/join-us" label="Join Us" cta />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};
