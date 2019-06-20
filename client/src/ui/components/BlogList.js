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
          if(error) return <div>Loading...</div>
          else{
            const {blogs} = data
          if(blogs)  
             return (<div className="row m-2">{_.range(3).map(i => <BlogItem key={i} blog={blogs[i]}/> )}</div>)
          else
          return <div>Loading...</div>
          }

      }}
    </Query>
    )
}

export default BlogList
