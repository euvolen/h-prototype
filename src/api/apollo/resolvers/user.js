import { User } from "../../../models"
import {signOut, attemtSignIn} from '../../../auth'
import { sendEmail } from "../../../utils/sendEmail";
import Joi from 'joi'
import {changePassword} from '../../../validation'
import bcrypt from 'bcryptjs'
/* 
 * Queries:
 * current, 
 * 
 * Methods:
 * signin, signup, changePassword, signout
 * 
 */
export default {
    Query:{
        current: (root, args, {req}, info)=>{

            return User.findById(req.session.user)
        }
    },
    Mutation:{
        signUp: async(root, args, {req, res}, info)=>{
            
             await Joi.validate(args, signUp,{ abortEarly: false })
             const user =  await User.create(args)

             sendEmail(res, user, "Email Verification" )

             req.session.user = user.id
  
             return user
            
        },
        signIn: async (root, {email, password}, {req}, info)=>{
        
            const user = await attemtSignIn(email,password)

            req.session.user = user.id
 
            return user    

        },
        changePassword: async (root, args, {req}, info)=>{
          
            await Joi.validate(args, changePassword,{ abortEarly: false })
            
            //hooks don't work in case of updating (in db)
            const password = await bcrypt.hash(args.password, 10)

            await User.findByIdAndUpdate(req.session.user, {$set:{password}}, {new:true})
     
            return true    

        },
        signOut: (root, args, {req, res}, info)=>{

              return signOut(req,res)
        }}
}
