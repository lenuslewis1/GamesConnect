import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertRegistrationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/events", async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const event = await storage.getEvent(parseInt(req.params.id));
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.json(event);
  });

  app.post("/api/events/:id/register", async (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = await storage.getEvent(eventId);

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    if (event.isPastEvent) {
      res.status(400).json({ message: "Cannot register for past events" });
      return;
    }

    const result = insertRegistrationSchema.safeParse({ ...req.body, eventId });
    if (!result.success) {
      res.status(400).json({ message: "Invalid registration data" });
      return;
    }

    const registration = await storage.createEventRegistration(result.data);
    res.json(registration);
  });

  app.post("/api/contact", async (req, res) => {
    const result = insertContactSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid contact form data" });
      return;
    }

    const message = await storage.createContactMessage(result.data);
    res.json(message);
  });

  return createServer(app);
}