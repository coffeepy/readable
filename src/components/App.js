import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Categories from './categories'
import { getAllCats, getAllPosts } from '../backendAPI'
// fetchposts/fetchCats are asynchronous calls, gets all posts from backend
import { fetchPosts } from '../actions/posts'
import { fetchCats } from '../actions/categories'
// import { fetchPosts } from '../actions'
import { connect } from 'react-redux'
// import our Post component
import Post from './post'

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
    const { posts } = this.props
    return (
      <div>
        <h3>Categories</h3>
        <Categories cats={this.props.cats}></Categories>
        <h3>Posts</h3>
        {
          posts.map((post)=> <Post post={post}></Post>)
        }

        {/* <Posts post={this.state.posts}></Posts> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log('state', state);
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
