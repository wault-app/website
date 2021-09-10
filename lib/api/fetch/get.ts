export const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "https://server.wault.app";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    try {
        const resp = await fetch(`${ENDPOINT}${input}`, {
            ...init,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...init?.headers,
            },
        });
    
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.message);
    
        return data;
    } catch(e) {
        if(e.message === "jwt_token_expired") {
            await get("/auth/refresh_token", {
                method: "POST",
            });

            return await get(input, init);
        } else throw e;
    }
};

export default get;