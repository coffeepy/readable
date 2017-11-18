import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { getAllCats } from '../backendAPI'

// Categories component used on main page for choosing what categorie you want to view
class Categories extends Component {
  // componentDidMount()
  render() {
    return (
      <div>
        <ul>
          {
            this.props.cats.map((cat)=> <li><Link to={`/${cat.path}`}>{cat.name}</Link></li>)
          }
        </ul>
      </div>
    );
  }
}

export default Categories
