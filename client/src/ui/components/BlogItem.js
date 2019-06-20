import React, { Component } from 'react'

class BlogItem extends Component {
    render() {
        const {title, body, author} = this.props.blog

        return (
            <div className="col col-md-4">
            <div className="card">
                <div className="card-body">
                    <h6 className="text-muted card-subtitle mb-2"> {author.name}</h6>
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{body}</p>
                </div>
            </div>
           </div>
        )
    }
}
export default BlogItem 