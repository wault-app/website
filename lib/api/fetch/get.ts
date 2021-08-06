const get = async <T = {}>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const resp = await fetch(`https://server.wault.app${input}`, {
        ...init,
        credentials: "include",
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message);

    return data;
};

export default get;