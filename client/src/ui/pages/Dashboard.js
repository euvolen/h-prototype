import React, {Component} from 'react'
import BlogList from '../components/BlogList';
import {Mutation} from 'react-apollo'
import {PUBLISH_BLOG, SAVE_BLOG} from '../../apollo/Mutations'

class Dashboard extends Component{
    state={
        title:'',
        body:'',
        err:''
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    render(){ 
        const {title, body, err} = this.state
    return (
        <div className="container dashboard">
        <h1 className="text-center">Dashboard</h1>
        <div className="row m-2">
            <div className="col col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Title</h4><input type="text" value={title} name="title" onChange={this.onChange.bind(this)} className="block-input"/>
                        <h4 className="card-title">Blog</h4><textarea type="text" value={body} name="body" onChange={this.onChange.bind(this)} className="block-input-text"/>
                        {err ? <span>{err}</span>:undefined}
                        <div className="btn-group" role="group">
                            <Mutation mutation={SAVE_BLOG}>{( saveBlog, {data})=>{
                                return(
                                    <button className="btn btn-secondary" onClick={()=>{
                                        saveBlog({variables: {title, body}})
                                        .then(res=>{
                                            console.log(res) 
                                            this.setState({title:'', body:'', err:''})})
                                        .catch(err => {
                                          this.setState({err:err.message})
                                     })
                                    }} type="button">Save</button>
                                )
                            }}</Mutation>
                            <Mutation mutation={PUBLISH_BLOG}>{( publishBlog, {data})=>{

                                return(
                                    <button className="btn btn-primary" onClick={()=>{
                                        publishBlog({variables: {title, body}})
                                        .catch(err => {
                                          this.setState({err:err.message})
                                     })
                                    }} type="button">Publish</button>
                                )
                            }}</Mutation>
                       
                            
                            </div>
                    </div>
                </div>
            </div>
        </div>
       <BlogList/>
    </div>
    )}
    
}

export default Dashboard
