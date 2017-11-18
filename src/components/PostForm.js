import React, { Component } from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import serializeForm from 'form-serialize'
import uniqid from 'uniqid'
class PostForm extends Component {
  handleSubmit = (e)=> {
    e.preventDefault()
    let obj = serializeForm(e.target, { hash: true })
    obj.date = Date.now()
    obj.id =  uniqid("post-")
    console.log(obj);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
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
          <Button type="submit">Submit Post!</Button>
        </Form>
      </Container>
    )
  }
}

export default PostForm
