
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Mutation} from 'react-apollo'
import {SIGN_IN} from '../../apollo/Mutations'
import { connect } from 'react-redux';
import { getErrors,authenticateUser } from '../../redux/actions';
import PropTypes from 'prop-types'

class Login extends Component {
  state = {
    email: '',
    password: '',
    err: ''
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    const {email, password, err } = this.state
    return (
        <Mutation mutation={SIGN_IN}>
            {(signIn, {data})=>(
              <section className="clean-block clean-form">
              <div className="container">
                  <div className="block-heading">
                      <h1 className="form-title">Login</h1>
                      {err ? <p>{err}</p>: undefined}
                  </div>
                  <form className="border rounded-sm" onSubmit={(e) =>{
                     e.preventDefault()
            
                   signIn({variables: {email, password}})
                     .then(res=>{this.props.authenticateUser(res.data.signIn, this.props.history)})
                     .catch(err => {
                       this.setState({err:err.message})
                       this.props.getErrors(err.message)})}}>
                

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                      <input className="form-control item"  
                      value={email}
                       onChange={this.onChange.bind(this)}
                       name="email"
                       type="email"
                       placeholder="your email"/>
                       </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control"  
                        value={password}
                       onChange={this.onChange.bind(this)}
                       name="password"
                       type="password"
                       placeholder="Password"/>
                        </div>  
                      
                    <div className="form-group text-center"><button className="btn btn-primary btn-block" type="submit">Login</button>
                     </div>
                     {err ? <p>{err}</p>: undefined}
                  </form>
                  <div className="text-center"><Link to="/password-recovery">Forget password?</Link></div>
              </div>
              </section>
            )}
        </Mutation>
      
    )
  }

}
Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  getErrors: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, { getErrors, authenticateUser })(Login);

