import User from "@lib/server/auth/User";
import wrapper from "@lib/server/wrapper";

export default wrapper(async (req) => {
    const user = await User.get(req);

    return {
        data: {
            id: user.id,
            username: user.username,
        },
    };
});