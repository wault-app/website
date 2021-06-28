import User from "@lib/server/auth/User";
import prisma from "@lib/server/prisma";
import wrapper from "@lib/server/wrapper";

export default wrapper(async (req) => {
    const user = await User.get(req);
    
    const devices = await prisma.device.findMany({
        where: {
            userid: user.id,
        },
        select: {
            id: true,
            name: true,
            loggedInAt: true,
            rsaKey: true,
        },
    });

    return {
        devices,
    };
});