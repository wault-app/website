import get from "./get";

const post = async <T = {}>(input: RequestInfo, init?: RequestInit) => {
    const resp = await get<T>(input, {
        ...init,
        method: "POST",
    });

    return resp;
};

export default post;