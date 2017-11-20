import React, { Component } from 'react'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { getComment } from '../backendAPI'

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      author: "",
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }
  componentDidMount() {
    if (this.props.id) {
     getComment(this.props.id).then((post)=> this.setState({...post}))
    }
  }
  render() {
    const { id, handleSubmit } = this.props
    return (
      <Form onSubmit={(e) => handleSubmit(e, id)}>
        <FormGroup>
          <Input type='textarea' name='body' value={this.state.body} onChange={this.onChangeHandler}/>
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          {
            id ? <div>{this.state.author}</div>
              :  <Input name='author' value={this.state.author} onChange={this.onChangeHandler}/>
          }

        </FormGroup>
          <Button type="submit">
            {id ? "Edit " : "Submit "}
            Comment
          </Button>
      </Form>
    )
  }
}

export default CommentForm