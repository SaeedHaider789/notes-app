import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// console.log(process.env.USER)

export function sendMail(to, subj, msg){
  transporter.sendMail({
    to: to,
    subject: subj,
    text: msg,
    html: `<b>${msg}</b>`
  })

//   console.log('msg send')
}

// sendMail('saeedhaider492@gmail.com', 'Health', 'Hey bro how are you? I came to know that you have been suffering from a foot injury. You should and if you need anything just call me.')