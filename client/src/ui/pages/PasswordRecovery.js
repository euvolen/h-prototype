
import React, { Component } from 'react'
import axios from 'axios'

class PasswordRecovery extends Component {
  state = {
    email:'',
    err: '',
    isSend:false
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    const {email, err, isSend } = this.state
    return (
   
              <section className="clean-block clean-form">
              <div className="container">
                  <div className="block-heading">
                      <h1 className="form-title">Change Password</h1>
                      {err ? <p>{err}</p>: undefined}
                  </div>
                  <form className="border rounded-sm" onSubmit={(e) =>{

                     e.preventDefault()
                     const data ={
                         email
                     }
                     if(email.split('@').length === 2 && email.split('@')[1].split('.').length>1)
                    { this.setState({isSend:true})
                        axios.post('http://localhost:5000/api/pwd/reset_password', data).then(res =>{
                         console.log({res})
                     }).catch(err=>{
                        this.setState({isSend:false})
                         console.log({err})
                     })  } 
                     else{
                         this.setState({err: 'Invalid Email'})
                     }
                       
                       }}>
                               <div className="form-group">
                               <label htmlFor="password">Email</label>
                               <input className="form-control"  
                               value={email}
                              onChange={this.onChange.bind(this)}
                              name="email"
                              type="email"
                              placeholder="Email"/>
                               </div> 
                      
                    <div className="form-group text-center"><button className="btn btn-primary btn-block" disabled={isSend} type="submit">Recover Password</button>
                     </div>
                     {err ? <p>{err}</p>: undefined}
                  </form>
              </div>
              </section>

      
    )
  }

}

export default PasswordRecovery;
