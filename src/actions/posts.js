import { getAllPosts, postPost, editPost, deletePost, votePost } from '../backendAPI'
// export const ADD_POST = "ADD_POST"
// export const REMOVE_POST = "REMOVE_POST"
// export const FETCH_POSTS = "FETCH_POSTS"
export const RECIEVE_POSTS = "RECIEVE_POSTS"

export const recievePosts = (posts) => {
  return {
    type: RECIEVE_POSTS,
    posts
  }
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
