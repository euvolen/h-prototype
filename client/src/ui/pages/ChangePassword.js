
import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import { CHANGE_PASSWORD} from '../../apollo/Mutations'


class ChangePassword extends Component {
  state = {
    password: '',
    password2: '',
    err: ''
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    const {password, password2, err } = this.state
    return (
        <Mutation mutation={CHANGE_PASSWORD}>
            {(changePassword, {data})=>(
              <section className="clean-block clean-form">
              <div className="container">
                  <div className="block-heading">
                      <h1 className="form-title">Change Password</h1>
                      {err ? <p>{err}</p>: undefined}
                  </div>
                  <form className="border rounded-sm" onSubmit={(e) =>{

                     e.preventDefault()

                    if(password === password2){
                      changePassword({variables: {password}})
                            .then(res=>{this.props.history.push('/dashboard')})
                            .catch(err => {
                            this.setState({err:err.message})
                            })}
                       else{
                        this.setState({err:"Passwords don't match"}) 
                       }
                       
                       }}>
                

                               <div className="form-group">
                               <label htmlFor="password">Password</label>
                               <input className="form-control"  
                               value={password}
                              onChange={this.onChange.bind(this)}
                              name="password"
                              type="password"
                              placeholder="Password"/>
                               </div>  

                               <div className="form-group">
                               <label htmlFor="password">Confirm Password</label>
                               <input className="form-control"  
                               value={password2}
                               onChange={this.onChange.bind(this)}
                               name="password2"
                               type="password"
                               placeholder="Repeate a password"/>
                               </div> 
                      
                    <div className="form-group text-center"><button className="btn btn-primary btn-block" type="submit">Change Password</button>
                     </div>
                     {err ? <p>{err}</p>: undefined}
                  </form>
              </div>
              </section>
            )}
        </Mutation>
      
    )
  }

}

export default ChangePassword;
