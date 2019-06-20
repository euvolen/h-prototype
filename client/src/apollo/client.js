import ApolloClient from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';


const link = createHttpLink({
  uri:'http://localhost:5000/graphql'
})

const client = new ApolloClient({
    link
  })

export default client  