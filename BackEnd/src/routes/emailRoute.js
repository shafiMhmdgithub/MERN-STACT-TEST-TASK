
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Set up Nodemailer transporter
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });
// Reusable function to send emails
export const sendEmail = async (to, subject, message) => {
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to,
        subject,
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
