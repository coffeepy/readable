import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { fetchPostsOrdered, deletePostAction, votePostAction } from '../actions/posts'
import {serializeForm_with_timestamp_and_id} from '../utils/helpers'
import { getComments, getPost, votePost, postComment, editComment, deleteComment, voteComment } from '../backendAPI'
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
    // toggle the comment forms visibility, since it is visible
    // because the button was clicked to submit this comment
    // toggling will hide it
    this.toggleShowCommentForm()
    // setup object
    let obj = serializeForm_with_timestamp_and_id(e)
    obj.parentId = this.state.post.id
    // post the comment and then refetch the post and set the state
    // also fetch the new comment we just added after post is fetched
    postComment(obj)
      .then(()=> this.fetchPostAndComments())
  }
  handleCommentEdit = (e, id)=> {
    e.preventDefault()
    let obj = serialize_form(e)
    // we arent increasing a comment, just editing
    // so no need to fetch the post again(So the comment count can go up)
    // we just simply fetch the comments again
    return editComment(id, obj).then(()=> {
      this.fetchCommentsAndSetState()
    })
  }
  deleteComment = (id)=> {
    // since we delete a comment, we have to fetch the post since it
    // will reflect the new comment count, and the comments as well
    deleteComment(id)
      .then(this.fetchPostAndComments())
  }
  fetchComments(id) { return getComments(id || this.state.post.id) }
  fetchCommentsAndSetState = () => (
    this.fetchComments().then((comments)=>
      this.setState({comments:this.orderComments(comments)})
    )
  )

  fetchPostAndComments = () => {
    return this.fetchPost()
      .then((post)=>
        this.fetchComments(post.id)
          .then((comments)=>
            this.setState({comments:this.orderComments(comments), post})
          )
      )
  }
  toggleShowCommentForm = ()=> {
    let { showCommentForm } = this.state
    showCommentForm = showCommentForm ? false : true
    return this.setState( {showCommentForm} )
  }
  toggleShowComments = ()=> {
    let { showComments } = this.state
    showComments = showComments ? false : true
    return this.setState({showComments})
  }
  orderComments = (comments)=> (orderByGreatest(comments, 'voteScore'))

  voteComment = (id, vote) => {
    voteComment(id, vote)
      .then(()=> this.fetchCommentsAndSetState() )
  }
  // post functions
  votePost = (id, option) => {
    votePost(id, {option})
      .then(()=>
        this.fetchPostAndSetState()
        .then(this.checkIfFetchAll)
    )
  }
  fetchPost = ()=> {
    const id = this.props.id || this.props.match.params.id
    return getPost(id)
  }
  fetchPostAndSetState() {
    return this.fetchPost().then((post)=> this.setState({post}))
  }
  fetchAllPosts = () => {
    this.props.dispatch(fetchPostsOrdered(this.props.postOrder))
  }
  checkIfFetchAll = () =>  (
    this.props.fetchPosts
    ? this.fetchAllPosts()
    : null
  )

  componentDidMount() {
    this.fetchPostAndComments()
    this.props.match && 
    this.props.match.params.id && this.setState({showComments: true})
  }
  render() {
    const { post } = this.state
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
        <button onClick={()=> this.votePost(post.id, 'upVote')}>Up Vote</button>
        <button onClick={()=> this.votePost(post.id, 'downVote')}>Down Vote</button>
        <button onClick={this.toggleShowComments}>Show Comments</button>
        { this.state.showCommentForm &&
          <CommentForm handleSubmit={this.handleCommentSubmit}/>
        }
        { this.state.showComments &&
          this.state.comments.map((comment)=> <Comment key={comment.id} vote={this.voteComment}del={this.deleteComment} handleSubmit={this.handleCommentEdit} comment={comment}/>)
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
export default connect(mapStateToProps)(Post)
