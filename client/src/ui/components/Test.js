import React, { Component } from 'react'

export default class Test extends Component {
    state ={
        title: this.props.title ? this.props.title : ''
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    render() {

        const {title} = this.state
      
        return (
            <div>
                <input value={title} onChange={this.onChange.bind(this)} name='title'/>
            </div>
        )
    }
}
