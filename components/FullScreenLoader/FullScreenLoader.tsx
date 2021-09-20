import Icon from "@components/Icon";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export type FullScreenLoaderProps = {};

// TODO: rotation
const FullScreenLoader = (props: FullScreenLoaderProps) => {
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

export default FullScreenLoader;