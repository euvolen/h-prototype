import React from 'react'
import loading from './Infinity-2.3s-200px.gif'
function Loading() {
    return (
        <div className="container">
            <div className="text-center"><img src={loading} alt="Loading..."/></div>
        </div>
    )
}

export default Loading
