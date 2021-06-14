import User from "@lib/server/auth/User";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";

export default wrapper(async (req) => {
    const user = await User.get(req);

    const keycards = await prisma.keycard.findMany({
        where: {
            userid: user.id,
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
        keycards,
    };
});
