import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Post from './Post'
import SelectOrder from './SelectOrder'

class CategoryView extends Component {
  render (){
    let { posts, selectedCat } = this.props
    posts = posts.filter((post)=> post.category === selectedCat)
    return(
      <div>
        <Nav/>
        <SelectOrder />
        <h2>{selectedCat}</h2>
        {
          posts.length
          ? posts.map((post)=> <Post key={post.id} id={post.id} fetchPosts={true}/> )
          : <div>Not Posts in this Category</div>
        }
      </div>

    )
  }
}

const mapStateToProps = (state)=> {
  return {
    posts: state.posts
  }

}
export default connect(mapStateToProps)(CategoryView)
