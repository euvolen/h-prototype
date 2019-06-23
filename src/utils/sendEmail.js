import nodemailer from 'nodemailer'
import {encrypt} from '../utils/cryptography'
import {APP_PASS, SECRET_OR_KEY, EMAIL} from '../configs'
import jwt from 'jsonwebtoken'
import {emailVerification, password} from '../utils/email-templates'




export const sendEmail = ( res, user, subject) => {
  
    
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: APP_PASS
      }
    })

   
    const payload = {
        id: user.id,
        email: user.email,
    }

    const js = JSON.stringify(payload)

    const encrypted = encrypt(js)

    jwt.sign(
      encrypted,
      SECRET_OR_KEY, {
          expiresIn: '1h'
      },
      (err, token) => {
        let html = subject === "Email Verification" ? emailVerification(`<a href=http://mail.localhost:5000/verify_email=${token}>LINK</a>`):
        password(`<a href=http://localhost:5000/api/pwd/change_password.auth=${token}>LINK</a>`)
       
        let options ={
          from: "Hunome",
          to: user.email,
          subject,
          html
          }
    
        transporter.sendMail(options, (err, info) => {

        if (err) {
       
          res.status(400).send({success:false})
        } else {

          res.status(200).send({success:true})
        }
      });

        
      })
    
  
  }

  
