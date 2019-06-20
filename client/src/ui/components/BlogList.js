import React from 'react'
import {BLOGS} from '../../apollo/Queries'
import BlogItem from './BlogItem';
import {Query} from 'react-apollo'


function BlogList() {
    return (

           <Query query={BLOGS}>
          {({ loading, error, data }) => {
          if(loading) return <div>Loading...</div>

          return (<div className="row m-2">{data.blogs.map(blog => <BlogItem key={blog.id} blog={blog} />)}</div>)


      }}
    </Query>
    )
}

export default BlogList
