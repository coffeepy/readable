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

export const fetchPostsOrdered = (key) => dispatch => {
  console.log('getting called');
  getAllPosts()
    .then( (posts)=> {
      posts = orderByGreatest(posts, key)
      console.log(posts);
      console.log(key);
      return dispatch(recievePosts(posts))
    })
}
export const deletePostAction = (id) => dispatch => {
  // thunk is used to use this action due to it being asynchronous
  // Here i  just post the obj, then i want to fetch all posts again to update
  // the state
  deletePost(id)
    .then( ()=>  dispatch(fetchPosts()) )
}

export const addPost = (post_obj) => dispatch => {
  // thunk is used to use this action due to it being asynchronous
  // Here i  just post the obj, then i want to fetch all posts again to update
  // the state
  postPost(post_obj)
    .then( ()=>  dispatch(fetchPosts()) )
}
export const editPostAction = (id, post_obj) => dispatch => {
  // thunk is used to use this action due to it being asynchronous
  // Here i  just edit the post, then i want to fetch all posts again to update
  // the state
  editPost(id, post_obj)
    .then( ()=>  dispatch(fetchPosts()) )
}
export const votePostAction = (id, data) => dispatch => {
  votePost(id, data)
    .then( ()=> dispatch(fetchPosts()))
}
export const fetchPosts = () => dispatch => {
  // thunk is used to use this action due to it being asynchronous
  //Fetch posts from the server, and when returned dispatch an action
  getAllPosts()
    .then( (posts)=>  dispatch(recievePosts(posts)) )
}
