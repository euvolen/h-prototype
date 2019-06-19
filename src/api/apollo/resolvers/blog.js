
import { Blog } from "../../../models"

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
            return Blog.findById(args.id)
        },
        blogs: (root, args, {req}, info)=>{
            return Blog.find({isVisible:true})
        },
    },
    Mutation:{
        createBlog: async(root, args, {req}, info)=>{
            const { title, description, body, images, keywords} = args

            const newBlog ={
                title, description, body, images, keywords, author:req.session.user
            }
            //Validation
            await Joi.validate(args, createBlog, { abortEarly: false })

            const Blog = await Blog.create(newBlog)
           return Blog
            
        },
        editBlog: async(root, args, {req}, info)=>{
            const { title, description, body, images, keywords} = args

           //Validation
           await Joi.validate(args, editBlog, { abortEarly: false })

            const updated = await Blog.findByIdAndUpdate(args.id, {$set:{ title, description, body, images, keywords}}, {new:true})
            return updated
          
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