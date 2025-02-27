import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NavigationProps {
  variant?: "default" | "transparent";
}

const routes = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/community", label: "Community" },
  { path: "/contact", label: "Contact" }
];

export function Navigation({ variant = "default" }: NavigationProps) {
  const isMobile = useIsMobile();
  const [location] = useLocation();

  const isTransparent = variant === "transparent";

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <img src={IMAGES.logo} alt="Games & Connect" className="h-8 w-8" />
      <span className={cn("font-bold text-xl", isTransparent && "text-white")}>Games & Connect</span>
    </Link>
  );

  const NavLinks = () => (
    <>
      {routes.map((route) => (
        <Button
          key={route.path}
          variant={isTransparent ? "ghost" : location === route.path ? "default" : "ghost"}
          className={isTransparent ? "text-white hover:text-white hover:bg-white/10" : undefined}
          asChild
        >
          <Link href={route.path}>{route.label}</Link>
        </Button>
      ))}
    </>
  );

  if (isMobile) {
    return (
      <div className="flex justify-between items-center w-full py-4">
        <Logo />
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className={isTransparent ? "text-white hover:text-white hover:bg-white/10" : undefined}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[360px]">
            <nav className="flex flex-col gap-2 mt-4">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center w-full py-4">
      <Logo />
      <nav className="flex items-center gap-2">
        <NavLinks />
      </nav>
    </div>
  );
}