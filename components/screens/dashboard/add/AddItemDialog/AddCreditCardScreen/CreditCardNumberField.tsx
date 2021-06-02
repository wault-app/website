import { TextField, TextFieldProps } from "@material-ui/core";
import Payment from "payment";

export type CreditCardNumberFieldProps = TextFieldProps;

const CreditCardNumberField = (props: CreditCardNumberFieldProps) => (
    <TextField
        fullWidth
        variant={"outlined"}
        label={"Credit card number"}
        type={"tel"}
        inputProps={{
            pattern: "[\d| ]{16,22}",
        }}
        {...props}
        onChange={(e) => {
            e.target.value = formatCreditCardNumber(e.target.value);
            props.onChange(e);
        }}
        value={formatCreditCardNumber(typeof props.value === "string" ? props.value : "")}
    />
);

function clearNumber(value = "") {
    return value.replace(/\D+/g, "");
}

function formatCreditCardNumber(value: string) {
    if (!value) {
        return value;
    }

    const issuer = Payment.fns.cardType(value);
    const clearValue = clearNumber(value);
    let nextValue;

    switch (issuer) {
        case "amex":
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10
            )} ${clearValue.slice(10, 15)}`;
            break;
        case "dinersclub":
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10
            )} ${clearValue.slice(10, 14)}`;
            break;
        default:
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                8
            )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
            break;
    }

    return nextValue.trim();
}

export default CreditCardNumberField;