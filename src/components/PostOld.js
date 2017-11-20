import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { fetchPostsOrdered, deletePostAction, votePostAction } from '../actions/posts'
import {serializeForm_with_timestamp_and_id} from '../utils/helpers'
import { getComments, getPost, postComment, editComment, deleteComment, voteComment } from '../backendAPI'
import { serialize_form, orderByGreatest } from '../utils/helpers'


class Post extends Component {
  state = {
    showCommentForm: false,
    comments: [],
    showComments: false,
    detailView: false,
    post: {}
  }
  handleCommentSubmit = (e)=> {
    e.preventDefault()
    let obj = serializeForm_with_timestamp_and_id(e)
    obj.parentId = this.props.post.id
    postComment(obj).then(()=> this.fetchComments() )
    this.props.fetchPosts(this.props.postOrder)
    this.toggleShowCommentForm()
  }
  handleCommentEdit = (e, id)=> {
    e.preventDefault()
    let obj = serialize_form(e)
    console.log(id);
    return editComment(id, obj).then(()=> {
      this.fetchComments()
    })
  }
  deleteComment = (id)=> {
    deleteComment(id).then(()=> this.fetchComments() )
    this.props.fetchPosts(this.props.postOrder)
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
    return showComments
  }
  toggleCommentsThenFetch = ()=> {
    const showComments = this.toggleShowComments()
    console.log(showComments);
    if (showComments) {
      this.fetchComments()
    }
  }
  fetchComments() {
    getComments(this.props.post.id)
      .then((comments)=> {
        this.setState({comments: this.orderComments(comments) })
      })
  }
  orderComments = (comments)=> (orderByGreatest(comments, 'voteScore'))

  voteComment = (id, vote) => {
    voteComment(id, vote)
      .then(()=> this.fetchComments() )
  }
  checkforPostObj = ()=> {
    return null

  }
  componentDidMount() {
  }
  render() {
    let { post, showComments } = this.props
    return (
      <div>
        <ul>
           {
            post && Object.entries(post).map((keyval)=> <li key={keyval[0]}>{`${keyval[0]}:${keyval[1]}`}</li>)
           }
        </ul>
        <Link to={`/edit/${post.id}`}>Edit Post</Link>
        <Link to={`/post/${post.id}`}>View Post</Link>
        <button onClick={()=> this.props.dispatch(deletePostAction(post.id))}>Delete Post</button>
        <button onClick={this.toggleShowCommentForm}>Add Comment</button>
        <button onClick={()=> this.props.votePost(post.id, 'upVote')}>Up Vote</button>
        <button onClick={()=> this.props.votePost(post.id, 'downVote')}>Down Vote</button>
        <button onClick={this.toggleCommentsThenFetch}>Show Comments</button>
        { this.state.showCommentForm &&
          <CommentForm handleSubmit={this.handleCommentSubmit}/>
        }
        { this.state.showComments &&
          this.state.comments.map((comment)=> <Comment vote={this.voteComment}del={this.deleteComment} handleSubmit={this.handleCommentEdit} comment={comment}/>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    postOrder: state.postOrder
  }
)
const mapDispatchToProps = (dispatch) => (
  {
    fetchPosts: (key)=> dispatch(fetchPostsOrdered(key)),
    votePost: (id, vote)=> dispatch(votePostAction(id, {option: vote}))
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(Post)