import React from 'react'
import {BLOGS} from '../../apollo/Queries'
import BlogItem from './BlogItem';
import {Query} from 'react-apollo'
import _ from 'lodash'

function BlogList() {
    return (
           <Query query={BLOGS}>
          {({ loading, error, data }) => {

          if(loading) return <div>Loading...</div>
          if (error){ 
           
            setTimeout(()=>{
              window.location.reload()
            }, 2000)
            return <div>Connection error...</div>}
          else{
            const {blogs} = data

          if(blogs)

             return (<div className="row m-2">{_.range(blogs.length < 3 ? blogs.length : 3).map(i => <BlogItem key={i} blog={blogs[i]}/> )}</div>)
             
          else

          return <div>Loading...</div>
              }
          }}
        </Query>
        )
}

export default BlogList
