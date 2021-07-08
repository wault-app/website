import User from "@lib/server/auth/User";
import WrapperError from "@lib/server/error";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";

export default wrapper(async (req) => {
    const user = await User.get(req);
    const schema = z.object({
        deviceid: z.string(),
    });

    const { deviceid } = schema.parse(JSON.parse(req.body));

    const device = await prisma.device.findUnique({
        where: {
            id: deviceid,
        },
    });

    if(device.userid !== user.id) throw new WrapperError("forbidden");

    await prisma.keyExchange.deleteMany({
        where: {
            deviceid,
        },
    });

    await prisma.device.delete({
        where: {
            id: deviceid,
        },
    });

    return {
        message: "successful_remote_logout",
    };
});