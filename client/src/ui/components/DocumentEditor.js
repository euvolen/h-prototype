import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Mutation} from 'react-apollo'
import {PUBLISH_BLOG, SAVE_BLOG, EDIT_BLOG, CHANGE_VISIBILITY} from '../../apollo/Mutations'

class DocumentEditor extends Component {
    
    state={
        title:this.props.title ? this.props.title : '',
        body:this.props.body ? this.props.body :'',
        id:this.props.id ? this.props.id :'',
        isVisible: this.props.isVisible ? this.props.isVisible :false,
        err:''
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render() {

        const {title, body, err, id, isVisible} = this.state
        return (
            <div className="container dashboard">
            <div className="row m-2">
            <div className="col col-md-12">
                <div className="card">
                    <div className="card-body">
                         <h1>{id ? "Edit blog" : "Create blog"}</h1>
                        <h4 className="card-title">Title</h4><input type="text" value={title} name="title" onChange={this.onChange.bind(this)} className="block-input"/>
                        <h4 className="card-title">Blog</h4><textarea type="text" value={body} name="body" onChange={this.onChange.bind(this)} className="block-input-text"/>
                        {err ? <span className="danger">{err}</span>:undefined}
                        {id ? editBlog(id, title, body, err, isVisible, this) : createBlog(title, body, err, this)}
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
    }
}


const createBlog = (title, body, err, component) =>(
    <div className="btn-group" role="group">
    <Mutation mutation={SAVE_BLOG}>{( saveBlog, {data})=>{
        
        return(
            <button className="btn btn-secondary" onClick={()=>{
                saveBlog({variables: {title, body}})
                .then(res=>{
                    component.props.history.push('/dashboard')  })
                .catch(err => {
                  
             })
            }} type="button">Save</button>
        )
    }}</Mutation>
    <Mutation mutation={PUBLISH_BLOG}>{( publishBlog, {data})=>{

        return(
            <button className="btn btn-primary" onClick={()=>{
                publishBlog({variables: {title, body}})
                .then(res=>{
                    component.props.history.push('/dashboard')   })
                .catch(err => {
                  
             })
            }} type="button">Publish</button>
        )
    }}</Mutation>

    
    </div>
)
const editBlog = (id, title, body, err, isVisible, component) =>(
    <div className="btn-group" role="group">
    <Mutation mutation={EDIT_BLOG}>{( editBlog, {data})=>{
        console.log(component)
        return(
            <button className="btn btn-primary" onClick={()=>{
                editBlog({variables: {id,title, body}})
                .then(res=>{
                   component.props.history.push('/dashboard') })
                .catch(err => {
                  
             })
            }} type="button">Save</button>
        )
    }}</Mutation>
     <Mutation mutation={CHANGE_VISIBILITY}>{( changeVisibility, {data})=>{
         
        return(
            <button className="btn btn-primary" onClick={()=>{
                changeVisibility({variables: {id, isVisible:true}})
                .then(res=>{
                    component.props.history.push('/dashboard')
                  })
                .catch(err => {
                  
             })
            }} type="button">Publish</button>
        )
    }}</Mutation>
    </div>
)

DocumentEditor.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.string
}
export default DocumentEditor