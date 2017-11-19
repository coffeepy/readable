// import { getAllPosts } from '../backendAPI'
import { RECIEVE_POSTS } from '../actions/posts'
import { RECEIVE_CATS } from '../actions/categories'
import { combineReducers } from 'redux'
// let initState = {
//   categories: [],
//   posts: [],
//   comments: [],
    // selectedCategory: null
// }
const postReducer = (state=[], action)=> {
  switch (action.type) {
    case RECIEVE_POSTS:
      return action.posts
    default:
      return state
  }
}
// too many cats, need to reduce cats..jk
const catReducer = (state=[], action)=> {
  switch (action.type) {
    case RECEIVE_CATS:
      return action.categories
    default:
      return state
  }
}
// commentsReducer = (state={}, action)=> {
//   switch (expression) {
//     case expression:
//
//       break;
//     default:
//
//   }
// }
export default combineReducers({
  posts: postReducer,
  categories: catReducer,
  // selectedCategory: selectedCatReducer,
})
