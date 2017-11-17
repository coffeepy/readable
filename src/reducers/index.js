// import { getAllPosts } from '../backendAPI'
import { RECIEVE_POSTS } from '../actions/posts'
import { combineReducers } from 'redux'

const postReducer = (state={}, action)=> {
  switch (action.type) {
    case RECIEVE_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}

//
// commentsReducer = (state={}, action)=> {
//   switch (expression) {
//     case expression:
//
//       break;
//     default:
//
//   }
// }
// export default combineReducers({
//   posts: postReducer
//   comments: {}
// })
export default postReducer
