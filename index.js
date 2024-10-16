const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["https://seedgate.co", "https://www.seedgate.co"],
  })
);
app.use(express.json());

app.post("/send-mail", async (req, res) => {
  try {
    const { html, email } = req.body;
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Someone has asked for your consultation",
      html,
      replyTo: email,
    });
    console.log("Email sent successfully");

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("email not sent!", error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}` });
  }
});

app.listen(process.env.PORT || 5000, () => console.log("We up..."));
