import User from "@lib/server/auth/User";
import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";

export default wrapper(async (req) => {
    const schema = z.object({
        deviceid: z.string(),
        safeid: z.string(),
        content: z.string(),
    });

    const { deviceid, safeid, content } = schema.parse(JSON.parse(req.body));
    const user = await User.get(req);

    const safe = await prisma.safe.findUnique({
        where: {
            id: safeid,
        },
        include: {
            keycards: true,
        }
    });

    if(!safe.keycards.find((keycard) => keycard.userid === user.id && ["WRITER", "OWNER"].includes(keycard.role))) throw new WrapperError("forbidden");

    await prisma.keyExchange.create({
        data: {
            device: {
                connect: {
                    id: deviceid,
                },
            },
            safe: {
                connect: {
                    id: safeid,
                },
            },
            content,
        },
    });

    return {
        message: "successfully_sent_key_exchange",
    };
});
