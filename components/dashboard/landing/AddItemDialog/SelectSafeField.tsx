import { useKeycards } from "@components/providers/KeycardProvider";
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from "@material-ui/core";

export type SelectSafeFieldProps = SelectProps;

const SelectSafeField = (props: SelectSafeFieldProps) => {
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

export default SelectSafeField;