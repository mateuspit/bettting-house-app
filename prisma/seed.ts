import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function cleanDb() {
    await prisma.bet.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.game.deleteMany({});
}

async function seed() {
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
                date: new Date("2000-10-10"),
                homeTeamScore: 7,
                awayTeamScore: 1,
                isFinished: false,
            },
            {
                homeTeamName: "HOME TEAM 2",
                awayTeamName: "AWAY TEAM 2",
                homeTeamScore: 7,
                awayTeamScore: 2,
                date: new Date("2001-10-10"),
                isFinished: false,
            },
            {
                homeTeamName: "HOME TEAM 3",
                awayTeamName: "AWAY TEAM 3",
                homeTeamScore: 1,
                awayTeamScore: 7,
                date: new Date("2002-10-10"),
                isFinished: false,
            },
            {
                homeTeamName: "HOME TEAM 4",
                awayTeamName: "AWAY TEAM 4",
                homeTeamScore: 2,
                awayTeamScore: 7,
                date: new Date("2003-10-10"),
                isFinished: false,
            },
        ],
    });

    const firstGame = await prisma.game.findFirst({
        where: {
            homeTeamName: "HOME TEAM 1",
            awayTeamName: "AWAY TEAM 1",
            date: new Date("2000-10-10")
        }
    })

    const secondGame = await prisma.game.findFirst({
        where: {
            homeTeamName: "HOME TEAM 2",
            awayTeamName: "AWAY TEAM 2",
            date: new Date("2001-10-10")
        }
    })

    const thirdGame = await prisma.game.findFirst({
        where: {
            homeTeamName: "HOME TEAM 3",
            awayTeamName: "AWAY TEAM 3",
            date: new Date("2002-10-10")
        }
    })

    const fourthGame = await prisma.game.findFirst({
        where: {
            homeTeamName: "HOME TEAM 4",
            awayTeamName: "AWAY TEAM 4",
            date: new Date("2003-10-10")
        }
    })

    //console.log(firstGame?.id, firstUser?.id)
    await prisma.bet.createMany({
        data: [
            {
                homeTeamScore: 2,
                awayTeamScore: 1,
                amountBet: 100,
                gameId: firstGame.id,
                userId: firstUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 2,
                awayTeamScore: 1,
                amountBet: 200,
                gameId: firstGame.id,
                userId: secondUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 4,
                amountBet: 500,
                gameId: secondGame.id,
                userId: thirdUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 4,
                amountBet: 100,
                gameId: secondGame.id,
                userId: firstUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 2,
                awayTeamScore: 0,
                amountBet: 300,
                gameId: thirdGame.id,
                userId: secondUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 0,
                amountBet: 250,
                gameId: secondGame.id,
                userId: thirdUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 2,
                amountBet: 300,
                gameId: thirdGame.id,
                userId: secondUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 2,
                awayTeamScore: 5,
                amountBet: 400,
                gameId: fourthGame.id,
                userId: thirdUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 1,
                amountBet: 500,
                gameId: fourthGame.id,
                userId: firstUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 7,
                awayTeamScore: 3,
                amountBet: 400,
                gameId: fourthGame.id,
                userId: firstUser.id,
                status: "PENDING",
            },
            {
                homeTeamScore: 1,
                awayTeamScore: 1,
                amountBet: 500,
                gameId: fourthGame.id,
                userId: thirdUser.id,
                status: "PENDING",
            },
        ],
    });
}
seed();