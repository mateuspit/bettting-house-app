import express, { Application } from "express";
//import * as route from "./routers";
import { connectDb } from "./database";

const app: Application = express();

app
    .use(express.json())
    .get("/health", (_req, res) => res.send("OK!"))
//.use("/participants", route.participantsRoute)
//.use("/games", route.gamesRoute)
//.use("/bets", route.betsRoute);

export function init(): Promise<express.Application> {
    connectDb();
    return Promise.resolve(app);
}

export default app;