import React, { Component } from 'react'
import CommentForm from './CommentForm'

class Comment extends Component {
  state = {
    edit: false
  }
  // handleCommentEdit = (e)=> {
  //   e.preventDefault()
  //   let obj = serialize_form(e)
  //   editComment(this.props.comment.id, obj).then(()=> this.setState({edit: false}) )
  // }
  handleSubmit = (e, id) => {
    this.props.handleSubmit(e, id).then(()=> this.setState({edit:false}))
  }
  render() {
    const { del, comment, handleSubmit} = this.props
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
              </div>
        }
        <button onClick={()=>{this.setState({edit: true})}}>Edit</button>
        <button onClick={()=> del(comment.id)} >Delete</button>
      </div>
    )
  }
}

export default Comment
