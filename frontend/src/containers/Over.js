import React, { Component } from 'react'

const over = {
    color: 'limegreen',
    fontSize: '70px',
    textAlign: 'centre',
    marginTop: '300px'
}

const wait = {
    color: 'limegreen',
    fontSize: '70px',
    textAlign: 'centre',
    marginTop: '10px'
}

class Over extends Component {
    render() {
        return (
             <>
             <h1 style={over}> Election is not over yet... </h1>
             <br /> <br />
             <h1 style={wait}> Please Wait!!! </h1>
             </>
        )
    }
}

export default Over