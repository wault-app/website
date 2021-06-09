import { Button, Dialog, DialogActions, DialogActionsProps, DialogProps, useMediaQuery, useTheme } from "@material-ui/core";
import { createContext, Dispatch, Fragment, PropsWithChildren, SetStateAction, useContext, useState } from "react";

type DialogPropsWithoutOpen = Omit<DialogProps, "open">;

export const useDialog = () => {
    const { setOpen, setComponent, setProps } = useContext(DialogContext);

    const open = (component: JSX.Element, props?: DialogPropsWithoutOpen) => {
        setComponent(component);

        setProps(props || {});
        setOpen(true);
    };

    const close = () => setOpen(false);

    return {
        open,
        close,
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

export const DialogFooter = (props: DialogActionsProps) => {
    const { close } = useDialog();

    return (
        <DialogActions {...props}>
            <Button autoFocus onClick={close} color="primary">
                Close
            </Button>
            {props.children}
        </DialogActions>
    );
}
const DialogProvider = ({ children }: PropsWithChildren<{}>) => {
    const [open, setOpen] = useState(false);
    const [component, setComponent] = useState(<Fragment />);
    const [props, setProps] = useState<DialogPropsWithoutOpen>({});

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <DialogContext.Provider value={{ open, setOpen, component, setComponent, props, setProps }}>
            <Dialog
                fullWidth
                maxWidth={"md"}
                fullScreen={fullScreen}
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

