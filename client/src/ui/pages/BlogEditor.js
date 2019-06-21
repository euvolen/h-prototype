import React, { Component } from 'react'
import DocumentEditor from '../components/DocumentEditor';
import { Query } from 'react-apollo';
import { DRAFT } from '../../apollo/Queries';
import ConnectionError from '../components/ConnectionError';

class BlogEditor extends Component {

    render() {
        const {id} = this.props.match.params

        return (id ? (
        <Query query={DRAFT} variables={{id}}>
        {({ loading, error, data }) => {
            if(loading) return <div>Loading...</div>
            if(error) {    setTimeout(()=>{
                window.location.reload()
            }, 2000)
            return <ConnectionError/>}
            return <DocumentEditor history={this.props.history} {...data.draft}/>
         }  
          }
          </Query>): <DocumentEditor history={this.props.history}/> )
    }
        
    }

export default BlogEditor