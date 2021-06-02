import { CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { CreditCardType } from "../CreditCardDialog";

export type EnterCVCScreenProps = {
    onDecrypt: (data: CreditCardType) => any;
};

const EnterCVCScreen = ({ onDecrypt }: EnterCVCScreenProps) => {
    return (
        <CardContent>
            <Grid container alignItems={"center"} justifyContent={"center"}>
                <Grid item xs={12}>
                    <Typography variant={"h5"} gutterBottom>
                        Please enter your CVC!
                    </Typography>
                    <Typography>
                        This is required because of extra level of protection for credit/debit cards in our system.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={"tel"}
                        
                    />
                </Grid>
            </Grid>
        </CardContent>
    );
};

export default EnterCVCScreen;