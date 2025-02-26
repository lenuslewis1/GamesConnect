import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiWhatsapp } from "react-icons/si";

export default function Community() {
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
          <p className="text-muted-foreground">
            Connect with like-minded individuals who share your passion for games and adventure.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Community</CardTitle>
              <CardDescription>
                Join our active WhatsApp group to stay updated on events and connect with members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <a
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <SiWhatsapp className="h-5 w-5" />
                  Join WhatsApp Group
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Trivia Fridays</CardTitle>
              <CardDescription>
                Test your knowledge and win prizes in our weekly trivia nights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Every Friday at 7 PM, we host an exciting trivia night covering various topics:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Sports and Games</li>
                <li>• Pop Culture</li>
                <li>• African History</li>
                <li>• General Knowledge</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Program</CardTitle>
            <CardDescription>
              Earn points and unlock exclusive rewards as you participate in our events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  level: "Bronze",
                  points: "0-50 points",
                  benefits: ["Event notifications", "Community access"]
                },
                {
                  level: "Silver",
                  points: "51-150 points",
                  benefits: ["10% event discounts", "Priority registration"]
                },
                {
                  level: "Gold",
                  points: "151+ points",
                  benefits: ["20% event discounts", "Exclusive events", "Bring a friend free"]
                }
              ].map((tier, i) => (
                <motion.div
                  key={tier.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{tier.level}</CardTitle>
                      <CardDescription>{tier.points}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2">
                        {tier.benefits.map((benefit, j) => (
                          <li key={j}>• {benefit}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
