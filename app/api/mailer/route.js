// app/api/mailer/route.js
import nodemailer from 'nodemailer'

export async function POST(request) {
    const body = await request.json();
    const { name, email, message } = body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.AALEMNI_EMAIL,
        subject: `New message from ${name}`,
        text: message,
        html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Success: email was sent' }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: `Could not send message: ${error.message}` }),
            { status: 500 }
        );
    }
}
