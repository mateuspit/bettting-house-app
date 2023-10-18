import supertest from "supertest";
import cleanDB from "../helpers/cleanDB.helper";
import app, { init } from "@/app";
import { createGameDay, createTeam } from "../factories/game.factories";
import { createParticipant } from "../factories/participants.factories";

beforeAll(async () => {
    await init();
    await cleanDB();
});

const server = supertest(app);

const PARTICIPANTS_ROUTE = "/participants";
const GAMES_ROUTE = "/games";
const BETS_ROUTE = "/bets";

describe("POST /bets", () => {
    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post(BETS_ROUTE);
        expect(response.status).toBe(400);
    });

    it("should respond with status 400 when body is invalid", async () => {
        const response = await server.post(BETS_ROUTE).send({ name: "a" });
        expect(response.status).toBe(400);
    });

    it("should respond with status 403 when body info is not valid", async () => {
        const body = {
            homeTeamScore: 4,
            awayTeamScore: 2,
            amountBet: 100,
            gameId: 10,
            userId: 7,
        };
        const response = await server.post(BETS_ROUTE).send(body);
        expect(response.status).toBe(403);
    });

    it("should respond with status 403 when amountBet is less than 100", async () => {
        const body = {
            homeTeamScore: 4,
            awayTeamScore: 2,
            amountBet: 10,
            gameId: 1,
            userId: 7,
        };
        const response = await server.post(BETS_ROUTE).send(body);
        expect(response.status).toBe(403);
    });

    it("should respond with status 201 when body is valid", async () => {
        await cleanDB();
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const gameStatus = await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        expect(gameStatus.status).toBe(201);

        const userStatus = await server.post(PARTICIPANTS_ROUTE).send({ name: "newUser", balance: 666666 });
        expect(userStatus.status).toBe(201);

        const getGame = await server.get(GAMES_ROUTE);
        const getParticipant = await server.get(PARTICIPANTS_ROUTE);

        const body = {
            homeTeamScore: 4,
            awayTeamScore: 2,
            amountBet: 100,
            gameId: getGame.body[0].id,
            userId: getParticipant.body[0].id,
        };

        const response = await server.post(BETS_ROUTE).send(body);
        console.log(response.text);
        expect(response.status).toBe(201);
    });

    it("should respond with status 403 when participant is not found", async () => {
        await cleanDB();
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const gameStatus = await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        expect(gameStatus.status).toBe(201);

        const body = {
            homeTeamScore: 4,
            awayTeamScore: 2,
            amountBet: 100,
            gameId: gameStatus.body.id,
            userId: 7,
        };

        const response = await server.post(BETS_ROUTE).send(body);
        expect(response.status).toBe(403);
    });

    it("should respond with status 403 when game is not found", async () => {
        await cleanDB();
        const userStatus = await server.post(PARTICIPANTS_ROUTE).send({ name: "newUser", balance: 1000 });
        expect(userStatus.status).toBe(201);

        const body = {
            homeTeamScore: 4,
            awayTeamScore: 2,
            amountBet: 100,
            gameId: 10,
            userId: userStatus.body.id,
        };

        const response = await server.post(BETS_ROUTE).send(body);
        expect(response.status).toBe(403);
    });

    it("should respond with status 403 when game is finished", async () => {
        await cleanDB();
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const gameStatus = await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        expect(gameStatus.status).toBe(201);

        const userStatus = await server.post(PARTICIPANTS_ROUTE).send({ name: "newUser", balance: 1000 });
        expect(userStatus.status).toBe(201);

        await server.post(`/games/${gameStatus.body.id}/finish`).send({ homeTeamScore: 1, awayTeamScore: 0 });

        const body = {
            homeTeamScore: 4,
            awayTeamScore: 2,
            amountBet: 100,
            gameId: gameStatus.body.id,
            userId: userStatus.body.id,
        };

        const response = await server.post(BETS_ROUTE).send(body);
        expect(response.status).toBe(403);
    });

    it("should respond with status 403 when user has insufficient balance", async () => {
        await cleanDB();
        const homeTeamName = createTeam();
        const awayTeamName = createTeam();
        const gameDay = createGameDay();
        const gameStatus = await server.post(GAMES_ROUTE).send({ homeTeamName, awayTeamName, date: gameDay });
        expect(gameStatus.status).toBe(201);

        const userStatus = await server.post(PARTICIPANTS_ROUTE).send({ name: "newUser", balance: 1000 });
        expect(userStatus.status).toBe(201);

        const body = {
            homeTeamScore: 4,
            awayTeamScore: 2,
            amountBet: 9000,
            gameId: gameStatus.body.id,
            userId: userStatus.body.id,
        };

        const response = await server.post(BETS_ROUTE).send(body);
        expect(response.status).toBe(403);
    });
});