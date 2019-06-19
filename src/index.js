import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import {IN_PROD} from './configs'
import * as db from './db/db-connect'
import session from './db/sessions'
import typeDefs from './api/apollo/typedefs'
import resolvers from './api/apollo/resolvers'
import schemaDirectives from './api/apollo/directives'
import mail from './api/mail/mail'
import vhost from 'vhost'


db.connect().then(()=>{
    const app = express()

    app.disable('x-powered-by')
    
    //Sessions
    app.use(session)
  
  
    app.use(vhost('mail.*', mail))

    //Apollo-server-express
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false: {
          settings:{
              "request.credentials":'include'
          }
          
      },
      context: ({req, res})=>({req,res})
  })
  const port = 5000
  //add express as a middleware   
  server.applyMiddleware({ app , cors:false})
    app.listen(port, () => {
      console.log(`Server ready at http://localhost:${port}`)
  })

  }).catch(err =>{
      console.error(err)
  })