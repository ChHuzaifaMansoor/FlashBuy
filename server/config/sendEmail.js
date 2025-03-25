import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RESEND_API) {
    console.error('RESEND_API is missing in the .env file');
    process.exit(1);
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const response = await resend.emails.send({
            from: 'FlashBuy <onboarding@resend.dev>', // Use a verified domain
            to: sendTo,
            subject,
            html,
        });

        console.log("Email Response:", response); // Debugging log

        if (response?.error) {
            console.error("Email Sending Error:", response.error);
            return null;
        }

        return response;
    } catch (error) {
        console.error("Unexpected Error in sendEmail:", error);
        return null;
    }
};

export default sendEmail;
