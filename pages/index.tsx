import AccountCard from "@components/screens/dashboard/accounts/AccountCard";
import PlatformIcon from "@components/screens/dashboard/platforms/PlatformIcon";
import { useEffect, useState } from "react";

const MainPage = () => {
    return (
        <AccountCard
            platform={"discorad.com"}
            username={"pepyta118@gmail.com"}
            categories={[]}
        />
    );
};

export default MainPage;