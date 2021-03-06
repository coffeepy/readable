import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { serialize_form } from '../utils/helpers'
import { editPostAction } from  '../actions/posts'
import PostForm from './PostForm'

class EditPostForm extends Component {
  state = {
    submitted: false,
    category: ""
  }
  handleSubmit = (e)=> {
    this.props.handleSubmit(e).then((data)=> {
      const post = data.posts.find((post)=> post.id === this.props.match.params.id)
      this.setState({submitted:true, category: post.category})
    }
    )
  }
  render() {
    const { match } = this.props
    return (
      <Container>
        {
          this.state.submitted
            ? <Redirect to={`/${this.state.category}`}/>
            : <PostForm
                id={match.params.id}
                handleSubmit={this.handleSubmit}
              />
        }
      </Container>
    )
  }
}


const mapDispatchToProps = (dispatch, props)=> {
  return {
    handleSubmit: (e)=> {
      e.preventDefault()
      let obj = serialize_form(e)
      return dispatch(editPostAction(props.match.params.id, obj))
    }
  }
}
export default connect(null, mapDispatchToProps)(EditPostForm)
