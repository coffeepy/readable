import React, { Component } from 'react'
import { Navbar } from 'reactstrap'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render(){
    return (
      <Navbar>
        <Link to="/">Readable</Link>
        <Link to="/new">New Post</Link>
      </Navbar>
    )
  }
}

export default Nav
