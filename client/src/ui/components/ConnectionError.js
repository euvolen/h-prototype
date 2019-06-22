import React from 'react'
import error from './Pacman-1s-200px.gif'
function ConnectionError() {
    return (
        <div className="container">
            <div className="text-center"><img src={error} alt="Connection error"/></div>
        </div>
    )
}

export default ConnectionError
