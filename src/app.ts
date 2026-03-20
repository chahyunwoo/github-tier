import { Hono } from "hono";
import { tierHandler, previewHandler, testPage } from "./routes";

export const app = new Hono();

app.get("/api/tier", tierHandler);
app.get("/api/preview", previewHandler);
app.get("/test", testPage);
