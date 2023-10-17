import { prisma, connectDb } from "../src/database";

async function cleanDb() {
    await prisma.bet.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.game.deleteMany({});
}

async function seed() {
    connectDb();
    cleanDb();

    await prisma.user.createMany({
        data: [
            { name: "Jesus", balance: 666666 },
            { name: "Buda", balance: 696969 },
            { name: "Socrates", balance: 69666 },
        ],
    });

    const firstUser = await prisma.user.findFirst({
        where: { name: "Jesus" }
    })

    const secondUser = await prisma.user.findFirst({
        where: { name: "Buda" }
    })

    const thirdUser = await prisma.user.findFirst({
        where: { name: "Socrates" }
    })

    await prisma.game.createMany({
        data: [
            {
                homeTeamName: "HOME TEAM 1",
                awayTeamName: "AWAY TEAM 1",
                homeTeamScore: 7,
                awayTeamScore: 1,
                date: "2000-10-10",
                isFinished: false,
            },
            {
                homeTeamName: "HOME TEAM 2",
                awayTeamName: "AWAY TEAM 2",
                homeTeamScore: 7,
                awayTeamScore: 2,
                date: "2001-10-10",
                isFinished: false,
            },
            {
                homeTeamName: "HOME TEAM 3",
                awayTeamName: "AWAY TEAM 3",
                homeTeamScore: 1,
                awayTeamScore: 7,
                date: "2002-10-10",
                isFinished: false,
            },
            {
                homeTeamName: "HOME TEAM 4",
                awayTeamName: "AWAY TEAM 4",
                homeTeamScore: 2,
                awayTeamScore: 7,
                date: "2003-10-10",
                isFinished: false,
            },
        ],
    });

    await prisma.bet.createMany({
        data: [
            {
                homeTeamScore: 2,
                awayTeamScore: 1,
                amountBet: 100,
                gameId: 1,
                userId: firstUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 2,
                awayTeamScore: 1,
                amountBet: 200,
                gameId: 1,
                userId: secondUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 4,
                amountBet: 500,
                gameId: 2,
                userId: thirdUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 4,
                amountBet: 100,
                gameId: 2,
                userId: firstUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 2,
                awayTeamScore: 0,
                amountBet: 300,
                gameId: 3,
                userId: secondUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 0,
                amountBet: 250,
                gameId: 2,
                userId: thirdUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 2,
                amountBet: 300,
                gameId: 3,
                userId: secondUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 2,
                awayTeamScore: 5,
                amountBet: 400,
                gameId: 4,
                userId: thirdUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 1,
                amountBet: 500,
                gameId: 4,
                userId: firstUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 7,
                awayTeamScore: 3,
                amountBet: 400,
                gameId: 4,
                userId: firstUser?.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 1,
                amountBet: 500,
                gameId: 4,
                userId: thirdUser?.id,
                status: "PENDING",
            },
        ],
    });
}
seed();