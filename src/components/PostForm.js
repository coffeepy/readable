import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { getPost } from '../backendAPI'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      author: "",
      category: "",
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  componentDidMount() {
    console.log(this.props.id);
    if (this.props.id) {
     getPost(this.props.id).then((post)=> this.setState({...post}))
    }
  }
  onChangeHandler(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }
  render() {
    const { categories, handleSubmit, id} = this.props
    const { title, body, author, category } = this.state
    return (
        <Form onSubmit={handleSubmit.bind(this)}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input name="title" value={title} onChange={this.onChangeHandler}/>
          </FormGroup>
          <FormGroup>
            <Label for="title">Body</Label>
            <Input type="textarea" name="body" value={body} onChange={this.onChangeHandler}/>
          </FormGroup>
          <FormGroup>
            <Label for="author" >Author</Label>
            {
              id ?
                <div>{author}</div>
              : <Input name="author" value={author} onChange={this.onChangeHandler}/>
            }

          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            {
              id
                ? <div>{category}</div>

                : <Input type="select" name="category">
                    {
                      categories.map((cat)=> <option key={cat.name}>{cat.name}</option>)

                    }
                  </Input>
            }
          </FormGroup>
          <Button type="submit">
            {id ? "Edit " : "Submit "}
            Post
          </Button>
        </Form>
    )
  }
}
const mapStateToProps = (state)=> {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(PostForm)
