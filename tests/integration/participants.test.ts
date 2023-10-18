import supertest from "supertest";
import cleanDb from "../helpers/cleanDB.helper";
import app, { init } from "@/app";
import { createParticipant } from "../factories/participants-factory"

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

const PARTICIPANTS_ROUTE = "/participants";

describe("POST /participants", () => {
    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post(PARTICIPANTS_ROUTE);
        expect(response.status).toBe(400);
    });
    it("should respond with status 400 when body is invalid", async () => {
        const response = await server.post(PARTICIPANTS_ROUTE).send({ name: "Just Name" });
        expect(response.status).toBe(400);
    });
    it("should respond with status 400 when body is valid but participant already exists", async () => {
        const newUser = createParticipant();
        const response = await server.post(PARTICIPANTS_ROUTE).send({ name: newUser, balance: 666666 });
        expect(response.status).toBe(400);
    });
    it("should respond with status 201 when body is valid", async () => {
        const response = await server.post(PARTICIPANTS_ROUTE).send({ name: "Zaratustra", balance: 69069 });
        expect(response.status).toBe(201);
    });

});

describe("GET /participants", () => {
    it("should respond with status 200", async () => {
        const response = await server.get(PARTICIPANTS_ROUTE);
        expect(response.status).toBe(200);
    });

    it("should respond with status 200 and return an array of participants", async () => {
        const response = await server.get(PARTICIPANTS_ROUTE);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    balance: expect.any(Number),
                }),
            ])
        );
    });

    it("should respond with status 200 and return an empty array", async () => {
        await cleanDb();
        const response = await server.get(PARTICIPANTS_ROUTE);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});