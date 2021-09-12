import AddItemFAB from "@components/AddItemFAB";
import { Fragment } from "react";
import { useKeycards } from "@components/KeycardProvider";
import SafeItem from "@components/SafeItem";
import NoSafeCreated from "@components/NoSafeCreated";
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