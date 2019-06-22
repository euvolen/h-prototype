import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { SIGN_OUT } from '../../apollo/Mutations'
import { authenticateUser } from '../../redux/actions';
 class Navigation extends Component {
    state ={
     
        isShow:false
    } 
    render() {
        const {isShow} = this.state
        const {isAuthenticated} = this.props.user
        const publicNav =(<>
    
        <li className="nav-item" role="presentation"><Link className="nav-link" to="/login">Login</Link></li>
        <li className="nav-item" role="presentation"><Link className="nav-link" to="/register">Register</Link></li>
        </>
    )
        const privateNav =( <>
        <li className="nav-item" role="presentation"><Link className="nav-link active" to="/dashboard">Dashboard</Link></li>
        <li className="nav-item" role="presentation">
             <Mutation mutation={SIGN_OUT}>
                {(signOut, { data }) => (
                  <a className="nav-link" href="/" onClick={(e)=>{
                    e.preventDefault()
                    signOut()
                    .then(res=>{this.props.authenticateUser({})})
                    }}>Log out</a>)}
              </Mutation> 
            </li>
            </>
)
        return (
            <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container"><Link className="navbar-brand logo" to="/">H-Prototype</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1" onClick={()=>{this.setState({isShow: !isShow})}}><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                <div className={classnames("collapse navbar-collapse", {"show": isShow})}
                    id="navcol-1">
                         <ul className="nav navbar-nav ml-auto">
                         <li className="nav-item" role="presentation"><Link className="nav-link" to="/feed">Feed</Link></li>
                        {
                            isAuthenticated ? privateNav : publicNav
                        }
               </ul>
                </div>
            </div>
        </nav>
        )
    }
}
Navigation.propTypes = {
    user: PropTypes.object.isRequired,
    authenticateUser: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    user: state.user,
  });
  export default connect(mapStateToProps, {authenticateUser})(Navigation);