import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { getComment } from '../backendAPI'
import FormButtons from './FormButtons'

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
    const { id, handleSubmit, handleCancel } = this.props
    return (
      <Form onSubmit={(e) => handleSubmit(e, id)}>
        <FormGroup>
          <Label for="author">Comment</Label>
          <Input type='textarea' name='body' value={this.state.body} onChange={this.onChangeHandler}/>
        </FormGroup>
        <FormGroup>
          {
            id ? <div>{`-  ${this.state.author}`}</div>
              : <div>
                  <Label for="author">Author</Label>
                  <Input name='author' value={this.state.author} onChange={this.onChangeHandler}/>
                </div>
          }

        </FormGroup>
        <FormButtons id={id} formType="Comment" handleCancel={handleCancel}/>
      </Form>
    )
  }
}

export default CommentForm
