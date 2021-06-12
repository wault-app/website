import WrapperError from "@lib/server/error";

type ResponseType<T> = {
    message?: string;
    data: T;
};

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<ResponseType<T>> => {
    const resp = await fetch(`/api${input}`, init);
    if(!resp.ok) throw new WrapperError("service_unavailable");

    const data = await resp.json();
    if("error" in data) throw new WrapperError(data.message);

    return data;
};

export default get;