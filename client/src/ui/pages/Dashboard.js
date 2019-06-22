import React from 'react'
import {Link} from 'react-router-dom'
import Drafts from '../components/Drafts';
import UserBlogs from '../components/UserBlogs';


const Dashboard =()=> (
        <div className="container dashboard">
        <h1 className="text-center">Dashboard</h1>
        <Drafts/>
        <div className="container">
               <div className="row -2">
            <div className="col col-md-10"></div>
            <div className="col col-md-2"><Link className="btn btn-primary d-block" to={'/edit-blog'}>New</Link></div>
        </div>
        </div>
     
        <UserBlogs/>
     
    </div>
    )

    


export default Dashboard
