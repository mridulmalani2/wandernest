import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendAdminNotification(report: {
  id: string
  type: string
  reportedUserId: string
  reportedBy: string
  description: string
}) {
  const subject = `🚨 URGENT: ${report.type} Report - WanderNest`
  const html = `
    <h2>Urgent Report Notification</h2>
    <p><strong>Report Type:</strong> ${report.type}</p>
    <p><strong>Report ID:</strong> ${report.id}</p>
    <p><strong>Reported User ID:</strong> ${report.reportedUserId}</p>
    <p><strong>Reported By:</strong> ${report.reportedBy}</p>
    <p><strong>Description:</strong></p>
    <p>${report.description}</p>
    <hr>
    <p>This report requires immediate attention. Please review in the admin panel.</p>
  `

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    return { success: false, error }
  }
}
