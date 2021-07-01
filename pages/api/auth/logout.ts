import Cookies from "@lib/server/auth/Cookies";
import User from "@lib/server/auth/User";
import config from "@lib/server/config";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";
import { serialize } from "cookie";

export default wrapper(async (req, res) => {
    const { deviceid } = await User.get(req);

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

    res.setHeader("Set-Cookie", Cookies.remove());

    return {
        message: "successfully_logged_out",
    };
});