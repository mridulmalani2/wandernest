import nodemailer from 'nodemailer'

// Create transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"WanderNest" <noreply@wandernest.com>',
      to: email,
      subject: 'Your WanderNest Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Welcome to WanderNest!</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 1 hour.</p>
          <p style="color: #6B7280; font-size: 14px; margin-top: 40px;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
      `,
    })
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}
