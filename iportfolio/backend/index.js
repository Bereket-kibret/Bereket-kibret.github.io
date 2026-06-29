import 'dotenv/config'; // Load environment variables from .env file
const express = require('express');

const cors = require("cors");   
const nodemailer = require('nodemailer');
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config(); // Load environment variables from .env file

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS; // from Google App Passwords

app.post('/send', async (req, res) => {
    console.log('Received request to /send with body:', req.body);
  const { name, email, subject, message } = req.body;
    console.log('Extracted name:', name);
    console.log('Extracted email:', email);
    console.log('Extracted subject:', subject);
    console.log('Extracted message:', message);


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
console.log('Transporter created');
  const mailOptions = {
    from: email,
    to: EMAIL_USER,
    subject: `Message from ${name}: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };
  console.log('Mail options set:', mailOptions);

  try {
    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.json({ message: '✅ Message sent successfully!' });
  } catch (err) {
    console.log(err);
    res.json({ message: '❌ Failed to send message.' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
