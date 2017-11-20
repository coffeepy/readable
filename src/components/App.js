import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
/// component imports
import Categories from './Categories'
import Post from './Post'
import Nav from './Nav'
import CategoryView from './CategoryView'
import NewPostForm from './NewPostForm'
import EditPostForm from './EditPostForm'
import SelectOrder from './SelectOrder'

// fetchposts/fetchCats are asynchronous calls, gets all posts from backend
import { fetchPostsOrdered } from '../actions/posts'
import { fetchCats } from '../actions/categories'
import { getAllCats, getAllPosts } from '../backendAPI'
window.getAllPosts = getAllPosts

class App extends Component {
  state = {
    categories: [],
  }
  componentDidMount()  {
    // fed in from mapDispatchToProps
    this.props.fetchPosts(this.props.postOrder)
    this.props.fetchCats()
  }
  render() {
    let { posts, cats } = this.props
    return (
      <div>
        <Route exact={true} path="/" render={()=> {
          return(
            <div>
              <Nav />
              <SelectOrder />
              <h3>Categories</h3>
              <Categories cats={cats}/>
              <h3>Posts</h3>
              {
                posts.map((post)=> <Post key={post.id} id={post.id} fetchPosts={true}/>)
              }
            </div>
          )
        }}/>
        <Route path="/new" component={NewPostForm}/>
        <Route path="/edit/:id" component={EditPostForm}/>
        {/* <Route path="/post/:id"
          render={({ match })=> {
            const post = posts.find((post)=> post.id === match.params.id)
            return <Post post={post} />
          }}
        /> */}
        <Route path="/post/:id" component={Post}/>
        {/*  Below we create a Route for every possible cat */}
        {
          cats.map((cat)=> <Route key={cat.path} path={`/${cat.path}`} render={()=> <CategoryView selectedCat={cat.name}/>}/>)
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    cats: state.categories,
    postOrder: state.postOrder,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (key) => dispatch(fetchPostsOrdered(key)),
    fetchCats: () => dispatch(fetchCats()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
