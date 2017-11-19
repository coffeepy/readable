import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../App.css';
/// component imports
import Categories from './Categories'
import Post from './Post'
import Nav from './Nav'
import CategoryView from './CategoryView'
import PostForm from './PostForm'

// fetchposts/fetchCats are asynchronous calls, gets all posts from backend
import { fetchPosts } from '../actions/posts'
import { fetchCats } from '../actions/categories'
import { getAllCats, getAllPosts } from '../backendAPI'
// import { fetchPosts } from '../actions'
// import our Post component

// just for testing, delete later
window.getAllPosts = getAllPosts

class App extends Component {
  state = {
    categories: [],
  }
  componentDidMount()  {
    // fed in from mapDispatchToProps
    this.props.fetchPosts()
    this.props.fetchCats()
  }

  render() {
    const { posts, cats} = this.props
    return (
      <div>
        <Nav/>
        <Route exact={true} path="/" render={()=> {
          return(
            <div>
              <h3>Categories</h3>
              <Categories cats={cats}/>
              <h3>Posts</h3>
              {
                posts.map((post)=> <Post key={post.id} post={post}></Post>)
              }
            </div>
          )
        }}/>
        <Route path="/new" component={PostForm}/>
        {/*  Below we create a Route for every possible cat */}
        {
          cats.map((cat)=> <Route key={cat.path} path={`/${cat.path}`} render={()=> <CategoryView selectedCat={cat.name}/>}/>)
        }
      </div>
    );
  }
}
// class test_del extends Component {
//   render() {
//   console.log(this.props);
//     return (
//       {
//
//       }
//       <div>WORKS</div>
//     )
//   }
//
// }

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    cats: state.categories,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCats: () => dispatch(fetchCats()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
