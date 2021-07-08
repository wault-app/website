import Device, { DeviceType } from "@lib/client/api/Device";
import { List } from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import { AutoSizer, List as VirtualizedList } from "react-virtualized";
import DeviceItem from "./DeviceItem";

export type DeviceListProps = {};

const DeviceList = (props: DeviceListProps) => {
    const [devices, setDevices] = useState<DeviceType[]>();

    const load = async () => {
        try {
            const { devices } = await Device.getAll()
            setDevices(devices);
        } catch (e) {

        }
    };

    useEffect(() => {
        load();
    }, []);

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

export default DeviceList;