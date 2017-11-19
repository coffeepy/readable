import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { getPost } from '../backendAPI'

class PostForm extends Component {
  state = {
    title: "",
    body: "",
    author: "",
    category: "",
  }
  componentDidMount() {
    console.log(this.props.id);
    if (this.props.id) {
     getPost(this.props.id).then((post)=> this.setState({...post}))
    }
  }
  render() {
    const { categories, handleSubmit, id} = this.props
    const { title, body, author, category } = this.state
    return (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input name="title" value={title}/>
          </FormGroup>
          <FormGroup>
            <Label for="title">Body</Label>
            <Input type="textarea" name="body" value={body} />
          </FormGroup>
          <FormGroup>
            <Label for="author" >Author</Label>
            <Input name="author" value={author} />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            {
              category
                ? <div>{category}</div>

                : <Input type="select" name="category">
                    {
                      categories.map((cat)=> <option key={cat.name}>{cat.name}</option>)

                    }
                  </Input>
            }
          </FormGroup>
          <Button type="submit">Post!</Button>
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
