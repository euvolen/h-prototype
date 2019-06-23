import express from 'express'
import Joi from 'joi'
import {SECRET_OR_KEY} from '../../configs'
import jwt from 'jsonwebtoken'
import {decrypt} from '../../utils/cryptography'
import {User} from '../../models'
import { changePassword } from '../../validation';
import { sendEmail } from '../../utils/sendEmail';
import { CLIENT } from '../../configs';



const router = express()



// @route    POST api/pwd/reset_password
// @desc     Sending a link with a jwt for password restoration to the user email  
// @access   Public

router.post('/reset_password',  (req, res) => {
    console.log(req.body)
    const {
        email
    } = req.body

     User.findOne({email:email}).then( user =>{
        if(user){
            sendEmail(res, user, "Reset Passoword")
        }
            else {
                res.status(404).json({err: 'User not found'})
            } 
    })
    
})


// @route    POST api/pwd/reset_password
// @desc     Changing user password using jwt
// @access   Public
router.get('/change_password.auth=:token',  (req, res) => {
    const {
        token
    } = req.params

    jwt.verify(token, SECRET_OR_KEY, async (err, encrypted) => {
        if(!encrypted || Object.keys(encrypted).length<1){
            res.status(400).json({err:"Bad token"})
        }
        else{
            const user = JSON.parse(decrypt(encrypted))
            try {
               const current = await User.findById(user.id)
               req.session.user = current.id
               req.session.role = current.role
               res.redirect(CLIENT+'/change-password')
            } catch (error) {
               res.json({error, success:false})
            }
            
        }
    })

})
router.get('*', (req, res) =>  res.redirect(CLIENT));
export default router