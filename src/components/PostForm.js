import React, { Component } from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { postPost } from '../backendAPI'
import { addPost } from '../actions/posts'
import { serializeForm_with_timestamp_and_id } from '../utils/helpers'

class PostForm extends Component {
  // handleSubmit = (e)=> {
  //   let obj = serializeForm_with_timestamp_and_id(e)
  //   // console.log(obj);
  //   postPost(obj)
  // }

  render() {
    const { categories, handleSubmit } = this.props
    return (
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input name="title"/>
          </FormGroup>
          <FormGroup>
            <Label for="title">Body</Label>
            <Input type="textarea" name="body"/>
          </FormGroup>
          <FormGroup>
            <Label for="author">Author</Label>
            <Input name="author"/>
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input type="select" name="category">
              {
                categories.map((cat)=> <option key={cat.name}>{cat.name}</option>)

              }
            </Input>
          </FormGroup>
          <Button type="submit">Submit Post!</Button>
        </Form>
      </Container>
    )
  }
}
const mapStateToProps = (state)=> {
  return {
    categories: state.categories
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
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
