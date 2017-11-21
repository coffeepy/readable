import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import catImg from '../imgs/cat.jpg'
import darth from '../imgs/darth.jpg'
import spiderman from '../imgs/spiderman.jpg'

class Category extends Component {
  style = {
    display : 'inline-block',
    margin: "4px"
  }
  imageMap = {
    'cats': catImg,
    'starwars': darth,
    'marvel': spiderman,

  }
  render() {
    const {cat} = this.props
    return (
      <Chip style={this.style} key={cat.path}>
        <Avatar src={this.imageMap[cat.name]} />
        <Link to={`/${cat.path}`}>{cat.name}</Link>
      </Chip>
    )
  }
}

export default Category
