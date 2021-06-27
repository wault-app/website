import WrapperError from "@lib/server/error";
import RefreshToken from "../RefreshToken";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    try {
        const resp = await fetch(`/api${input}`, init);
        if(!resp.ok) throw new WrapperError("service_unavailable");
    
        const data = await resp.json();
        if("error" in data) throw new WrapperError(data.message);
    
        return data;
    } catch(e) {
        if(e instanceof WrapperError && e.message === "jwt_token_expired") {
            await RefreshToken.refresh();
            return await get(input, init);
        } else {
            throw e;
        }
    }
};

export default get;