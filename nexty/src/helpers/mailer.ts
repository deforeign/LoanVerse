import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {

        // Create a transporter
        console.log("🔥 sendEmail HIT");

        const hashedToken = await bcrypt.hash(userId.toString(),10);

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "daa1a9a58320be",
                pass: "864ffaebeab1de"
            }
        });
        let mailOptions={};
        if(emailType==='VERIFY'){
            mailOptions = {
                from: 'soumyajeetghatak@gmail.com',
                to: email,
                subject:'Verify your email',
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} or copy and paste the link in your browser </p>`
            };
        } else if(emailType==='RESET'){
            mailOptions = {
                from: 'soumyajeetghatak@gmail.com',
                to: email,
                subject:'Reset your password',
                html: `<p>Click <a href="${process.env.DOMAIN}/resetemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} or copy and paste the link in your browser </p>`
            };
        }

        

        const mailResponse = await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully:', mailResponse);
        return mailResponse;

    } catch (error) {
        throw new Error('Email sending failed');
    }
}
