import {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} from '../configs'
import mongoose from 'mongoose'


// Connects db
export const connect = () => {
    return new Promise((resolve, reject) => {mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {useNewUrlParser:true, useFindAndModify:false})
    .then((res, err) => {
        if(err) return reject(err)
        console.log(`DB ${DB_NAME} connected`)
        resolve();
    })
})
}
// Disconnects db
export const close = () => {
    return new Promise((resolve, reject) => {mongoose.disconnect()
    .then((res, err) => {
        if(err) return reject(err)
        console.log(`DB ${DB_NAME} disconnected`)
        resolve();
    })
})
}