import React, { component } from 'react'

class Post extends component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.posts.map()
          }
        </ul>
      </div>
    )

  }
}

export default Post
