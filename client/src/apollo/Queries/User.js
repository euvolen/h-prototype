import gql from 'graphql-tag';

// @private
// return User
export const CURRENT = gql`
query CurrentUserQuery{
  current{
        id
       role
    }
}
`