import { useKeycards } from "@components/providers/KeycardProvider";
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from "@material-ui/core";

export type SelectSafeFieldProps = SelectProps;

const SelectSafeField = (props: SelectSafeFieldProps) => {
    const { keycards } = useKeycards();

    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel>Safe</InputLabel>
            <Select
                {...props}
            >
                {keycards.map(
                    (keycard) => (
                        <MenuItem
                            id={`keycard-item-${keycard.safe.id}`}
                            value={keycard.safe.id}
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