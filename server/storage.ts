import { type Event, type InsertEvent, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private events: Map<number, Event>;
  private messages: Map<number, ContactMessage>;
  private eventId: number;
  private messageId: number;

  constructor() {
    this.events = new Map();
    this.messages = new Map();
    this.eventId = 1;
    this.messageId = 1;

    // Add some sample events
    const sampleEvents: InsertEvent[] = [
      {
        title: "Games Day at Akosombo",
        description: "Join us for a fun-filled day of outdoor games and activities at the beautiful Akosombo!",
        date: new Date("2024-04-15"),
        location: "Akosombo, Ghana",
        imageUrl: "https://images.unsplash.com/photo-1489493887464-892be6d1daae",
        isPastEvent: false,
        registrationLink: "https://forms.gle/example1"
      },
      {
        title: "Night Games and Party at the Beach",
        description: "Experience the thrill of night games followed by a beach party under the stars!",
        date: new Date("2024-04-28"),
        location: "Labadi Beach, Accra",
        imageUrl: "https://images.unsplash.com/photo-1481889617387-82a8f2413b6b",
        isPastEvent: false,
        registrationLink: "https://forms.gle/example2"
      },
      {
        title: "Community Game Night",
        description: "Indoor games, trivia, and networking with the Games & Connect community!",
        date: new Date("2024-03-10"),
        location: "Community Center, East Legon",
        imageUrl: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c",
        isPastEvent: true,
        registrationLink: null
      }
    ];

    sampleEvents.forEach(event => this.createEvent(event));
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    const newEvent = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageId++;
    const newMessage = { ...message, id, createdAt: new Date() };
    this.messages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
