import User from "@lib/server/auth/User";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";

export default wrapper(async (req) => {
    const user = await User.get(req);

    const schema = z.object({
        name: z.string(),
    });

    const { name } = schema.parse(JSON.parse(req.body));

    const keycard = await prisma.keycard.create({
        data: {
            role: "OWNER",
            safe: {
                create: {
                    name,
                },
            },
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
        include: {
            safe: {
                include: {
                    keycards: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                },
                            },
                        },
                    },
                    items: true,
                },
            },
        },
    });

    return {
        message: "successfully_created_safe",
        keycard,
    };
});