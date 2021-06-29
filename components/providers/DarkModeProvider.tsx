import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useEffect } from "react";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

export type DarkModeProviderProps = PropsWithChildren<{}>;

type ThemeType = "dark" | "light";

type DarkModeContextType = {
    theme: ThemeType;
    setTheme: Dispatch<SetStateAction<ThemeType>>;
};

export const useTheme = () => {
    const { theme, setTheme: updateTheme } = useContext(DarkModeContext);

    const setTheme = (theme: ThemeType) => {
        localStorage.setItem("theme", theme);
        updateTheme(theme);
    };

    return {
        theme, 
        setTheme,
    };
};

const DarkModeContext = createContext<DarkModeContextType>(null);

const DarkModeProvider = (props: DarkModeProviderProps) => {
    const [theme, setTheme] = useState<ThemeType>("light");
    
    useEffect(() => {
        const theme = localStorage.getItem("theme") === "dark" ? "dark" : "light";
        setTheme(theme);
    }, []);

    return (
        <DarkModeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={createMuiTheme(
                {
                    palette: {
                        type: theme,
                    },
                }
            )}>
                {props.children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;