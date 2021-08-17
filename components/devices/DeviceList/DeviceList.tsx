import Device, { DeviceType } from "@lib/api/Device";
import Placeholder from "@lib/placeholder";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { AutoSizer, List as VirtualizedList } from "react-virtualized";
import DeviceItem from "../DeviceItem";

export type DeviceListProps = {};

const DeviceList = (props: DeviceListProps) => {
    const classes = useStyles();

    const [devices, setDevices] = useState<DeviceType[]>();
    const [error, setError] = useState<Error>();

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
                {Placeholder.generate(3, 2).map((index) => (
                    <DeviceItem
                        loading
                        key={`device-item-placeholder-${index}`}
                    />
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
                            key={`device-item-${index}`}
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