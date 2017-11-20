import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Post from './Post'

class CategoryView extends Component {
  render (){
    const { posts, selectedCat } = this.props
    console.log(this.props);
    return(
      // <Nav><button>Add Post</button></Nav>
      <div>
        <h2>Category View</h2>
        {
          posts.map((post)=>{
            return post.category === selectedCat ? <Post post={post}/>
              : <div>No Posts in this Category</div>
          })

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
