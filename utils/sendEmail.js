import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: "apikey",
      pass: `${process.env.SEND_MAIL_PASS}`,
    },
  });
  const mailOptions = {
    from: `${process.env.SEND_MAIL_EMAIL}`,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
    }
  });
};

export default sendEmail;
