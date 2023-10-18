import supertest from "supertest";
import cleanDB from "../helpers/cleanDB.helper";
import app, { init } from "@/app";
import { createGameDay, createTeam } from "../factories/game.factories";
import { PrismaClient } from "@prisma/client";
import { createParticipant } from "../factories/participants.factories";
const prisma = new PrismaClient();

beforeAll(async () => {
    await init();
    await cleanDB();
});

const server = supertest(app);

const PARTICIPANTS_ROUTE = "/participants";
const GAMES_ROUTE = "/games";

describe("POST /games", () => {
    it("should respond with status 201 when body is valid", async () => {
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const response = await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        expect(response.status).toBe(201);
    });

    it("should respond with status 409 when body is valid but game already exists", async () => {
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const nowDate = new Date();
        const newGame = {
            awayTeamName,
            date: gameDay,
            homeTeamName,
            createdAt: nowDate,
            updatedAt: nowDate,
            homeTeamScore: 0,
            awayTeamScore: 0,
            isFinished: false,
        }
        await prisma.game.create({ data: newGame });

        const response = await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        expect(response.status).toBe(409);
    });

    it("should respond with status 406 when body is valid but homeTeamName and awayTeamName are equal", async () => {
        const homeTeamName = createTeam();
        const awayTeamName = homeTeamName;
        const gameDay = createGameDay();
        const response = await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        expect(response.status).toBe(406);
    });

    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post(GAMES_ROUTE);
        expect(response.status).toBe(400);
    });

    it("should respond with status 400 when body is invalid", async () => {
        const response = await server.post(GAMES_ROUTE).send({ name: "a" });
        expect(response.status).toBe(400);
    });
});

describe("GET /games", () => {
    it("should respond with status 200", async () => {
        const response = await server.get(GAMES_ROUTE);
        expect(response.status).toBe(200);
    });

    it("should respond with status 200", async () => {
        await cleanDB();
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        const response = await server.get(GAMES_ROUTE);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: expect.any(Number),
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                date: expect.any(String),
                awayTeamScore: 0,
                homeTeamScore: 0,
                isFinished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            },
        ]);
    });

    it("should respond with status 200 and return an empty array", async () => {
        await cleanDB();
        const response = await server.get(GAMES_ROUTE);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });
});

describe("GET /games/:id", () => {
    it("should respond with status 204 when game does not exist", async () => {
        await cleanDB();
        const response = await server.get("/games/69696969");
        expect(response.status).toBe(204);
    });

    it("should respond with status 200 and return an object", async () => {
        await cleanDB();
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        const getGame = await server.get(GAMES_ROUTE);

        const response = await server.get(`${GAMES_ROUTE}/${getGame.body[0].id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: getGame.body[0].id,
            homeTeamName: expect.any(String),
            awayTeamName: expect.any(String),
            awayTeamScore: expect.any(Number),
            homeTeamScore: expect.any(Number),
            isFinished: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            date: expect.any(String),
            Bet: expect.any(Array),
        });
    });

    it("should respond with status 400 when id is invalid", async () => {
        const response = await server.get(`${GAMES_ROUTE}/abc`);
        expect(response.status).toBe(400);
    });
});

describe("POST /games/:id/finish", () => {
    it("should respond with status 404 when game does not exist", async () => {
        await cleanDB();
        const response = await server.post(`${GAMES_ROUTE}/10/finish`).send({ homeTeamScore: 1, awayTeamScore: 2 });
        expect(response.status).toBe(404);
    });

    it("should respond with status 400 when body is invalid", async () => {
        const game = await server.post(GAMES_ROUTE).send({ homeTeamName: "AAA", awayTeamName: "THX 1138" });
        const response = await server.post(`/games/${game.body.id}/finish`).send({ homeTeamScore: 1 });
        expect(response.status).toBe(400);
    });

    it("should respond with status 201 when body is valid", async () => {
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const game = await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        const response = await server
            .post(`/games/${game.body.id}/finish`)
            .send({ homeTeamScore: 1, awayTeamScore: 2 });
        expect(response.status).toBe(201);
    });

    it("should respond with status 409 when game is already finished", async () => {


        await cleanDB();
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        const getGame = await server.get(GAMES_ROUTE);
        await server.post(`${GAMES_ROUTE}/${getGame.body[0].id}/finish`).send({ homeTeamScore: 1, awayTeamScore: 2 });
        const response = await server
            .post(`${GAMES_ROUTE}/${getGame.body[0].id}/finish`)
            .send({ homeTeamScore: 1, awayTeamScore: 2 });
        expect(response.status).toBe(404);
    });

    it("should respond with status 201 when body is valid and users win the bet", async () => {
        await cleanDB();
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const newUser = createParticipant();

        await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });

        const getGame = await server.get(GAMES_ROUTE);

        const user = await server.post(PARTICIPANTS_ROUTE).send({ name: newUser, balance: 5000 });
        await server.post("/bets").send({
            homeTeamScore: 1,
            awayTeamScore: 2,
            amountBet: 4000,
            gameId: getGame.body[0].id,
            participantId: user.body.id,
        });

        const res = await server
            .post(`${GAMES_ROUTE}/${getGame.body[0].id}/finish`)
            .send({ homeTeamScore: 1, awayTeamScore: 2 });
        expect(res.status).toBe(201);
    });
});