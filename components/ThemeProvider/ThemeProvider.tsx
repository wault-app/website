import ProgressBar from "@components/ProgressBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { amber, blue, deepPurple, green, indigo, lightBlue, lightGreen, orange, purple, red, yellow } from "@mui/material/colors";
import { PaletteColorOptions } from "@mui/material/styles/createPalette";
import { useEffect } from "react";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
export type DarkModeProviderProps = PropsWithChildren<{}>;

type DarkModeContextType = {
    darkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
    colorSchema: string;
    setColorSchema: Dispatch<SetStateAction<string>>;
};

export const PaletteOptions: {
    [key: string]: {
        name: string;
        primary: PaletteColorOptions;
        secondary: PaletteColorOptions;
    };
} = {
    lightBlue: {
        name: "Light blue",
        primary: lightBlue,
        secondary: indigo,
    },
    blue: {
        name: "Blue",
        primary: blue,
        secondary: purple,
    },
    indigo: {
        name: "Indigo",
        primary: indigo,
        secondary: deepPurple,
    },
    red: {
        name: "Red",
        primary: red,
        secondary: amber,
    },
    green: {
        name: "Green",
        primary: green,
        secondary: lightGreen,
    },
    yellow: {
        name: "Yellow",
        primary: yellow,
        secondary: orange,
    },
};

export const useTheme = () => {
    const { darkMode, setDarkMode: updateTheme, colorSchema, setColorSchema: updateColorSchema } = useContext(DarkModeContext);

    const setDarkMode = (darkMode: boolean) => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        updateTheme(darkMode);
    };

    const setColorSchema = (colorSchema: string) => {
        localStorage.setItem("colorSchema", 
            Object.keys(PaletteOptions).find(
                (key) => key === colorSchema
            )
        );

        updateColorSchema(colorSchema);
    };

    return {
        darkMode, 
        setDarkMode,
        colorSchema,
        setColorSchema,
    };
};

const DarkModeContext = createContext<DarkModeContextType>(null);

const DarkModeProvider = (props: DarkModeProviderProps) => {
    const [darkMode, setDarkMode] = useState(false);
    const [colorSchema, setColorSchema] = useState<string>("lightBlue");
    
    useEffect(() => {
        const browserDefault = window?.matchMedia('(prefers-color-scheme: dark)')?.matches;
        const userPrefered = localStorage.getItem("theme") ? localStorage.getItem("theme") === "dark" : undefined;

        setDarkMode(userPrefered || browserDefault || true);

        const colorSchema = localStorage.getItem("colorSchema");
        if(PaletteOptions[colorSchema]) setColorSchema(colorSchema);
    }, []);

    const { primary, secondary } = PaletteOptions[colorSchema || "lightBlue"];

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode, setColorSchema, colorSchema }}>
            <ThemeProvider theme={createTheme(
                {
                    palette: {
                        mode: darkMode ? "dark" : "light",
                        primary,
                        secondary,
                    },
                    components: {
                        MuiTextField: {
                            defaultProps: {
                                variant: "filled",
                            },
                        },
                        MuiFormControl: {
                            defaultProps: {
                                variant: "filled",
                            },
                        },
                        MuiListSubheader: {
                            styleOverrides: {
                                root: {
                                    background: "transparent",
                                },
                            },
                        },
                    },
                }
            )}>
                <ProgressBar />
                {props.children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;