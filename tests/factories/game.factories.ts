import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function createTeam() {
    return faker.company.name();
}

export function createGameDay() {
    return faker.date.anytime();
}