import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { fetchPostsOrdered, deletePostAction, votePostAction } from '../actions/posts'
import {serializeForm_with_timestamp_and_id} from '../utils/helpers'
import { getComments, getPost, votePost, postComment, editComment, deleteComment, voteComment } from '../backendAPI'
import { serialize_form, orderByGreatest } from '../utils/helpers'
import { convertEpochDate } from '../utils/helpers'
import Category from './Category'
//styling
import { Card, CardHeader, CardText, CardActions, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/clear'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Face from 'material-ui/svg-icons/action/face'
import OpenInNew from 'material-ui/svg-icons/action/open-in-new'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import Forum from 'material-ui/svg-icons/communication/forum'
import AddComment from 'material-ui/svg-icons/communication/comment'
import Badge from 'material-ui/Badge'
import Divider from 'material-ui/Divider'
import { List } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar'

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
    this.props.match.params.id &&
    this.setState({showComments: true})
  }
  render() {
    const { post } = this.state
    const { categories } = this.props
    const cat = categories.find((cat)=> post.category === cat.name)
    return (
      <Card>
        <Toolbar>
          <ToolbarGroup>
            {
              cat && <Category cat={cat}/>
            }
            <Chip backgroundColor="#F44336" labelColor="white">
              <Avatar icon={<Face/>}/>
              {post.author}
            </Chip>
            <IconButton onClick={()=> this.votePost(post.id, 'upVote')} tooltip="Up Vote">
              <ThumbUp />
            </IconButton>
            <span>{post.voteScore}</span>
            <IconButton onClick={()=> this.votePost(post.id, 'downVote')} tooltip="Down Vote">
              <ThumbDown/>
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <Link to={`/edit/${post.id}`}>Edit Post</Link>
            <Link to={`/post/${post.id}`}><IconButton tooltip="View Post"><OpenInNew/></IconButton></Link>
            <IconButton onClick={()=> this.props.dispatch(deletePostAction(post.id))} tooltip="Delete Post"><Clear ></Clear></IconButton>
          </ToolbarGroup>
        </Toolbar>

        <CardHeader
          subtitle={`@${convertEpochDate(post.timestamp)}`}
          // openIcon={<Add onClick={()=> this.props.dispatch(deletePostAction(post.id))}></Add>}
        />
        <CardTitle title={post.title}/>
        <CardText>
          {post.body}
        </CardText>
        <CardActions>
          <IconButton  onClick={this.toggleShowCommentForm}><AddComment/></IconButton>
          <Badge badgeContent={post.commentCount || 0} primary={true}>
            <IconButton tooltip="Show Comments" onClick={this.toggleShowComments}><Forum /></IconButton>
          </Badge>
        </CardActions>
        {/* <ul>
           {
            post && Object.entries(post).map((keyval)=> <li key={keyval[0]}>{`${keyval[0]}:${keyval[1]}`}</li>)
           }
        </ul> */}
        <Divider/>
        { this.state.showCommentForm &&
          <CommentForm handleSubmit={this.handleCommentSubmit}/>
        }
        { this.state.showComments &&
          <List>
            {

              this.state.comments.map((comment)=>
                  <div>
                    <Comment
                      key={comment.id}
                      vote={this.voteComment}
                      del={this.deleteComment}
                      handleSubmit={this.handleCommentEdit}
                      comment={comment}
                    />
                    <Divider />
                  </div>

              )
            }


          </List>
        }

      </Card>

    )
  }
}
const mapStateToProps = (state) => (
  {
    postOrder: state.postOrder,
    categories: state.categories,
  }
)
export default connect(mapStateToProps)(Post)
