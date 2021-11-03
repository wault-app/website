import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";

export type VerticalCenterProps = PropsWithChildren<{}>;

const VerticalCenter = (props: VerticalCenterProps) => (
    <Grid sx={{ height: "100%" }} container alignItems={"center"} justifyContent={"center"}>
        <Grid item>
            {props.children}
        </Grid>
    </Grid>
);

export default VerticalCenter;