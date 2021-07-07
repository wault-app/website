import AddItemFAB from "@components/dashboard/landing/AddItemFAB";
import { Fragment } from "react";
import { useKeycards } from "@components/providers/KeycardProvider";
import SafeItem from "@components/dashboard/vault/SafeItem";

const MainPage = () => {
    const { keycards } = useKeycards();
    
    return (
        <Fragment>
            {keycards.map((keycard) => (
                <SafeItem 
                    keycard={keycard}
                />
            ))}
            <AddItemFAB />
        </Fragment>
    );
};

export default MainPage;