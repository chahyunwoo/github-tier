import { Hono } from "hono";
import { tierHandler } from "./routes";

export const app = new Hono();

app.get("/api/tier", tierHandler);
