import AddItemFAB from "@components/dashboard/landing/AddItemFAB";
import { Fragment } from "react";
import { useKeycards } from "@components/providers/KeycardProvider";
import SafeItem from "@components/safes/SafeItem";
import NoSafeCreated from "@components/placeholders/NoSafeCreated";
import { Container } from "@material-ui/core";

const MainPage = () => {
    const { keycards } = useKeycards();

    return (
        <Fragment>
            <Container maxWidth={"md"}>
                {keycards.length > 0 ? (
                    keycards.map((keycard) => (
                        <SafeItem
                            key={`safe-item-${keycard.safe.id}`} 
                            keycard={keycard}
                        />
                    ))
                ) : (
                    <NoSafeCreated />
                )}
            </Container>
            <AddItemFAB />
        </Fragment>
    );
};

export default MainPage;