import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { deletePostAction, votePostAction } from '../actions/posts'
import {serializeForm_with_timestamp_and_id} from '../utils/helpers'
import { getComments, postComment, editComment, deleteComment } from '../backendAPI'
import { fetchPosts } from '../actions/posts'
import { serialize_form } from '../utils/helpers'

class Post extends Component {
  state = {
    showCommentForm: false,
    comments: [],
    showComments: false
  }
  handleCommentSubmit = (e)=> {
    e.preventDefault()
    let obj = serializeForm_with_timestamp_and_id(e)
    obj.parentId = this.props.post.id
    postComment(obj).then(()=> this.fetchComments(true) )
    this.props.dispatch(fetchPosts())
    this.toggleShowCommentForm()
  }
  handleCommentEdit = (e, id)=> {
    e.preventDefault()
    let obj = serialize_form(e)
    console.log(id);
    return editComment(id, obj).then(()=> {
      this.fetchComments(true)
    })
  }
  deleteComment = (id)=> {
    deleteComment(id).then(()=> this.fetchComments(true) )
    this.props.dispatch(fetchPosts())
  }
  toggleShowCommentForm = ()=> {
    this.setState((state) => {
      let { showCommentForm } = state
      showCommentForm = showCommentForm ? false : true
      return { showCommentForm }
    })
  }
  toggleShowComments = ()=> {
    let { showComments } = this.state
    showComments = showComments ? false : true
    this.setState({showComments})
  }
  vote = (id, vote)=> {
    this.props.dispatch(votePostAction(id, {option: vote}))
  }
  fetchComments(showComments) {
    console.log('launched ');
    getComments(this.props.post.id)
      .then((comments)=> {
        this.setState({comments, showComments: this.props.showComments || showComments })
      })
  }
  componentDidMount() {
    console.log('component mounted');
    this.fetchComments()
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
        <button onClick={()=> this.props.dispatch(deletePostAction(post.id))}>Delete Post</button>
        <button onClick={this.toggleShowCommentForm}>Add Comment</button>
        <button onClick={()=> this.vote(post.id, 'upVote')}>Up Vote</button>
        <button onClick={()=> this.vote(post.id, 'downVote')}>Down Vote</button>
        <button onClick={this.toggleShowComments}>Show Comments</button>
        { this.state.showCommentForm &&
          <CommentForm handleSubmit={this.handleCommentSubmit}/>
        }
        { this.state.showComments &&
          this.state.comments.map((comment)=> <Comment del={this.deleteComment} handleSubmit={this.handleCommentEdit} comment={comment}/>)
        }
      </div>
    )
  }
}

export default connect()(Post)
