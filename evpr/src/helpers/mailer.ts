import nodemailer from 'nodemailer';
import User from '@/models/userModel';

export const sendEmail = async({eventReportPCent, userId}: any) => {
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
            subject: "Report on your event!",
            html: `<p>This is to inform you that of all the people who have viewed your event, ${eventReportPCent}% have reported it. Please modify your event to make it more appropriate for the platform.
            Also, if the event is reported by more than 50% of the users, your event will be deleted automatically!</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}