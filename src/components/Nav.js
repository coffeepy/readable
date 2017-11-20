import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render(){
    return (

      <nav><Link to="/">Readable</Link><Link to="/new">New Post</Link></nav>

    )
  }
}

export default Nav
