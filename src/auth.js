import { AuthenticationError , ForbiddenError} from "apollo-server-express";
import {User} from './models'
import {SESS_NAME} from './configs'


export const ensureSignedIn =(req)=>{
    if( ! signedin(req))
     throw new AuthenticationError('You must be signed in.')
}
export const ensureSignedOut =(req)=>{
     if( signedin(req))
      throw new AuthenticationError('You are already signed in.')
}


export const attemtSignIn = async (email,password) =>{
    
    const message = 'Email or password is incorrect. Please try again'
    const user= await User.findOne({email})
    if(!user){
            throw new AuthenticationError(message)
    }
    if (!await user.matchesPassword(password)){
            throw new AuthenticationError(message)
    }
    return user
 
   
}

export const signOut = (req, res)=> new Promise((resolve, reject)=>{
   req.session.destroy(err =>{
           if(err) reject(err)
                
           res.clearCookie(SESS_NAME)

           resolve(true)
   })  
})



//util methods
const signedin = req => req.session.userId