import RedirectInProgressScreen from "@components/common/RedirectInProgressScreen";
import { useRouter } from "next/router";
import { createContext, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useContext } from "react";
import { PropsWithChildren } from "react";

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

const RSAProvider = (props: RSAProviderProps) => {
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    
    const router = useRouter();
    
    if((!privateKey || !publicKey) && router.pathname !== "/auth/signin") {
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