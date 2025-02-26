import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const routes = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/community", label: "Community" },
  { path: "/contact", label: "Contact" }
];

export function Navigation() {
  const isMobile = useIsMobile();
  const [location] = useLocation();

  const NavLinks = () => (
    <>
      {routes.map((route) => (
        <Button
          key={route.path}
          variant={location === route.path ? "default" : "ghost"}
          asChild
        >
          <Link href={route.path}>{route.label}</Link>
        </Button>
      ))}
    </>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[360px]">
          <nav className="flex flex-col gap-2 mt-4">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="flex items-center gap-2">
      <NavLinks />
    </nav>
  );
}