import User from "@lib/server/auth/User";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";

export default wrapper(async (req) => {
    const { deviceid, id: userid } = await User.get(req);

    const exchanges = await prisma.keyExchange.findMany({
        where: {
            device: {
                userid,
                id: deviceid,
            },
        },
    });

    return {
        exchanges: exchanges.map((exchange) => ({
            safeid: exchange.safeid,
            content: exchange.content,
        })),
    };
});