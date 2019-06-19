import session from  'express-session'
import connectMongo from 'connect-mongo'
import {
    IN_PROD,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    SESS_LIFETIME,
    SESS_NAME,
    SESS_SECRET
} from '../configs'


const MongoStore = connectMongo(session)

//Creates store in same db
const store = new MongoStore({
    url:`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
 })

 //Session configs
 const newSession = session({
    store,
    name: SESS_NAME,
    secret:SESS_SECRET,
    resave:true,
    rolling:true,
    saveUninitialized:false,
    cookie:{
        maxAge: parseInt(SESS_LIFETIME)
    }
 })

 export default newSession