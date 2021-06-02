import { MenuProps } from "@material-ui/core";
import { AccountType } from "./AccountItem";
import { CopyUsernameButton, CopyPasswordButton, OpenPlatformButton } from "./AccountDialog";
import { Fragment } from "react";

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