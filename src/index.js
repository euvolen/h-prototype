import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import {IN_PROD, PORT} from './configs'
import * as db from './db/db-connect'
import session from './db/sessions'
import typeDefs from './api/apollo/typedefs'
import resolvers from './api/apollo/resolvers'
import schemaDirectives from './api/apollo/directives'
import mail from './api/mail/mail'
import pwd from './api/pwd/pwd'
import vhost from 'vhost'
import cors from 'cors'
import bodyParser from 'body-parser'

db.connect().then(()=>{
    const app = express()
    // Body parser for parsing requests body
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.disable('x-powered-by')
    
    //Sessions
    app.use(session)
  
    app.use(cors())

    app.use(vhost('mail.*', mail))
    app.use('/api/pwd/', pwd)
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

  //add express as a middleware   
  server.applyMiddleware({ app , cors:false})
  app.get('*', (req, res)=>{
      res.redirect('http://localhost:3000')
  })
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}`)
  })

  }).catch(err =>{
      console.error(err)
  })