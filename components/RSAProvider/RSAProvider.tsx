import RedirectInProgressScreen from "@components/RedirectInProgressScreen";
import { useRouter } from "next/router";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

export const useRSA = () => {
    return useContext(RSAContext);
};

const RSAContext = createContext<{
    publicKey: string;
    setPublicKey: Dispatch<SetStateAction<string>>;
    privateKey: string;
    setPrivateKey: Dispatch<SetStateAction<string>>;
}>(null);

export type RSAProviderProps = PropsWithChildren<{}>;
const EXCLUDED = ["/auth/signin", "/auth/register", "/auth/register/confirm"];

const RSAProvider = (props: RSAProviderProps) => {
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    
    const router = useRouter();
    
    if((!privateKey || !publicKey) && !EXCLUDED.includes(router.pathname)) {
        router.push("/auth/signin");

        return (
            <RedirectInProgressScreen />
        );
    }

    return (
        <RSAContext.Provider value={{ publicKey, privateKey, setPublicKey, setPrivateKey }}>
            {props.children}
        </RSAContext.Provider>
    );
};

export default RSAProvider;