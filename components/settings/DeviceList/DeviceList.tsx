import Device, { DeviceType } from "@lib/api/Device";
import Placeholder from "@lib/placeholder";
import { Button, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import DeviceItem from "../DeviceItem";

export type DeviceListProps = {};

const DeviceList = (props: DeviceListProps) => {
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

    if (error) {
        return (
            <Grid
                container
                spacing={2}
                sx={{ margin: 2 }}
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
                    <Grid container justifyContent={"center"}>
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

    if (!devices) {
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
        <Fragment>
            {devices.map((device) => (
                <DeviceItem
                    key={`device-item-${device.id}`}
                    device={device}
                    onLogout={() => {}}
                />
            ))}
        </Fragment>
    );
};

export default DeviceList;