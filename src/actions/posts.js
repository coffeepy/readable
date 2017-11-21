import { getAllPosts, postPost, editPost, deletePost, votePost } from '../backendAPI'
import { orderByGreatest } from '../utils/helpers'

export const RECIEVE_POSTS = "RECIEVE_POSTS"
export const CHANGE_POST_ORDER = "CHANGE_POST_ORDER"

export const recievePosts = (posts) => {
  return {
    type: RECIEVE_POSTS,
    posts
  }
}

export const changePostOrder = (postOrder) => {
  return {
    type: CHANGE_POST_ORDER,
    postOrder
  }
}

export const fetchPostsOrdered = (key) => dispatch => (
  // this will return posts in the order selected by the user(voteScore or Date)
  getAllPosts()
    .then( (posts)=> {
      posts = orderByGreatest(posts, key)
      return dispatch(recievePosts(posts))
    })
)
export const deletePostAction = (id) => dispatch => (
  // Just what it sounds like, deletes a post, then fetches the posts again
  deletePost(id)
    .then( ()=>  dispatch(fetchPosts()) )
)

export const addPost = (post_obj) => dispatch => (
  // Here i  just post the obj, then i want to fetch all posts again to update
  postPost(post_obj)
    .then( ()=>  dispatch(fetchPosts()) )
)
export const editPostAction = (id, post_obj) => dispatch => (
  // Here i  just edit the post, then i want to fetch all posts again to update
  // the state
  editPost(id, post_obj)
    .then( ()=>  dispatch(fetchPosts()) )
)
export const votePostAction = (id, data) => dispatch => (
  // add a vote
  votePost(id, data)
    .then( ()=> dispatch(fetchPosts()))
)
export const fetchPosts = () => dispatch => (
  //Fetch posts from the server, and when returned dispatch an action
  getAllPosts()
    .then( (posts)=>  dispatch(recievePosts(posts)) )
)
