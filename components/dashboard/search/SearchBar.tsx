import { Container, InputBase, InputBaseProps, makeStyles, Paper } from "@material-ui/core";
import { SearchRounded as SearchIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSearch } from "./SearchProvider";

export type SearchBarProps = InputBaseProps;

const SearchBar = (props: SearchBarProps) => {
    const classes = useStyles();
    const [proxy, setProxy] = useState("");
    const { setValue } = useSearch();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setValue(proxy);
        }, 500)
    
        return () => clearTimeout(delayDebounceFn);
      }, [proxy]);

    return (
        <Container maxWidth={"sm"} className={classes.container}>
            <Paper className={classes.search}>
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
                    value={proxy}
                    onChange={(e) => {
                        setProxy(e.target.value)
                    }}
                />
            </Paper>
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
            width: "100%"
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            transition: theme.transitions.create("width"),
            width: "100%",
        },
    }
));

export default SearchBar;