import OpenPlatformButton from "./AccountDialog/OpenPlatformButton";
import CopyUsernameButton from "./AccountDialog/CopyUsernameButton";
import CopyPasswordButton from "./AccountDialog/CopyPasswordButton";
import { Menu, MenuProps } from "@material-ui/core";
import { AccountType } from "@lib/client/api/Item";

export type AccountMenuProps = MenuProps & {
    account: AccountType;
};

const AccountMenu = (props: AccountMenuProps) => {
    const { account: { username, password, platform } } = props;
    
    return (
        <Menu {...props}>
            <OpenPlatformButton
                platform={platform}
            />
            {!!username && (
                <CopyUsernameButton 
                    onCopy={() => props.onClose({}, "backdropClick")}
                    username={username}
                />
            )}
            {!!password && (
                <CopyPasswordButton
                    onCopy={() => props.onClose({}, "backdropClick")}
                    password={password}
                />
            )}
        </Menu>
    );
};

export default AccountMenu;