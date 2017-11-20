import React, { Component } from 'react'
import CommentForm from './CommentForm'


class Comment extends Component {
  state = {
    edit: false
  }
  handleSubmit = (e, id) => {
    this.props.handleSubmit(e, id).then(()=> this.setState({edit:false}))
  }
  render() {
    const { del, comment, handleSubmit, vote} = this.props
    const { edit } = this.state
    return(
      <div>
        {
          edit
            ? <CommentForm id={comment.id} handleSubmit={this.handleSubmit}/>
            : <div>
                <div>
                  {comment.body}
                </div>
                <div>
                  {comment.author}
                </div>
                <div>{comment.voteScore}</div>
              </div>
        }
        <button onClick={()=>{this.setState({edit: true})}}>Edit</button>
        <button onClick={()=> del(comment.id)} >Delete</button>
        <button onClick={()=> vote(comment.id, 'upVote')} >Up Vote</button>
        <button onClick={()=> vote(comment.id, 'downVote')} >Down Vote</button>
      </div>
    )
  }
}

export default Comment
