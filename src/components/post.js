import React, { Component } from 'react'

class Post extends Component {
  render() {
    const { post } = this.props
    return (
      <div>
        <ul>
           {
            Object.entries(post).map((keyval)=> <li>{`${keyval[0]}:${keyval[1]}`}</li>)
           }
        </ul>
      </div>
    )
  }
}

export default Post
