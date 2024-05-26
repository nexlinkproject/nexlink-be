const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

const sendResetEmail = async (email, token) => {
    const resetUrl = `http://your-app-url/reset-password?token=${token}`;
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) have requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
