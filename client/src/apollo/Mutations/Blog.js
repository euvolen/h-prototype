import gql from 'graphql-tag';

//  @private
// return Blog 
export const SAVE_BLOG = gql`
mutation ($title:String!,$body:String! ){
  saveBlog(title:$title, body:$body){
        id
        author
    }
}
`
//  @private
// return Blog 
export const PUBLISH_BLOG = gql`
mutation ($title:String!,$body:String! ){
  publishBlog(title:$title, body:$body){
        id
        author
    }
}
`

// @private
// return Blog
export const EDIT_BLOG = gql`
mutation ($id: ID!, $title:String!,$body:String! ){
  editBlog(id:$id, title:$title, body:$body){
        id
    }
}
`
// @private
// return boolean
export const DELETE_BLOG = gql`
mutation ($id: ID!){
  deleteBlog(id: $id)
}
`
// @private
// return boolean
export const CHANGE_VISIBILITY = gql`
mutation ($id: ID! , $isVisible: Boolean!){
  changeVisibility(id: $id, isVisible:$isVisible)
}
`