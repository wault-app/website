import { Dialog } from "@material-ui/core";
import { createContext, Dispatch, Fragment, PropsWithChildren, SetStateAction, useContext, useState } from "react";

export const useDialog = () => {
    const { setOpen, setComponent } = useContext(DialogContext);

    return {
        setOpen,
        setComponent,
    };
};

type DialogContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setComponent: Dispatch<SetStateAction<JSX.Element>>;
};

const DialogContext = createContext<DialogContextType>(null);

const DialogProvider = ({ children }: PropsWithChildren<{}>) => {
    const [open, setOpen] = useState(false);
    const [component, setComponent] = useState(<Fragment />);
    
    return (
        <DialogContext.Provider value={{ open, setOpen, setComponent }}>
            <Dialog
                open={open}
                fullWidth
                maxWidth={"md"}
                onClose={() => setOpen(false)}
                style={{
                    backdropFilter: "blur(4px)"
                }}
            >
                {component}
            </Dialog>
            
            {children}
        </DialogContext.Provider>
    );
};

export default DialogProvider;

