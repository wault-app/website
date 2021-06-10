import { Menu } from "@material-ui/core";
import { createContext, Dispatch, Fragment, PropsWithChildren, SetStateAction, useContext, useState } from "react";

export const useMenu = () => {
    const { setOpen, setComponent, setX, setY } = useContext(MenuContext);

    const open = (component: JSX.Element, event?: React.MouseEvent<HTMLDivElement>) => {
        setComponent(component);
        setX(event.clientX);
        setY(event.clientY);
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
    };

    return {
        open,
        close,
    };
};

type MenuContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    component: JSX.Element;
    setComponent: Dispatch<SetStateAction<JSX.Element>>;
    x: number;
    setX: Dispatch<SetStateAction<number>>;
    y: number;
    setY: Dispatch<SetStateAction<number>>;
};

const MenuContext = createContext<MenuContextType>(null);

const MenuProvider = ({ children }: PropsWithChildren<{}>) => {
    const [open, setOpen] = useState(false);
    const [component, setComponent] = useState(<Fragment />);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    return (
        <MenuContext.Provider value={{ open, setOpen, component, setComponent, x, setX, y, setY }}>
            <Menu
                keepMounted
                open={open}
                anchorReference="anchorPosition"
                anchorPosition={{
                    left: x,
                    top: y,
                }}
                onClose={() => setOpen(false)}
            >
                {component}
            </Menu>
            
            {children}
        </MenuContext.Provider>
    );
};

export default MenuProvider;

