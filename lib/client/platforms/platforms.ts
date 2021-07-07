import DiscordIcon from "@components/platforms/DiscordIcon";
import LastPassIcon from "@components/platforms/LastPassIcon";
import { SvgIconProps } from "@material-ui/core";
import { CategoryType } from "../categories";

type IconType = {
    color: string;
    badge: (props: SvgIconProps) => JSX.Element;
};

type PlatformType = {
    name: string;
    hostname: string;
    categories: CategoryType[];
    icon?: IconType;
};

const platforms: {
    [key: string]: PlatformType;
} = {
    "discord.com": {
        name: "Discord",
        categories: ["games", "social"],
        hostname: "discord.com",
        icon: {
            color: "#5865F2",
            badge: DiscordIcon,
        },
    },
    "lastpass.com": {
        name: "LastPass",
        categories: ["work"],
        hostname: "lastpass.com",
        icon: {
            color: "#D32D27",
            badge: LastPassIcon, 
        },
    }
};

const aliases: {
    [key: string]: keyof typeof platforms;
} = {
    "discordapp.com": "discord.com",
};

export default class Platforms {
    /**
     * Gets a selected platforms data
     * @param url 
     */
    public static get(url: string): PlatformType {
        const categories: CategoryType[] = [];
        
        const fallback = {
            name: url,
            categories,
            hostname: url,
        };

        return platforms[url] || platforms[aliases[url]] || fallback;
    }
}