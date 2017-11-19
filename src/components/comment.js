import React, { Component } from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {serializeForm_with_timestamp_and_id} from '../utils/helpers'
import { postComment } from '../backendAPI'

class Comment extends Component {
  handleSubmit = (e, parentId)=> {
    e.preventDefault()
    let obj = serializeForm_with_timestamp_and_id(e)
    obj.parentId = parentId
    postComment(obj).then((data)=>console.log('success', data))
    return
  }
  render() {
    return (
      <Form onSubmit={(e)=> this.handleSubmit(e, this.props.postId)}>
        <FormGroup>
          <Input type='textarea' name='body'/>
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input name='author'/>
        </FormGroup>
        <Button type='submit'>Submit Comment</Button>
      </Form>
    )
  }
}

export default Comment
