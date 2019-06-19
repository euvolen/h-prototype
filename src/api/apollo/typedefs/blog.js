import {gql} from 'apollo-server-express'

export default gql`
    extend type Query {
        blog(id:ID!):Blog! @public
        blogs:[Blog!] @public
    }
    extend type Mutation{
        createBlog(title:String!, 
                      description:String!,
                      body:String!,                      
                      images:[String!],  
                      keywords:[String!],
          
                      ):Blog @private
        editBlog(id:ID!,  
                      title:String!, 
                      description:String!,
                      body:String!,                      
                      images:[String!], 
                      keywords:[String!],
            
                      ):Blog @private               
       deleteBlog(id:ID! ): Boolean @private
        
    }
    type Blog {
        id: ID!
        title:String!, 
        description:String!,
        body:String!,                      
        images:[String!],  
        keywords:[String!],
        author:User
    }
  
`