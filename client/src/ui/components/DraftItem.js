import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
class DraftItem extends Component {
    
    render() {
        const {title, body, author, id}=this.props

        return (
            <div className="col col-md-12">
          <div className="card">
                <div className="card-body">
                    <h6 className="text-muted card-subtitle mb-2"> {author}</h6>
                    <Link to ={`/edit-blog/${id}`} className="card-title">{title}</Link>
                    <p className="card-text">{body.substring(0, 95)+'...'}</p>
                </div>
            </div>
           </div>
        )
    }
}
DraftItem.propTypes ={
    title: PropTypes.string.isRequired, 
    body: PropTypes.string.isRequired, 
    author: PropTypes.object.isRequired, 
    id: PropTypes.string.isRequired 
}
export default DraftItem 