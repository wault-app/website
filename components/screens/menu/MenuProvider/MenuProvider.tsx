import { Menu } from "@material-ui/core";
import { createContext, Dispatch, Fragment, PropsWithChildren, SetStateAction, useContext, useState } from "react";

export const useMenu = () => {
    const { setOpen, setComponent, setAnchorEl } = useContext(MenuContext);

    const open = (component: JSX.Element, target?: HTMLElement) => {
        setComponent(component);
        setAnchorEl(target);
        setOpen(true);
    };

    return {
        open,
    };
};

type MenuContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    component: JSX.Element;
    setComponent: Dispatch<SetStateAction<JSX.Element>>;
    anchorEl: HTMLElement;
    setAnchorEl: Dispatch<SetStateAction<HTMLElement>>;
};

const MenuContext = createContext<MenuContextType>(null);

const MenuProvider = ({ children }: PropsWithChildren<{}>) => {
    const [open, setOpen] = useState(false);
    const [component, setComponent] = useState(<Fragment />);
    const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
    
    return (
        <MenuContext.Provider value={{ open, setOpen, component, setComponent, anchorEl, setAnchorEl }}>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => setOpen(false)}
            >
                {component}
            </Menu>
            
            {children}
        </MenuContext.Provider>
    );
};

export default MenuProvider;

