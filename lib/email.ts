import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail(
  to: string,
  name: string,
  interviewType: string,
  room: string,
  interviewer: string,
  date: string,
  timeSlot: string,
  confirmationToken: string
) {
  // Skip email if SMTP is not configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log('Email not configured, skipping email send');
    return { success: true, skipped: true };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const confirmUrl = `${appUrl}/confirm/${confirmationToken}`;

  const interviewTypeDisplay = interviewType === 'non-technical'
    ? 'Non-Technical Interview'
    : 'Technical Interview';

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Confirm Your Interview Appointment',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000;">Interview Confirmation Required</h2>
        <p>Hi ${name},</p>
        <p>You've scheduled an interview. Please confirm your appointment by clicking the link below:</p>

        <div style="background-color: #f3f4f6; padding: 20px; border: 2px solid #000; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Interview Type:</strong> ${interviewTypeDisplay}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${timeSlot}</p>
          <p style="margin: 5px 0;"><strong>Room:</strong> ${room}</p>
        </div>

        <a href="${confirmUrl}" style="display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; margin: 20px 0;">
          Confirm Appointment
        </a>

        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          If you didn't request this appointment, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
