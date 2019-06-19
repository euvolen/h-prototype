import mongoose, { Schema } from 'mongoose'


const blogSchema = new Schema({
    title:String,
    description:String,
    body:String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    isVisible:Boolean,

}, {
    timestamps: true
})

const Blog = mongoose.model('blogs', blogSchema)

export default Blog