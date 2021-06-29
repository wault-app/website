import User from "@lib/server/auth/User";
import WrapperError from "@lib/server/error";
import wrapper from "@lib/server/wrapper";
import prisma from "@lib/server/prisma";
import { z } from "zod";

export default wrapper(async (req) => {
    // create a schema to type check user given parameters
    const schema = z.object({
        safeid: z.string(),
        data: z.string(),
    });

    // get the user object from the request
    const user = await User.get(req);

    // extract the user given parameters from the requests
    const { safeid, data } = schema.parse(JSON.parse(req.body));
    
    // find the safe based on the given id
    const safe = await prisma.safe.findUnique({
        where: {
            id: safeid,
        },
        include: {
            keycards: true,
        },
    });

    // check if the safe exists, and if exists, then check if the user has keycard with eigable role
    if(!safe || !safe.keycards.some((keycard) => ["OWNER", "WRITER"].includes(keycard.role) && keycard.userid === user.id)) throw new WrapperError("forbidden");

    // create the item in the database
    const item = await prisma.item.create({
        data: {
            safe: {
                connect: {
                    id: safe.id,
                },
            },
            data,
        },
    });

    // send back the item object with a small message to the frontend
    return {
        message: "successfully_created_item",
        item,
    };
});