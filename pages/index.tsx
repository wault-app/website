import AddItemFAB from "@components/dashboard/landing/AddItemFAB";
import { Fragment } from "react";
import { useKeycards } from "@components/providers/KeycardProvider";
import SafeItem from "@components/dashboard/vault/SafeItem";
import NoSafeCreated from "@components/dashboard/placeholders/NoSafeCreated";
import SearchBar from "@components/dashboard/search/SearchBar";

const MainPage = () => {
    const { keycards } = useKeycards();
    
    return (
        <Fragment>
            <SearchBar />
            {keycards.length > 0 ? (
                keycards.map((keycard) => (
                    <SafeItem 
                        keycard={keycard}
                    />
                ))
            ) : (
                <NoSafeCreated />
            )}
            <AddItemFAB />
        </Fragment>
    );
};

export default MainPage;