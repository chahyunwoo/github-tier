import { Hono } from "hono";
import { tierHandler } from "./routes";

export const app = new Hono().basePath("/api");

app.get("/tier", tierHandler);
