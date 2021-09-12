import { Button, createMuiTheme, Grid, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, ThemeProvider } from "@material-ui/core";
import { PaletteOptions, useTheme } from "@components/ThemeProvider";
import { DoneRounded as SelectedIcon, PaletteRounded as PaletteIcon } from "@material-ui/icons";

export type ColorSchemaSelectorProps = {};

const ColorSchemaSelector = () => (
    <ListItem>
        <ListItemIcon>
            <PaletteIcon />
        </ListItemIcon>
        <ListItemText primary={"Custom color palette"} />
        <ListItemSecondaryAction>
            <Grid container spacing={1}>
                {Object.keys(PaletteOptions).map((key) => (
                    <ColorOption
                        key={`color-option-${key}`}
                        color={key}
                    />
                ))}
            </Grid>
        </ListItemSecondaryAction>
    </ListItem>
);

const ColorOption = (props: { color: string }) => {
    const { colorSchema, setColorSchema } = useTheme();
    const classes = useStyles();

    return (
        <Grid item>
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    primary: PaletteOptions[props.color],
                }
            })}>
                <Grid item>
                    <Button
                        color="primary"
                        className={classes.bubble}
                        variant="contained"
                        onClick={() => setColorSchema(props.color)}
                    >
                        {colorSchema === props.color && <SelectedIcon className={classes.icon} />}
                    </Button>
                </Grid>
            </ThemeProvider>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    bubble: {
        width: 24,
        height: 24,
        borderRadius: 12,
        boxShadow: theme.shadows[2],
        padding: 0,
        minWidth: 0,
    },
    icon: {
        width: 16,
        height: 16,
        margin: 4,
        fill: theme.palette.getContrastText(theme.palette.primary.main),
    },
}));

export default ColorSchemaSelector;