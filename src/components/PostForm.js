import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form, FormGroup, Label, Input } from 'reactstrap'
import { getPost } from '../backendAPI'
import Nav from './Nav'
import Post404   from './Post404'
import FormButtons from './FormButtons'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      author: "",
      category: "",
      error404: false,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  componentDidMount() {
    this.props.id &&
      getPost(this.props.id).then((post)=> {
        console.log('post', post.id);
        return post.id
          ? this.setState({...post})
          : this.setState({error404: true})
      }
      )
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
    const { title, body, author, category, error404 } = this.state
    return (
      error404
        ?<Post404 />
        :<Container>
            <Nav hideNewBtn={true}/>
            <Form onSubmit={handleSubmit}>
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
              <FormButtons id={id} formType="Post"/>
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

export default connect(mapStateToProps)(PostForm)
