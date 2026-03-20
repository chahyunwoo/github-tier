import { serve } from "@hono/node-server";
import { app } from "./app";

const port = 3333;

serve({ fetch: app.fetch, port });
