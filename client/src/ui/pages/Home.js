import React from 'react'
import {Link}from 'react-router-dom'
import BlogList from '../components/BlogList';


function Home() {
    return (
       <>
        <section className="clean-block clean-hero">
            <div className="text">
                <h2>H-Prototype</h2>
                <p>Presentation of combination of REST and query API</p><Link className="btn btn-outline-light btn-lg main-btn" to="/register">Learn More</Link></div>
        </section> 
       
        <section> 
            <div className="container">
            <BlogList/>
            <div className="row m-2">
                <div className="col col-md-4"></div>
                <div className="col col-md-4"></div>
                <div className="col col-md-4"><Link to="/feed">Read more...</Link></div>
            </div>   
            </div>
        </section>
     </>
    )
}

export default Home
