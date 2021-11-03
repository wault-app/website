import { Avatar, AvatarProps } from "@mui/material";
import { UserType } from "@wault/typings";

export type UserIconProps = {
    user: UserType;
} & AvatarProps;

const UserIcon = (props: UserIconProps) => {
    if(!props.user.icon) {
        return (
            <Avatar 
                {...props}
            >
                😀
            </Avatar>
        );
    }

    if(props.user.icon.type === "EMOJI") {
        return (
            <Avatar {...props}>
                {props.user.icon.value}
            </Avatar>
        );
    }
    
    return (
        <Avatar
            {...props}
            alt={props.user.username}
            src={props.user.icon.value}
        />
    );
};

export default UserIcon;