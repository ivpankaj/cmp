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
    <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <!-- Header Section -->
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a1a1a; font-size: 28px; font-weight: bold; margin: 0;">cookmypapers welcomes you!! ☺️</h1>
        <p style="color: #666; font-size: 16px; margin-top: 10px;">Please verify your email address to get started.</p>
      </div>

      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center;">
        <p style="font-size: 18px; color: #333; line-height: 1.6;">
          Thank you for signing up! To complete your registration, please click the button below to verify your email address.
        </p>

        <!-- Call-to-Action Button -->
        <div style="margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #3498db; color: white; font-size: 18px; font-weight: bold; text-decoration: none; padding: 14px 30px; border-radius: 8px; transition: background-color 0.3s ease;">
            Verify Your Email
          </a>
        </div>

        <!-- Additional Info -->
        <p style="font-size: 14px; color: #888; line-height: 1.6;">
          This link will expire in <strong>24 hours</strong>. If you didn't request this verification, please ignore this email or contact our support team.
        </p>
      </div>

      <!-- Footer Section -->
      <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #aaa;">
        <p>&copy; 2025 cookmypapers All rights reserved.</p>
        <p>
          If you have any questions, feel free to reach out to us at 
          <a href="mailto:mohiteteena@gmail.com" style="color: #3498db; text-decoration: none;">mohiteteena@gmail.com</a>.
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Verification@cookmypapers',
    html: emailTemplate,
  });
}