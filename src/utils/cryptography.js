import crypto from 'crypto'
import {AES_32KEY, AES_256_CBC} from '../configs'


export  const encrypt = (text) => {
 const iv = crypto.randomBytes(16)    
 let cipher = crypto.createCipheriv(AES_256_CBC, Buffer.from(AES_32KEY), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export const decrypt = (text) => {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv(AES_256_CBC, Buffer.from(AES_32KEY), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}
function sendUserEmail(req, res, user, theme){
    const payload = {
        id: user.id,
        email: user.email,
    }
    const js = JSON.stringify(payload)

    const encrypted = crypto.encrypt(js)
    

    jwt.sign(
        encrypted,
        keys.secretOrKey, {
            expiresIn: '1h'
        },
        (err, token) => {
      
            sendEmail(req, res, [`${user.email}`], theme, theme === "Email Verification" ? 
            emailVerification(user.name, `<a href=http://localhost:5000/api/users/verify_email=${token}>LINK</a>`):
            passwordTemplate(user.name, `<a href=http://localhost:5000/api/users/change_password.auth=${token}>LINK</a>`))
          
        })
}