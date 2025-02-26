import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Games & Connect</h3>
            <p className="text-sm text-muted-foreground">
              Creating memorable experiences through games and community in Accra.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/events">
                <Button variant="link">Events</Button>
              </Link>
              <Link href="/community">
                <Button variant="link">Join Community</Button>
              </Link>
              <Link href="/contact">
                <Button variant="link">Contact Us</Button>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <SiWhatsapp className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/gamesconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <FaXTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/gamesconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Games & Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}