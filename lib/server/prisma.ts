import { PrismaClient } from ".prisma/client";

if(!global["prisma"]) {
    global["prisma"] = new PrismaClient();
} 

const prisma: PrismaClient = global["prisma"];

export default prisma;
