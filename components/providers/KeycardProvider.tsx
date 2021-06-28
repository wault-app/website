import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import Safe, { KeycardType } from "@lib/client/api/Safe";
import WrapperError from "@lib/server/error";
import ErrorScreen from "@components/dashboard/ErrorScreen";
import { Button, Container, Grid, List, ListSubheader } from "@material-ui/core";
import { useContext } from "react";
import { useEffect } from "react";
import VaultCard from "@components/dashboard/vault/VaultCard";
import { Skeleton } from "@material-ui/lab";
import AccountItem from "@components/dashboard/accounts/AccountItem";
import SafeItem from "@components/dashboard/vault/SafeItem";

export type KeycardProviderProps = PropsWithChildren<{}>;

type KeycardContextType = {
    keycards: KeycardType[];
    setKeycards: Dispatch<SetStateAction<KeycardType[]>>;
}

const KeycardContext = createContext<KeycardContextType>(null);

export const useKeycards = () => {
    const { keycards, setKeycards } = useContext(KeycardContext);

    /**
     * Add a keycard to already loaded ones
     * @param keycard a keycard object from the server
     */
    const addKeycard = (keycard: KeycardType) => {
        setKeycards([keycard, ...keycards]);
    };

    return {
        keycards,
        addKeycard,
    };
};

const KeycardProvider = (props: KeycardProviderProps) => {
    const [keycards, setKeycards] = useState<KeycardType[]>(null);
    const [error, setError] = useState<WrapperError>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            setError(null);
            const keycards = await Safe.getAll();
            setKeycards(keycards);
        } catch(e) {
            setError(e);
        }
    };

    if(error) { 
        return (
            <ErrorScreen
                error={error}
            >
                <Button onClick={load}>
                    Retry
                </Button>
            </ErrorScreen>
        );
    };

    if(!keycards) {
        return (
            <LoaderComponent />
        );
    }

    return (
        <KeycardContext.Provider value={{ keycards, setKeycards }}>
            {props.children}
        </KeycardContext.Provider>
    );
};

const LoaderComponent = () => (
        <Grid container>
            {[0, 0].map(() => (
                <Grid item xs={12}>
                    <SafeItem loading />
                </Grid>
            ))}
        </Grid>
);

export default KeycardProvider;