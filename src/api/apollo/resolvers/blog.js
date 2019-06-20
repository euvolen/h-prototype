
import { Blog } from "../../../models"
import Joi from 'joi'
import {createBlog, editBlog} from '../../../validation'
/* 
 * Queries:
 * Blog, 
 * 
 * Methods:
 * createBlog, editBlog, deleteBlog
 * 
 */
export default {
    Query:{
        blog: (root, args, {req}, info)=>{
            const blog =  Blog.findById(args.id)
            if(blog.isVisible){
                return blog
            }
            else {
                return null
            }
        },
        blogs: (root, args, {req}, info)=>{
            return Blog.find({isVisible:true}).sort({createdAt: -1})
        },
    },
    Mutation:{
        saveBlog: async(root, args, {req}, info)=>{
            const { title, body} = args
            await Joi.validate(args, createBlog,{ abortEarly: false })
            const newBlog ={
                title, body, author:req.session.user, isVisible:false
            }

            const blog = await Blog.create(newBlog)
           return blog
            
        },
        publishBlog: async(root, args, {req}, info)=>{
            const { title, body} = args
            await Joi.validate(args, createBlog,{ abortEarly: false })
            const newBlog ={
                title, body, author:req.session.user, isVisible:true
            }

            const blog = await Blog.create(newBlog)
           return blog
            
        },
        editBlog: async(root, args, {req}, info)=>{
            const { title, body, isVisible} = args
            await Joi.validate(args, editBlog,{ abortEarly: false })
            const updated = await Blog.findByIdAndUpdate(args.id, {$set:{ title, body, isVisible}}, {new:true})
            return updated
          
        },
        changeVisibility: async(root, args, {req}, info)=>{
            const {isVisible} = args

            await Blog.findByIdAndUpdate(args.id, {$set:{ isVisible}})

            return true
          
        },
        deleteBlog: async(root, args, {req}, info)=>{
            await Blog.findByIdAndDelete(args.id)
            return true
      
        },
    },
    Blog:{
        author: async (root, args, { req }, info) => {
            return (await root.populate('author').execPopulate()).author
          },
    }
}