import { defineCollection, z } from "astro:content";

const schedule = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    name: z.string(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    startTime1: z.coerce.date().optional(),
    endTime2: z.coerce.date().optional(),
    heroImage: z.string(),
    tags: z.array(z.string()).optional(),
    location: z.string(),
    subLocation: z.string().optional(),
  }),
});

export const collections = { schedule };
