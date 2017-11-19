import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment'

class Post extends Component {
  state = {
    showCommentForm: false,
  }
  toggleShowCommentForm = ()=> {
    this.setState((state) => {
      let { showCommentForm } = state
      showCommentForm = showCommentForm ? false : true
      return { showCommentForm }
    })
  }
  render() {
    const { post } = this.props
    return (
      <div>
        <ul>
           {
            Object.entries(post).map((keyval)=> <li key={keyval[0]}>{`${keyval[0]}:${keyval[1]}`}</li>)
           }
        </ul>
        <Link to={`/edit/${post.id}`}>Edit Post</Link>
        <button onClick={this.toggleShowCommentForm}>Add Comment</button>
        { this.state.showCommentForm &&
          <Comment postId={post.id}/>
        }
      </div>
    )
  }
}

export default Post
