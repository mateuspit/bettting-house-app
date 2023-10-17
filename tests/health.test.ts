import supertest from "supertest";
import app, { init } from "@/app";

beforeAll(async () => {
    await init();
});

const server = supertest(app);

const HEALTH_ROUTE = "/health";
const HEALTH_RESPONSE = "OK!";


describe("GET /health", () => {
    it("should respond with status 200", async () => {
        const response = await server.get(HEALTH_ROUTE);
        expect(response.status).toBe(200);
        expect(response.text).toBe(HEALTH_RESPONSE);
    });
});