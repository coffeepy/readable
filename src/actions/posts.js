// export const ADD_POST = "ADD_POST"
// export const REMOVE_POST = "REMOVE_POST"

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
  // thunk is used to use this action due to it being asynchronous
  //Fetch posts from the server, and when returned dispatch an action
  getAllPosts()
    .then( (posts)=>  dispatch(recievePosts(posts)) )
}
