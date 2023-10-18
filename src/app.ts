import express, { Application } from "express";
import * as route from "./routers";
import { connectDb } from "./config";

const app: Application = express();

app
    .use(express.json())
    .get("/health", (_req, res) => res.send("OK!"))
    .use("/participants", route.participantsRouter)
    .use("/games", route.gamesRouter)
    .use("/bets", route.betsRouter);

export function init(): Promise<express.Application> {
    connectDb();
    return Promise.resolve(app);
}

export default app;