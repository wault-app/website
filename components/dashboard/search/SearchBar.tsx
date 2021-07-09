import { Container, InputBase, InputBaseProps, makeStyles } from "@material-ui/core";
import { SearchRounded as SearchIcon } from "@material-ui/icons";

export type SearchBarProps = InputBaseProps;

const SearchBar = (props: SearchBarProps) => {
    const classes = useStyles();

    return (
        <Container maxWidth={"sm"} className={classes.container}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    {...props}
                />
            </div>
        </Container>
    );
};

const useStyles = makeStyles((theme) => (
    {
        container: {
            marginTop: theme.spacing(2),
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            width: "100%",
            background: theme.palette.background.paper,
            marginLeft: 0,
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
            paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            transition: theme.transitions.create("width"),
            width: "100%",
        },
    }
));

export default SearchBar;