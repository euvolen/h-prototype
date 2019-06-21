import React from 'react'
import {BLOGS} from '../../apollo/Queries'
import {Query} from 'react-apollo'

const blog = (id, title, body, name) => (
               <div key={id} className="col col-md-12 m-2">
                    <div className="card m-1">
                        <div className="card-body">
                            <h6 className="text-muted card-subtitle mb-2">{name}</h6>
                            <h4 className="card-title">{title}</h4>
                            <p className="card-text">{body}</p>
                        </div>
                    </div>
                </div>
)


function Blogs() {
    return (
        <Query query={BLOGS}>
       {({ loading, error, data }) => {
       if(loading) return <div>Loading...</div>
       if(error) {
        
       }
       else{
  
       }

       return (
       <div className="container dashboard">
       <h1 className="text-center">Blogs</h1>
       <div className="m-2">
           <div className="row m-2">
       {data.blogs.map(({id, title, body, author}) => blog(id, title, body, author.name ))}
       </div>
     </div>
      </div>)


   }}
 </Query>
 )
}

export default Blogs