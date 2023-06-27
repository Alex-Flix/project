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
<!DOCTYPE html>
<html>
  <body style="text-align: center">
    <div style="padding: 20px 0 10px 0">
      <img src=" https://res.cloudinary.com/djfej0qrv/image/upload/v1687263277/sdodcguqdaiitd6891ey.png" width="300"/>
    </div>
    <h2>Thank you for your registration.</h2>
    <p >Please click the link below to ${msg}</p>
    <div style="border-radius: 3px;background-color: rgb(73, 93, 120);width: 30%;margin: 0 auto;display: flex;justify-content: center;align-items: center;">
      <a href="${link}" target="_blank" style="font-size: 20px;color: #ffffff;text-decoration: none;padding: 10px;border-radius: 2px;display: inline-block;">Confirm Email</a>
    </div>
  </body>
</html>
`

exports.confirmationEmailWithPassword=(msg,link,password)=>`
<!DOCTYPE html>
<html>
  <body style="text-align: center">
    <h1 style="padding: 20px 0 10px 0">Welcome to</h1>
    <div>
      <img src=" https://res.cloudinary.com/djfej0qrv/image/upload/v1687263277/sdodcguqdaiitd6891ey.png" width="300"/>
    </div>
    <p>Please click the button below to ${msg}:</p>
    <h2>${password}</h2>

    <div style="border-radius: 3px;background-color: rgb(73, 93, 120);width: 30%;margin: 0 auto;display: flex;justify-content: center;align-items: center;">
      <a href="${link}" target="_blank" style="font-size: 20px;color: #ffffff;text-decoration: none;padding: 10px;border-radius: 2px;display: inline-block;">Confirm Email</a>
    </div>
  </body>
</html>`
