import supertest from "supertest";
import cleanDB from "../helpers/cleanDB.helper";
import app, { init } from "@/app";
import { createGameDay, createTeam } from "../factories/game.factories";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

beforeAll(async () => {
    await init();
    await cleanDB();
});

const server = supertest(app);

describe("POST /games", () => {
    it("should respond with status 201 when body is valid", async () => {
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const response = await server.post("/games").send({ homeTeamName, awayTeamName, date: gameDay });
        expect(response.status).toBe(201);
    });

    //it("should respond with status 409 when body is valid but game already exists", async () => {
    //    const homeTeamName = createTeam();
    //    const awayTeamName = createTeam();
    //    const gameDay = createGameDay();
    //    const nowDate = new Date();
    //    const newGame = {
    //        awayTeamName,
    //        date: gameDay,
    //        homeTeamName,
    //        createdAt: nowDate,
    //        updatedAt: nowDate,
    //        homeTeamScore: 0,
    //        awayTeamScore: 0,
    //        isFinished: false,
    //    }
    //    await prisma.game.create({ data: newGame });

    //    const response = await server.post("/games").send({ homeTeamName, awayTeamName, date: gameDay });
    //    expect(response.status).toBe(409);
    //});
    //it("should respond with status 406 when body is valid but homeTeamName and awayTeamName are equal", async () => {
    //    const response = await server.post("/games").send({ homeTeamName: "same", awayTeamName: "same" });
    //    expect(response.status).toBe(406);
    //});

    //it("should respond with status 400 when body is not given", async () => {
    //    const response = await server.post("/games");
    //    expect(response.status).toBe(400);
    //});

    //it("should respond with status 400 when body is invalid", async () => {
    //    const response = await server.post("/games").send({ name: "a" });
    //    expect(response.status).toBe(400);
    //});
});

//describe("GET /games", () => {
//    it("should respond with status 200", async () => {
//        const response = await server.get("/games");
//        expect(response.status).toBe(200);
//    });

//    it("should respond with status 200", async () => {
//        const response = await server.get("/games");
//        expect(response.status).toBe(200);
//        expect(response.body).toEqual([
//            {
//                id: expect.any(Number),
//                homeTeamName: "Venda",
//                awayTeamName: "Nova",
//                awayTeamScore: 0,
//                homeTeamScore: 0,
//                isFinished: false,
//                createdAt: expect.any(String),
//                updatedAt: expect.any(String),
//            },
//        ]);
//    });

//    it("should respond with status 200 and return an empty array", async () => {
//        await cleanDB();
//        const response = await server.get("/games");
//        expect(response.status).toBe(200);
//        expect(response.body).toEqual([]);
//    });
//});

//describe("GET /games/:id", () => {
//    it("should respond with status 404 when game does not exist", async () => {
//        await cleanDb();
//        const response = await server.get("/games/100");
//        expect(response.status).toBe(404);
//    });

//    it("should respond with status 200 and return an object", async () => {
//        const game = await server.post("/games").send({ homeTeamName: "2", awayTeamName: "3" });
//        const response = await server.get(`/games/${game.body.id}`);

//        expect(response.status).toBe(200);
//        expect(response.body).toEqual({
//            id: game.body.id,
//            homeTeamName: expect.any(String),
//            awayTeamName: expect.any(String),
//            awayTeamScore: expect.any(Number),
//            homeTeamScore: expect.any(Number),
//            isFinished: expect.any(Boolean),
//            createdAt: expect.any(String),
//            updatedAt: expect.any(String),
//            bets: expect.any(Array),
//        });
//    });

//    it("should respond with status 400 when id is invalid", async () => {
//        const response = await server.get("/games/abc");
//        expect(response.status).toBe(400);
//    });
//});

//describe("POST /games/:id/finish", () => {
//    it("should respond with status 404 when game does not exist", async () => {
//        await cleanDb();
//        const response = await server.post("/games/10/finish").send({ homeTeamScore: 1, awayTeamScore: 2 });
//        expect(response.status).toBe(404);
//    });

//    it("should respond with status 400 when body is invalid", async () => {
//        const game = await server.post("/games").send({ homeTeamName: "AAA", awayTeamName: "THX 1138" });
//        const response = await server.post(`/games/${game.body.id}/finish`).send({ homeTeamScore: 1 });
//        expect(response.status).toBe(400);
//    });

//    it("should respond with status 200 when body is valid", async () => {
//        const game = await server.post("/games").send({ homeTeamName: "JJ", awayTeamName: "KK" });
//        const response = await server
//            .post(`/games/${game.body.id}/finish`)
//            .send({ homeTeamScore: 1, awayTeamScore: 2 });
//        expect(response.status).toBe(200);
//    });

//    it("should respond with status 409 when game is already finished", async () => {
//        const game = await server.post("/games").send({ homeTeamName: "321", awayTeamName: "124" });
//        await server.post(`/games/${game.body.id}/finish`).send({ homeTeamScore: 1, awayTeamScore: 2 });
//        const response = await server
//            .post(`/games/${game.body.id}/finish`)
//            .send({ homeTeamScore: 1, awayTeamScore: 2 });
//        expect(response.status).toBe(409);
//    });

//    it("should respond with status 200 when body is valid and users win the bet", async () => {
//        const game = await server.post("/games").send({ homeTeamName: "Sessenta", awayTeamName: "Trezentos" });
//        const user = await server.post("/participants").send({ name: "Yokuny", balance: 5000 });
//        await server.post("/bets").send({
//            homeTeamScore: 1,
//            awayTeamScore: 2,
//            amountBet: 4000,
//            gameId: game.body.id,
//            participantId: user.body.id,
//        });

//        const res = await server
//            .post(`/games/${game.body.id}/finish`)
//            .send({ homeTeamScore: 1, awayTeamScore: 2 });
//        expect(res.status).toBe(200);
//    });
//});