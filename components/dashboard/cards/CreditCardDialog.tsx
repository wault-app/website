import { CreditCardType } from "@lib/client/api/Item";
import DecryptedCreditCardScreen from "./CreditCardDialog/DecryptedCreditCardScreen";

export type CreditCardDialogProps = {
    creditCard: CreditCardType;
};

const CreditCardDialog = (props: CreditCardDialogProps) => {
    return (
        <DecryptedCreditCardScreen
            creditCard={props.creditCard}
        />
    );
};

export default CreditCardDialog;