import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { serialize_form } from '../utils/helpers'
import { editPostAction } from  '../actions/posts'
import PostForm from './PostForm'

class EditPostForm extends Component {
  // handleSubmit(e) {
  //   e.preventDefault()
  //   let obj = serialize_form(e)
  //   console.log(obj);
  //   editPost(this.props.id, obj)
  // }
  render() {
    const { match, posts, editPostHandler } = this.props
    return (
      <Container>
        <PostForm
          id={match.params.id}
          handleSubmit={editPostHandler}
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
const mapDispatchToProps = (dispatch, props)=> {
  return {
    editPostHandler: (e)=> {
      e.preventDefault()
      let obj = serialize_form(e)
      return dispatch(editPostAction(props.match.params.id, obj))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm)
