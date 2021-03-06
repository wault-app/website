import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import Safe from "@lib/api/Safe";
import ErrorScreen from "@components/screens/ErrorScreen";
import { Button, Container, Grid } from "@mui/material";
import { useContext } from "react";
import { useEffect } from "react";
import SafeItem from "@components/safe/SafeItem";
import Placeholder from "@lib/placeholder";
import { ItemType, KeycardType } from "@wault/typings";
import { useRSA } from "../RSAProvider";

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


    const addItem = (keycard: KeycardType, item: ItemType) => {
        setKeycards(
            [
                ...keycards.map(
                    (el) => (el.id === keycard.id ? {
                        ...keycard,
                        safe: {
                            ...keycard.safe,
                            items: [
                                item,
                                ...keycard.safe.items,
                            ],
                        },
                    } : el)
                )
            ]
        );
    };

    const addItems = (keycard: KeycardType, items: ItemType[]) => {
        setKeycards(
            [
                ...keycards.map(
                    (el) => (el.id === keycard.id ? {
                        ...keycard,
                        safe: {
                            ...keycard.safe,
                            items: [
                                ...items,
                                ...keycard.safe.items,
                            ],
                        },
                    } : el)
                )
            ]
        );
    };

    return {
        keycards,
        addKeycard,
        addItem,
        addItems,
    };
};

const KeycardProvider = (props: KeycardProviderProps) => {
    const [keycards, setKeycards] = useState<KeycardType[]>(null);
    const [error, setError] = useState<Error>(null);
    const { privateKey } = useRSA();

    const load = async () => {
        try {
            setError(null);
            const keycards = await Safe.getAll(privateKey);
            setKeycards(keycards);
        } catch(e) {
            setError(e);
        }
    };

    useEffect(() => {
        load();
    }, []);

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
    <Container maxWidth={"sm"} sx={{ pt: 2, pb: 2, overflowY: "hidden", maxHeight: "100vh" }}>
        <Grid container spacing={2}>
            {Placeholder.generate(10, 5).map((val, index) => (
                <Grid
                    item
                    xs={12}
                    key={`keycard-provider-loader-component-${index}`}
                >
                    <SafeItem loading />
                </Grid>
            ))}
        </Grid>
    </Container>
);

export default KeycardProvider;