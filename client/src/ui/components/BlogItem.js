import React, { Component } from 'react'

class BlogItem extends Component {
    
    render() {
        const {title, body, author}=this.props

        return (
            <div className="col col-md-4">
          <div className="card">
                <div className="card-body">
                    <h6 className="text-muted card-subtitle mb-2"> {author}</h6>
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{body.substring(0, 95)+'...'}</p>
                </div>
            </div>
           </div>
        )
    }
}
export default BlogItem 
