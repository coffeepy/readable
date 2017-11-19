import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { serializeForm_with_timestamp_and_id } from '../utils/helpers'
import PostForm from './PostForm'
import { getPost } from '../backendAPI'

class EditPostForm extends Component {
  state = {
    post: {}
  }
  componentDidMount() {
     getPost(this.props.match.params.id).then((post)=> this.setState({post}))
  }
  render() {
    const { handleSubmit, match, posts } = this.props
    const { title, body, author, category } = this.state.post
    return (
      <Container>
        <PostForm
          id={match.params.id}
          handleSubmit={handleSubmit}
        />
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    handleSubmit: (e) => {
      let obj = serializeForm_with_timestamp_and_id(e)
      return
      // return dispatch(addPost(obj))
    }
  }
}

const mapStateToProps = (state)=> {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(EditPostForm)
