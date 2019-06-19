import express from 'express'
import {SECRET_OR_KEY} from '../../configs'
const router = express()

router.get('/test', (req, res) => res.json({ msg: "Works" }));

router.get('/graphql', (req, res) => res.redirect('http://localhost:5000/graphql'));

router.get('/verify_email=:token',(req, res)=>{
    jwt.verify(req.params.token, SECRET_OR_KEY,  async (err, encrypted) => {
        if(!encrypted || Object.keys(encrypted).length<1){
            res.status(400).json({err:"Bad token"})
        }
        else{
            const user = JSON.parse(decrypt(encrypted))
            const current = await User.findByIdAndUpdate(user.id, {isVerified:true})
            req.session.userId = current.id
            res.redirect("http://localhost:3000/")
        }
    })
})
router.get('*', (req, res) =>  res.redirect("http://localhost:3000/"));
export default router