const nodemailer = require("nodemailer");

exports.sendMessage =async ({ to = "", subject = "", html = "" }) => {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const info= await transporter
    .sendMail({
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html,
    })
    return info
};



exports.confirmationEmail=(msg,link)=>`
<!doctype html>
<html>
  <body>
    <h1>Welcome to AlexFlix</h1>
    <p>Please click the button below to ${msg}:</p>
    <a href="${link}">
      Confirm Email
    </a>
  </body>
</html>
`

exports.confirmationEmailWithPassword=(msg,link,password)=>`
<!doctype html>
<html>
  <body>
    <h1>Welcome to AlexFlix</h1>
    <p>Please click the button below to ${msg}:</p>
    <h2>${password}</h2>
    <a href="${link}">
      Confirm Email
    </a>
  </body>
</html>`
