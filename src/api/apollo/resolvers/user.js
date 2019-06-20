import { User } from "../../../models"
import {signOut, attemtSignIn} from '../../../auth'
import { sendEmail } from "../../../utils/sendEmail";

/* 
 * Queries:
 * current, 
 * 
 * Methods:
 * signin, signup, signout
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
        signOut: (root, args, {req, res}, info)=>{

              return signOut(req,res)
        }}
}
