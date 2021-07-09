import Device, { DeviceType } from "@lib/client/api/Device";
import WrapperError from "@lib/server/error";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { AutoSizer, List as VirtualizedList } from "react-virtualized";
import DeviceItem from "./DeviceItem";

export type DeviceListProps = {};

const DeviceList = (props: DeviceListProps) => {
    const classes = useStyles();

    const [devices, setDevices] = useState<DeviceType[]>();
    const [error, setError] = useState<WrapperError>();

    const load = async () => {
        try {
            setError(null);
            const { devices } = await Device.getAll();
            setDevices(devices);
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        load();
    }, []);

    if(error) {
        return (
            <Grid
                container
                spacing={2}
                className={classes.root}
            >
                <Grid item xs={12}>
                    <Typography variant={"h5"}>
                        Failed to load your devices
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {error.message}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify={"center"}>
                        <Grid item>
                            <Button
                                onClick={() => load()}
                                variant={"outlined"}
                                color={"primary"}
                            >
                                Click here to retry
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    if(!devices) {
        return (
            <Fragment>
                {[0, 0, 0, 0].map(() => (
                    <DeviceItem loading />
                ))}
            </Fragment>
        );
    }

    return (
        <AutoSizer disableHeight>
            {({ width }) => (
                <VirtualizedList
                    height={devices.length * 72}
                    overscanRowCount={10}
                    rowHeight={72}
                    width={width}
                    rowCount={devices.length}
                    rowRenderer={({ index }) => (
                        <DeviceItem
                            device={devices[index]}
                            onLogout={
                                (device) => setDevices(
                                    [...devices].filter(
                                        (el) => el.id !== device.id
                                    )
                                )
                            }
                        />
                    )}
                />
            )}
        </AutoSizer>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2)
    },
}));

export default DeviceList;