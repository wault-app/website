import Icon from "@components/images/Icon";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export type LoaderScreenProps = {};

// TODO: rotation
const LoaderScreen = (props: LoaderScreenProps) => {
    return (
        <Grid
            container
            sx={{ height: "100%" }}
            alignItems={"center"}
        >
            <Grid item xs={12}>
                <Grid container justifyContent={"center"}>
                    <Grid item>
                        <Box sx={{
                            maxWidth: "100%",
                        }}>
                            <Icon
                                width={156}
                                height={156}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LoaderScreen;