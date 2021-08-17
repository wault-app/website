import OpenPlatformButton from "../OpenPlatformButton";
import CopyUsernameButton from "../CopyUsernameButton";
import CopyPasswordButton from "../CopyPasswordButton";
import { Menu, MenuProps } from "@material-ui/core";
import { AccountType } from "@wault/typings";

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