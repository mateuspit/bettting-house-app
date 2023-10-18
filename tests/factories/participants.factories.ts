import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createParticipant() {
    return prisma.user.create({
        data: {
            name: faker.person.fullName()
        }
    });
}