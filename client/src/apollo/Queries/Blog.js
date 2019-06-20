import gql from 'graphql-tag';

// @public
// return Blog || null
export const BLOG = gql`
query {
  blog{
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