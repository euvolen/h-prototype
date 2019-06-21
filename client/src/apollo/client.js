import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';


const link = createHttpLink({
  uri:'/graphql'
})

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  })

export default client  