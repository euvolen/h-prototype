import gql from 'graphql-tag';

//  @public
// return User 
export const SIGN_IN = gql`
mutation ($email:String!,$password:String! ){
  signIn(email:$email, password:$password){
        id
    }
}
`
// @public
// return User
export const SIGN_UP = gql`
mutation ($email:String!,$name:String!,$password:String! ){
  signUp(email:$email, name:$name, password:$password){
        id
    }
}
`
// @public
// return User
export const CHANGE_PASSWORD = gql`
mutation ($password:String! ){
  changePassword(password:$password)
}
`
// @public
// return User
export const SIGN_OUT = gql`
mutation {
  signOut
}
`