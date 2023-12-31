import nodemailer from 'nodemailer';
import User from '@/models/userModel';

export const sendEmail = async({message, subject, userId}: any) => {
    try{
        const user = await User.findById(userId);

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_ID,
            to: user.email,
            subject: subject,
            html: `<p>${message}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}