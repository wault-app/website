import { TextField, TextFieldProps } from "@mui/material";
import Payment from "payment";

export type CreditCardCVCTextFieldProps = TextFieldProps & {
    /**
     * Credit card number
     */
    number: string;
};

const CreditCardCVCTextField = (props: CreditCardCVCTextFieldProps) => {
    return (
        <TextField
            fullWidth
            label={"CVC / CVV"}
            autoComplete={"cc-csc"}
            {...props}
            value={props.value}
            onChange={(e) => {
                e.target.value = formatCVC(e.target.value, typeof props.value === "string" ? props.value : "", { number: props.number })
                props.onChange(e);
            }}
        />
    );
};

function clearNumber(value = "") {
    return value.replace(/\D+/g, "");
}

function formatCVC(value: string, prevValue: string, allValues: { number: string }) {
    const clearValue = clearNumber(value);
    let maxLength = 4;

    if (allValues.number) {
        const issuer = Payment.fns.cardType(allValues.number);
        maxLength = issuer === "amex" ? 4 : 3;
    }

    return clearValue.slice(0, maxLength);
}

export default CreditCardCVCTextField;