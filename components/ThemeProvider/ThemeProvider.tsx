import ProgressBar from "@components/ProgressBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, green, indigo, lightBlue, red, yellow } from "@mui/material/colors";
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
        palette: PaletteColorOptions;
    };
} = {
    lightBlue: {
        name: "Light blue",
        palette: lightBlue,
    },
    blue: {
        name: "Blue",
        palette: blue,
    },
    indigo: {
        name: "Indigo",
        palette: indigo,
    },
    red: {
        name: "Red",
        palette: red,
    },
    green: {
        name: "Green",
        palette: green,
    },
    yellow: {
        name: "Yellow",
        palette: yellow,
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
        const darkMode = localStorage.getItem("theme") === "dark";
        setDarkMode(darkMode);

        const colorSchema = localStorage.getItem("colorSchema");
        if(PaletteOptions[colorSchema]) setColorSchema(colorSchema);
    }, []);

    const { palette } = PaletteOptions[colorSchema || "lightBlue"];

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode, setColorSchema, colorSchema }}>
            <ThemeProvider theme={createTheme(
                {
                    palette: {
                        mode: darkMode ? "dark" : "light",
                        primary: palette,
                    },
                    components: {
                        MuiTextField: {
                            defaultProps: {
                                variant: "filled",
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