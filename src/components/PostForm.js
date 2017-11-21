import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Form, FormGroup, Label, Input } from 'reactstrap'
import FlatButton from 'material-ui/FlatButton'
import { getPost } from '../backendAPI'
import Nav from './Nav'

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
        <Container>
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
            <FlatButton label= {id ? "Edit Post" : "Submit Post" }
              hoverColor="#90CAF9"
              type="submit"
              >
            </FlatButton>
            <Link to="/"><FlatButton label="Cancel" hoverColor="#FF8A80"></FlatButton></Link>
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
