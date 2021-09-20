import AddItemFAB from "@components/AddItemFAB";
import { Fragment } from "react";
import { useKeycards } from "@components/KeycardProvider";
import SafeItem from "@components/SafeItem";
import NoSafeCreated from "@components/NoSafeCreated";
import { Container, Grid } from "@mui/material";

const MainPage = () => {
    const { keycards } = useKeycards();

    return (
        <Fragment>
            <Container maxWidth={"sm"} sx={{ pt: 2, pb: 2 }}>
                {keycards.length > 0 ? (
                    <Grid container spacing={2}>
                        {keycards.map(
                            (keycard) => (
                                <Grid item xs={12} key={`safe-item-${keycard.safe.id}`} >
                                    <SafeItem
                                        keycard={keycard}
                                    />
                                </Grid>
                            )
                        )}

                    </Grid>
                ) : (
                    <NoSafeCreated />
                )}
            </Container>
            <AddItemFAB />
        </Fragment>
    );
};

export default MainPage;