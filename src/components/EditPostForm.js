import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { serialize_form } from '../utils/helpers'
import { editPost } from '../backendAPI'
import PostForm from './PostForm'

class EditPostForm extends Component {
  handleSubmit(e) {
    e.preventDefault()
    let obj = serialize_form(e)
    console.log(obj);
    editPost(this.props.id, obj)
  }
  render() {
    const { match, posts } = this.props
    return (
      <Container>
        <PostForm
          id={match.params.id}
          handleSubmit={this.handleSubmit}
        />
      </Container>
    )
  }
}


const mapStateToProps = (state)=> {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(EditPostForm)
