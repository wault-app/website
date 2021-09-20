import { useKeycards } from "@components/KeycardProvider";
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from "@mui/material";

export type SafeSelectorProps = SelectProps;

const SafeSelector = (props: SafeSelectorProps) => {
    const { keycards } = useKeycards();

    return (
        <FormControl
            variant="outlined"
            fullWidth
        >
            <InputLabel>Safe</InputLabel>
            <Select
                {...props}
                label={"Safe"}
            >
                {keycards.map(
                    (keycard) => (
                        <MenuItem
                            id={`keycard-item-${keycard.safe.id}`}
                            value={keycard.safe.id}
                            key={`keycard-item-${keycard.safe.id}`}
                        >
                            {keycard.safe.name}
                        </MenuItem>
                    )
                )}
            </Select>
        </FormControl>
    );
};

export default SafeSelector;