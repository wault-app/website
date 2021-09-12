import { TextField, TextFieldProps } from "@material-ui/core";

export type CreditCardExperiationDateTextFieldProps = TextFieldProps;

const CreditCardExperiationDateTextField = (props: CreditCardExperiationDateTextFieldProps) => (  
    <TextField
        type={"tel"}
        fullWidth
        autoComplete={"cc-exp"}
        variant={"outlined"}
        label={"Expiration date"}
        {...props}
        value={formatExpirationDate(typeof props.value === "string" ? props.value : "")}
        onChange={(e) => {
            e.target.value = formatExpirationDate(e.target.value);
            props.onChange(e);
        }}
        inputProps={{
            ...props?.inputProps,
            pattern: "(?:0[1-9]|1[0-2])/[0-9]{2}",
        }}
    />
);

function clearNumber(value = "") {
    return value.replace(/\D+/g, "");
}

function formatExpirationDate(value: string) {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
}


export default CreditCardExperiationDateTextField;