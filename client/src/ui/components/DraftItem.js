import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class DraftItem extends Component {
    
    render() {
        const {title, body, author, id}=this.props

        return (
            <div className="col col-md-4">
          <div className="card">
                <div className="card-body">
                    <h6 className="text-muted card-subtitle mb-2"> {author.name}</h6>
                    <Link to ={`/edit-blog/${id}`} className="card-title">{title}</Link>
                    <p className="card-text">{body.substring(0, 95)+'...'}</p>
                </div>
            </div>
           </div>
        )
    }
}
export default DraftItem 