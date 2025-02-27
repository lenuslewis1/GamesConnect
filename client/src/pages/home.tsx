import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/constants";
import { Navigation } from "@/components/site/navigation";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <section className="relative min-h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${IMAGES.header})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5)"
          }}
        />
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="container">
            <Navigation variant="transparent" />
          </div>
        </div>
        <div className="container relative z-10 text-center mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Games & Connect
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join Accra's most vibrant community for outdoor games, travel events, and unforgettable social experiences.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10" asChild>
                <Link href="/community">Join Community</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container pb-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">About Games & Connect</h2>
            <p className="text-muted-foreground mb-6">
              We're more than just a community - we're a family of game enthusiasts, adventurers, and friends who believe in creating meaningful connections through shared experiences.
            </p>
            <ul className="space-y-4">
              {[
                "Weekly outdoor games and activities",
                "Monthly travel adventures",
                "Trivia Fridays",
                "Special community events"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={IMAGES.events.community}
              alt="Community event"
              className="rounded-lg object-cover h-48 w-full"
            />
            <img
              src={IMAGES.events.beach}
              alt="Outdoor games"
              className="rounded-lg object-cover h-48 w-full mt-8"
            />
          </div>
        </div>
      </section>
    </div>
  );
}