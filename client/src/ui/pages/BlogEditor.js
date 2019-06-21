import React, { Component } from 'react'
import DocumentEditor from '../components/DocumentEditor';
import { Query } from 'react-apollo';
import { DRAFT } from '../../apollo/Queries';

class BlogEditor extends Component {

    render() {
        const {id} = this.props.match.params

        return (id ? (
        <Query query={DRAFT} variables={{id}}>
        {({ loading, error, data }) => {
            if(loading) return <div>Loading...</div>
            if(error) {return <div>Some error... {error.message}</div>}
            return <DocumentEditor {...data.draft}/>
         }  
          }
          </Query>): <DocumentEditor/> )
    }
        
    }

export default BlogEditor