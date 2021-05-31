import DiscordIcon from "@components/platforms/DiscordIcon";
import { SvgIconProps } from "@material-ui/core";

const categories = {
    work: {
        name: "Work",
    },
    communication: {
        name: "Communication",
    },
    games: {
        name: "Games",
    },
    financial: {
        name: "Financial",
    },
    social: {
        name: "Social"
    },
    entertainment: {
        name: "Entartainment",
    },
    shopping: {
        name: "Shopping",
    },
    education: {
        name: "Education",
    },
} as const;

type CategoryType = keyof typeof categories;
type IconType = {
    color: string;
    badge: (props: SvgIconProps) => JSX.Element;
};

type PlatformType = {
    name: string;
    categories: CategoryType[];
    icon?: IconType;
};

const platforms: {
    [key: string]: PlatformType;
} = {
    "discord.com": {
        name: "Discord",
        categories: ["games", "social"],
    },
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
    public static get(url: string) {
        return platforms[url] || platforms[aliases[url]];
    }
}