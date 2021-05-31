import PlatformIcon from "@components/screens/dashboard/platforms/PlatformIcon";
import { useEffect, useState } from "react";

const MainPage = () => {
    const [hostname, setHostname] = useState<string>();

    useEffect(() => {
        setTimeout(() => {
            setHostname("discord.com");
        }, 2000);
    }, []);

    if(!hostname) {
        return (
            <PlatformIcon
                loading
            />
        );
    }

    return (
        <PlatformIcon
            hostname={hostname}
        />
    );
};

export default MainPage;