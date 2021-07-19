import SendGrid from "@sendgrid/mail";

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export default SendGrid;