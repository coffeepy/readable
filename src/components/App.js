import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Categories from './categories'
import { getAllCats, getAllPosts } from '../backendAPI'
// import { fetchPosts } from '../actions'
import { connect } from 'react-redux'
// just for testing, delete later
window.getAllPosts = getAllPosts

class App extends Component {
  state = {
    categories: [],
  }
  justCats = ()=> {
    // getAllCats returns an array of objects, with name/url, we want only the category
    // so we change the data a bit
    getAllCats().then((data)=> (
      this.setState({categories: data.map((cat) => cat.name)})
    ))
  }
  componentDidMount()  {
    this.justCats()
    // this.props.dispatch(fetchPosts)
    // this.allPosts()
  }

  render() {
    return (
      <div>
        <h3>Categories</h3>
        <Categories cats={this.state.categories}></Categories>
        <h3>Posts</h3>
        {/* <Posts post={this.state.posts}></Posts> */}
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchPosts: () => dispatch(fetchPosts)
//   }
// }

export default connect()(App);
