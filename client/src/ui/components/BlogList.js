import React from 'react'
import {BLOGS} from '../../apollo/Queries'
import BlogItem from './BlogItem';
import {Query} from 'react-apollo'
import _ from 'lodash'
import Loading from './Loading';
import ConnectionError from './ConnectionError';

function BlogList() {
    return (
           <Query query={BLOGS} pollInterval={200}>
          {({ loading, error, data }) => {

          if(loading) return <Loading/>
          if (error){ 
           
            setTimeout(()=>{
              window.location.reload()
            }, 2000)
            return <ConnectionError/>}
          else{
            const {blogs} = data

          if(blogs.length>0)

             return (<div className="row m-2">{_.range(blogs.length < 3 ? blogs.length : 3).map(i => <BlogItem key={i} {...blogs[i]}/> )}</div>)
             
          else

          return <div>No blogs...</div>
              }
          }}
        </Query>
        )
}

export default BlogList
