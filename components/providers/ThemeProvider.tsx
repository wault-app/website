import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue, green, indigo, lightBlue, red, yellow } from "@material-ui/core/colors";
import { PaletteColorOptions } from "@material-ui/core/styles/createPalette";
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
    [key: string]: PaletteColorOptions;
} = {
    lightBlue,
    blue,
    indigo,
    red,
    green,
    yellow,
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

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode, setColorSchema, colorSchema }}>
            <ThemeProvider theme={createMuiTheme(
                {
                    palette: {
                        type: darkMode ? "dark" : "light",
                        primary: PaletteOptions[colorSchema] || lightBlue,
                    },
                    props: {
                        MuiTextField: {
                            variant: "outlined",        
                        },
                    },
                }
            )}>
                {props.children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;