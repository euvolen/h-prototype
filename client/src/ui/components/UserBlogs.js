import React from 'react'
import {Link} from 'react-router-dom'
import {USER_BLOGS} from '../../apollo/Queries'
import {Query, Mutation} from 'react-apollo'
import { DELETE_BLOG} from '../../apollo/Mutations';
import Loading from './Loading';
import ConnectionError from './ConnectionError';

const blog = (id, title, body, name) => (

               <div key={id} className="col col-md-12 m-2">
                    <div className="card m-1">
                       
                        <div className="card-body">
                        <div className="row">
                        <div className="col col-md-10">  <h6 className="text-muted card-subtitle mb-2">{name}</h6></div>
                            <div className="col col-md-1"><Link className="btn btn-primary" to={`/edit-blog/${id}`}><i className="fa fa-pencil"></i></Link>
                            </div>
                            <div className="col col-md-1"><Mutation mutation={DELETE_BLOG}>{(deleteBlog)=>{
                                return <button className="btn btn-danger" onClick={()=>{
                                    deleteBlog({variables: {id}})
                                }}>X</button>
                            }}</Mutation>
                            </div>
                        </div>
                        <h4 className="card-title">{title}</h4>
                            <p className="card-text">{body}</p>
                        </div>

                        
                        </div>
                    </div>

)


function UserBlogs() {
    return (
        <Query query={USER_BLOGS} pollInterval={200}>
       {({ loading, error, data }) => {
       if(loading) return <Loading/>
       if(error) {
           setTimeout(()=>{
               window.location.reload()
           }, 2000)
        return <ConnectionError/>
       }

       return (
       <div className="container dashboard">
       <h1 className="text-center">Blogs</h1>
       <div className="m-2">
           <div className="row m-2">
       {data.userBlogs.map(({id, title, body, author}) => blog(id, title, body, author.name ))}
       </div>
     </div>
      </div>)


   }}
 </Query>
 )
}

export default UserBlogs