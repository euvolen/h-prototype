import {gql} from 'apollo-server-express'

export default gql`
    extend type Query {
        current: User @private
    }
    extend type Mutation{
        signUp(email:String!, name:String!,  password:String!):User @public
        signIn (email:String!, password:String!): User @public
        signOut: Boolean @private
    }
    type User {
        id: ID!
        email: String!
        name: String!
        role:String!
        createdAt: String!
        updatedAt:String!
    }
  
`