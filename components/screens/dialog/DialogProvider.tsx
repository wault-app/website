import { Dialog, DialogProps } from "@material-ui/core";
import { createContext, Dispatch, Fragment, PropsWithChildren, SetStateAction, useContext, useState } from "react";

type DialogPropsWithoutOpen = Omit<DialogProps, "open">;

export const useDialog = () => {
    const { setOpen, setComponent, setProps } = useContext(DialogContext);

    const open = (component: JSX.Element, props?: DialogPropsWithoutOpen) => {
        setComponent(component);

        setProps(props || { });
        setOpen(true);
    };

    return {
        open
    };
};

type DialogContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    component: JSX.Element;
    setComponent: Dispatch<SetStateAction<JSX.Element>>;
    props: DialogPropsWithoutOpen;
    setProps: Dispatch<SetStateAction<DialogPropsWithoutOpen>>;
};

const DialogContext = createContext<DialogContextType>(null);

const DialogProvider = ({ children }: PropsWithChildren<{}>) => {
    const [open, setOpen] = useState(false);
    const [component, setComponent] = useState(<Fragment />);
    const [props, setProps] = useState<DialogPropsWithoutOpen>({});
    
    return (
        <DialogContext.Provider value={{ open, setOpen, component, setComponent, props, setProps }}>
            <Dialog
                fullWidth
                maxWidth={"md"}
                style={{
                    backdropFilter: "blur(4px)"
                }}
                {...props}
                open={open}
                onClose={() => setOpen(false)}
            >
                {component}
            </Dialog>
            
            {children}
        </DialogContext.Provider>
    );
};

export default DialogProvider;

