import { createTheme, Dialog, DialogProps, DialogTitle, List, ListItem, ListItemIcon, ListItemText, ThemeProvider } from "@mui/material";
import { PaletteOptions, useTheme } from "@components/providers/ThemeProvider";
import PaletteIcon from "@mui/icons-material/PaletteRounded";
import { Fragment, useState } from "react";

export type ColorSchemaSelectorProps = {};

const ColorSchemaSelector = () => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <ColorSchemaDialog
                open={open}
                onClose={() => setOpen(false)}
            />
            <ListItem button onClick={() => setOpen(true)}>
                <ListItemIcon>
                    <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary={"Custom color palette"} />
            </ListItem>
        </Fragment>
    );
};

const ColorSchemaDialog = (props: DialogProps) => {
    return (
        <Dialog maxWidth={"sm"} fullWidth {...props}>
            <DialogTitle>
                Select a color palette!
            </DialogTitle>
            <List>
                {Object.keys(PaletteOptions).map((key) => (
                    <ColorOption
                        key={`color-option-${key}`}
                        color={key}
                        onClose={() => props.onClose({}, "escapeKeyDown")}
                    />
                ))}
            </List>
        </Dialog>
    );
};

const ColorOption = (props: { color: string; onClose: () => void }) => {
    const { setColorSchema } = useTheme();

    const { primary, name } = PaletteOptions[props.color];

    const setColor = () => {
        setColorSchema(props.color);
        props.onClose();
    }

    return (
        <ListItem
            button
            onClick={() => setColor()}
        >
            <ThemeProvider theme={createTheme({
                palette: {
                    primary,
                }
            })}>
                <ListItemText
                    primary={name}
                />
            </ThemeProvider>
        </ListItem>
    );
};

export default ColorSchemaSelector;