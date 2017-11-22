import React, { Component } from 'react'
import Category from './Category'
// Categories component used on main page for choosing what categorie you want to view
class Categories extends Component {
  // componentDidMount()
  render() {
    return (
      <div>
        {
          this.props.cats.map((cat)=> <Category key={cat.name} cat={cat} />)
        }
      </div>
    );
  }
}

export default Categories
