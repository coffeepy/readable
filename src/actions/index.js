// export const ADD_POST = "ADD_POST"
// export const REMOVE_POST = "REMOVE_POST"
// export const ADD_COMMENT = "ADD_COMMENT"
// export const REMOVE_COMMENT = "REMOVE_COMMENT"
import { getAllPosts } from '../backendAPI'
export const FETCH_POSTS = "FETCH_POSTS"
export const RECIEVE_POSTS = "RECIEVE_POSTS"

export const recievePosts = (posts) => {
  return {
    type: RECIEVE_POSTS,
    posts
  }
}
export const fetchPosts = () => dispatch => {
  //Fetch posts from the server, and when returned dispatch an action
  getAllPosts()
    .then( (posts)=>  dispatch(recievePosts(posts)) )
}
// const addPost = (id) => {
//   return {
//     type: ADD_POST,
//     id,
//   }
// }
