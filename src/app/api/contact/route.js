import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, company, message } = await req.json();

  // Configure Nodemailer transporter (update with your email service details)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
    port: process.env.SMTP_PORT, // e.g., 587
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS, // your email password or app password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'info@71mellofy.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}
Email: ${email}
Company: ${company}
Message: ${message}`,
    });
    return new Response(JSON.stringify({ message: 'Email sent' }), { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ message: 'Error sending email' }), { status: 500 });
  }
} 