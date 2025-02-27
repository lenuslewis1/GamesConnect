import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/constants";
import { Navigation } from "@/components/site/navigation";
import { CountdownTimer } from "@/components/event/countdown-timer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(1, "Location is required"),
});

type RegistrationData = z.infer<typeof registrationSchema>;

export default function Home() {
  const { toast } = useToast();
  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: RegistrationData) => {
      // Assuming we'll register for an event with ID 1 (the Games Day event)
      await apiRequest("POST", "/api/events/1/register", data);
    },
    onSuccess: () => {
      toast({
        title: "Registration successful!",
        description: "You've been registered for Games Day at Akosombo.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please try again later.",
      });
    }
  });

  return (
    <div className="flex flex-col gap-16">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            backgroundImage: `url(${IMAGES.header})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)",
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
              <Link href="/events">
                <Button size="lg">Explore Events</Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="bg-white/10">Join Community</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Register for Community Membership</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to join our community. Price: 500 Ghana Cedis
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                      className="space-y-4 mt-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Your location" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Registering..." : "Register"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <CountdownTimer 
              targetDate={new Date("April 18, 2025")} 
              eventName="Upcoming Event: Games Day at Akosombo" 
            />
            <div className="flex justify-center mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8">Join Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Register for Games Day at Akosombo</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to register for this event on April 18, 2025. Price: 500 Ghana Cedis
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                      className="space-y-4 mt-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Your location" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Registering..." : "Register"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-8 bg-white py-12 rounded-lg">
        <div className="grid grid-cols-3 gap-6 mb-12 text-center">
          <div>
            <h3 className="text-4xl font-bold text-primary">3+</h3>
            <p className="text-muted-foreground">Exciting Events Hosted</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary">60+</h3>
            <p className="text-muted-foreground">Participants Engaged</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-primary">90%</h3>
            <p className="text-muted-foreground">Event Satisfaction Rate</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-4">Experience outdoor games<br />and travel like never before.</h2>
          <p className="text-muted-foreground mb-4 max-w-2xl">
            We organize exciting activities that bring young people together to play, explore, and create lasting memories across Accra, Ghana. Let's play, connect, and travel!
          </p>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            At Games and Connect, we foster social connections through fun outdoor games and immersive travel experiences. We aim to build a vibrant community where people bond, stay active, and discover the beauty of Ghana.
          </p>
          <div className="relative mt-4">
            <img 
              src="/src/assets/images/target.png" 
              alt="Target" 
              className="h-32 absolute -left-16 top-0"
            />
            <img 
              src="/src/assets/images/cards.png" 
              alt="Playing cards" 
              className="h-24 absolute -right-12 bottom-0"
            />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Play Card */}
          <Card className="overflow-hidden bg-[#E6B75A]">
            <CardContent className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Play</h3>
              <p className="text-sm mb-4">Immerse yourself in thrilling games and challenges.</p>
              
              <div className="flex justify-center mb-4">
                <img 
                  src="/src/assets/images/play-icon.png" 
                  alt="Person playing soccer" 
                  className="h-32"
                />
              </div>
              
              <p className="text-sm mt-2">
                Come to the playground of laughter and friendship, where games bring people together in fun competition.
              </p>
            </CardContent>
          </Card>

          {/* Explore Card */}
          <Card className="overflow-hidden bg-[#F48FB1]">
            <CardContent className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Explore</h3>
              <p className="text-sm mb-4">Discover new places and adventures.</p>
              
              <div className="flex justify-center mb-4">
                <img 
                  src="/src/assets/images/explore-icon.png" 
                  alt="People exploring" 
                  className="h-32"
                />
              </div>
              
              <p className="text-sm mt-2">
                Join us for unforgettable trips and experiences that take you beyond the ordinary.
              </p>
            </CardContent>
          </Card>

          {/* Connect Card */}
          <Card className="overflow-hidden bg-[#80A395]">
            <CardContent className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Connect</h3>
              <p className="text-sm mb-4">Meet new people and build lasting friendships.</p>
              
              <div className="flex justify-center mb-4">
                <img 
                  src="/src/assets/images/connect-icon.png" 
                  alt="People connecting" 
                  className="h-32"
                />
              </div>
              
              <p className="text-sm mt-2">
                Connect with a dynamic, diverse community that shares your passion for fun and friendship.
              </p>
            </CardContent>
          </Card>

          {/* Join Us Card */}
          <Card className="overflow-hidden bg-[#D4C627]">
            <CardContent className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Join Us</h3>
              <p className="text-sm mb-4">Be part of the next big event!</p>
              
              <div className="flex justify-center mb-4">
                <img 
                  src="/src/assets/images/join-icon.png" 
                  alt="People celebrating" 
                  className="h-32"
                />
              </div>
              
              <p className="text-sm mt-2">
                Don't miss out on the fun—secure your spot today.
              </p>
              
              <Button className="w-full mt-4 bg-[#5B68DF] hover:bg-[#4555D2]">
                Sign Up Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}