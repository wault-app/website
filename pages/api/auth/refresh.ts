import RefreshToken from "@lib/server/auth/RefreshToken";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";
import AccessToken from "@lib/server/auth/AccessToken";
import Cookies from "@lib/server/auth/Cookies";

export default wrapper(async (req, res) => {
    const schema = z.object({
        web: z.boolean(),
    });

    const { refreshToken, user } = await RefreshToken.refresh(req);
    const accessToken = await AccessToken.generate(user);
    const { web } = schema.parse(JSON.parse(req.body));

    if(web) {
        for(const cookie of Cookies.serialize(accessToken, refreshToken)) {
            res.setHeader("Set-Cookie", cookie);
        }
        
        return {
            message: "successful_refresh_token",
        };
    } else {
        return {
            message: "successful_refresh_token",
            data: {
                refreshToken,
                accessToken,
            },
        };
    }
});