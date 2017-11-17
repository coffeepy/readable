import React, { Component } from 'react'
import { getAllCats } from '../backendAPI'

// Categories component used on main page for choosing what categorie you want to view
class Categories extends Component {
  // componentDidMount()
  render() {
    return (
      <div>
        <ul>
          {
            this.props.cats.map((cat)=> <li><a href={cat.path}>{cat.name}</a></li>)
          }
        </ul>
      </div>
    );
  }
}

export default Categories
