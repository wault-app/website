import WrapperError from "@wault/error";

const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const resp = await fetch(`https://api.wault.app${input}`, {
        ...init,
        credentials: "include",
    });
    if (!resp.ok) throw new WrapperError("service_unavailable");

    const data = await resp.json();
    if ("error" in data) throw new WrapperError(data.name);

    return data;
};

export default get;