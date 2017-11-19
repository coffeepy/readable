import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'
import { serializeForm_with_timestamp_and_id } from '../utils/helpers'
import PostForm from './PostForm'

class NewPostForm extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <Container>
        <PostForm handleSubmit={handleSubmit}/>
      </Container>
    )
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    handleSubmit: (e) => {
      let obj = serializeForm_with_timestamp_and_id(e)
      return dispatch(addPost(obj))
    }
  }
}
export default connect(null, mapDispatchToProps)(NewPostForm)
