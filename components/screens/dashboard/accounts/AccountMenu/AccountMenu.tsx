import { Menu, MenuProps } from "@material-ui/core";
import { AccountType } from "../AccountItem";
import { CopyUsernameButton, CopyPasswordButton, OpenPlatformButton } from "../AccountDialog";

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
                    username={username}
                />
            )}
            {!!password && (
                <CopyPasswordButton
                    password={password}
                />
            )}
        </Menu>
    );
};

export default AccountMenu;