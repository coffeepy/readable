import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'
import { serializeForm_with_timestamp_and_id } from '../utils/helpers'
import PostForm from './PostForm'

class NewPostForm extends Component {
  state = {
    submitted: false
  }
  handleSubmit = (e)=> {
    this.props.handleSubmit(e).then(
      this.setState({submitted:true})
    )
  }
  render() {
    return (
      <Container>
        {
          this.state.submitted
            ? <Redirect to="/"/>
            : <PostForm handleSubmit={this.handleSubmit}/>
        }

      </Container>
    )
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    handleSubmit: (e) => {
      e.preventDefault()
      let obj = serializeForm_with_timestamp_and_id(e)
      return dispatch(addPost(obj))
    }
  }
}
export default connect(null, mapDispatchToProps)(NewPostForm)
