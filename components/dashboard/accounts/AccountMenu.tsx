import { AccountType } from "./AccountItem";
import { Fragment } from "react";
import OpenPlatformButton from "./AccountDialog/OpenPlatformButton";
import CopyUsernameButton from "./AccountDialog/CopyUsernameButton";
import CopyPasswordButton from "./AccountDialog/CopyPasswordButton";

export type AccountMenuProps = {
    account: AccountType;
};

const AccountMenu = ({ account: { username, password, platform } }: AccountMenuProps) => {
    return (
        <Fragment>
            <OpenPlatformButton
                platform={platform}
            />
            {!!username && (
                <CopyUsernameButton 
                    username={username}
                />
            )}
            {!!password && (
                <CopyPasswordButton
                    password={password}
                />
            )}
        </Fragment>
    );
};

export default AccountMenu;