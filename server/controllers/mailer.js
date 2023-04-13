import nodemailer, { createTestAccount } from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js'


let nodeConfig ={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD,
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let Mailgenerator = new Mailgen({
    theme: "default",
    product: {
        name:"Mailgen",
        link: "https://mailgen.js/"
    }
})

export const registerMail = async(req,res)=>{
    const {username,userEmail,text,subject} = req.body;


    //cuerpo del email

    var email = {
        body: {
            name: username,
            intro: text || 'Bienvenido a este apartado',
            outro: 'Need help, or have questions? just reply to this email,ew'
        }
    }

    var emailBody = Mailgenerator.generate(email);

    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfully",
        html: emailBody
    }

    transporter.sendMail(message)
            .then(()=>{
                return res.status(200).send({msg: "You should receive an email from us."})
            })
            .catch(error => res.status(500).send({error}))

}