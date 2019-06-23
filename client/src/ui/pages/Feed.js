import React from 'react'
import {Link} from 'react-router-dom'
import { Query } from 'react-apollo';
import { FEED } from '../../apollo/Queries';
import Loading from '../components/Loading';
import ConnectionError from '../components/ConnectionError';
import _ from 'lodash'


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


const test =(cursor) =>(
    <Query query={FEED} variables={{cursor: cursor ? parseInt(cursor)*10 : 0}} pollInterval={500}>
    {({ loading, error, data }) => {
    if(loading) return <Loading/>
    if(error) {
         setTimeout(()=>{
             //window.location.reload()
         }, 2000)
         return <ConnectionError/>
    }
    const {blogs} = data.feed.blogFeed
    return (
    <div className="container dashboard">
    <h1 className="text-center">Blogs</h1>
    <div className="m-2">
        <div className="row m-2">
        {blogs.map(bl => blog(bl.id, bl.title, bl.body, bl.author))}
   
   </div>
    <ul className="pagination justify-content-center"> 
    {_.range(parseInt(data.feed.length / 10)+1).map(i =><li key={i} className="page-item"><Link className="page-link" to={`/feed/${i>0 ? i : ''}`}>{i+1}</Link></li>
    )}
   </ul>
  </div>
   </div>)


}}
</Query>
)






function Feed({match}) {
    const {cursor} = match.params
    return (
        <div>
            {test(cursor)}
        </div>
    )
}

export default Feed
