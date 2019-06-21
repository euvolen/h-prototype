import gql from 'graphql-tag';

// @public
// return Blog || null
export const BLOG = gql`
query ($id:ID!){
  blog(id:$id){
        id
       title
       body
       author{
           name
       }
    }
}
`
// @public
// return [Blog]
export const BLOGS = gql`
query {
  blogs{
       id
       title
       body
       author{
           name
       }
    }
}
`
// @public
// return [Blog]
export const USER_BLOGS = gql`
query {
  userBlogs{
       id
       title
       body
       author{
           name
       }
    }
}
`
// @public
// return [Blog]
export const DRAFTS = gql`
query {
  drafts{
       id
       title
       body
       author{
           name
       }
    }
}
`
// @public
// return [Blog]
export const DRAFT = gql`
query ($id:ID!) {
  draft(id:$id){
       id
       title
       body
       isVisible
       author{
           name
       }
    }
}
`