
import { Blog, User } from "../../../models"
import Joi from 'joi'
import {createBlog, editBlog} from '../../../validation'
/* 
 * Queries:
 * blog, blogs, userBlogs, drafts 
 * 
 * Methods:
 * createBlog, editBlog, deleteBlog, changeVisibility
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
        userBlogs: async (root, args, {req}, info)=>{
            return await Blog.find({author: req.session.user, isVisible:true}).sort({createdAt: -1})
           
        },
        drafts: async (root, args, {req}, info)=>{
            return await Blog.find({author: req.session.user, isVisible:false}).sort({updatedAt: -1})
        },
        draft: (root, args, {req}, info)=>{
           return Blog.findById(args.id)
        },
        feed: (root, args, {req}, info)=>{
            return Blog.find({isVisible:true}).sort({updatedAt: -1})
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
            const { title, body} = args
            await Joi.validate(args, editBlog,{ abortEarly: false })
            const updated = await Blog.findByIdAndUpdate(args.id, {$set:{ title, body}}, {new:true})
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
       
            const user = await User.findById(root.author)
   
            
            return user.name
          },
    },
    Blogs:{
        length: async (root, {cursor}, { req }, info) => {
            
            return root.length
        },
        blogFeed: async (root, {cursor}, { req }, info) => {
            if (!cursor) {
                cursor = 0
              }
        
              const limit = cursor + 10

              const blogFeed = {
                blogs: root.slice(
                    cursor,
                    root.length < limit ? root.length : limit
                ),
              };
              
              return blogFeed;

            //return (await root.populate('author').execPopulate()).author
          },
    },
}