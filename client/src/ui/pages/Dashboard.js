import React from 'react'

import Drafts from '../components/Drafts';
import UserBlogs from '../components/UserBlogs';
import DocumentEditor from '../components/DocumentEditor';

const Dashboard =()=> (
        <div className="container dashboard">
        <h1 className="text-center">Dashboard</h1>
        <Drafts/>
        <DocumentEditor/>
        <UserBlogs/>
     
    </div>
    )

    


export default Dashboard
