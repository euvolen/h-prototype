import {gql} from 'apollo-server-express'

export default gql`
    extend type Query {
        blog(id:ID!):Blog 
        blogs:[Blog!] 
        userBlogs: [Blog!] @private
        drafts:[Blog!] @private
    }
    extend type Mutation{
        saveBlog(title:String!, 
                      body:String!,                      
          
                      ):Blog! @private
        publishBlog(title:String!, 
                      body:String!,                      
                      ):Blog! @private              
        editBlog(id:ID!,  
                      title:String, 
                      body:String,
                      isVisible:Boolean                           
                      ):Blog! @private
        changeVisibility(id:ID!, 
                      isVisible:Boolean!                           
                      ):Boolean @private                  
       deleteBlog(id:ID! ): Boolean @private
        
    }
    type Blog {
        id: ID!
        title:String!, 
        body:String!,                      
        author:User
    }
  
`