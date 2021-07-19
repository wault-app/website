import RefreshToken from "@lib/server/auth/RefreshToken";
import wrapper from "@lib/server/wrapper";
import { z } from "zod";
import AccessToken from "@lib/server/auth/AccessToken";
import Cookies from "@lib/server/auth/Cookies";

export default wrapper(async (req, res) => {
    const schema = z.object({
        web: z.boolean(),
    });

    const { refreshToken, user, device } = await RefreshToken.refresh(req);
    const accessToken = await AccessToken.generate({
        id: user.id,
        username: user.username,
        email: user.email,
        deviceid: device.id,
    });
    
    const { web } = schema.parse(JSON.parse(req.body));

    if(web) {
        res.setHeader("Set-Cookie", Cookies.serialize(accessToken, refreshToken));
        
        return {
            message: "successful_refresh_token",
        };
    } else {
        return {
            message: "successful_refresh_token",
            refreshToken,
            accessToken,
        };
    }
});