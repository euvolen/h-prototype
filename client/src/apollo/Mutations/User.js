import gql from 'graphql-tag';

//  @public
// return User 
export const SIGN_IN = gql`
mutation SignInMutation($email:String!,$password:String! ){
  signIn(email:$email, password:$password){
        id
    }
}
`
// @public
// return User
export const SIGN_UP = gql`
mutation SignUpMutation($email:String!,$name:String!,$password:String! ){
  signUp(email:$email, name:$name, password:$password){
        id
    }
}
`
// @public
// return User
export const SIGN_OUT = gql`
mutation SignOutMutation{
  signOut
}
`