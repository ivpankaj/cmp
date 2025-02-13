// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.EMAIL_SERVER_PORT === '465',
});

export async function sendVerificationEmail(
  to: string,
  verificationUrl: string
) {
  const emailTemplate = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #1a1a1a; text-align: center;">Verify Your Email</h1>
      <p>Thank you for signing up! Please click the button below to verify your email address:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">This link will expire in 24 hours. If you didn't request this verification, please ignore this email.</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Verify Your Email Address',
    html: emailTemplate,
  });
}