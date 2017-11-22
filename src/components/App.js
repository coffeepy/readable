import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
/// component imports
import Categories from './Categories'
import Post from './Post'
import Nav from './Nav'
import CategoryView from './CategoryView'
import NewPostForm from './NewPostForm'
import EditPostForm from './EditPostForm'
import SelectOrder from './SelectOrder'

// style Imports
import { Container, Row, Col } from 'reactstrap'
import Divider from 'material-ui/Divider'

// fetchposts/fetchCats are asynchronous calls, gets all posts from backend
import { fetchPostsOrdered } from '../actions/posts'
import { fetchCats } from '../actions/categories'
import { getAllPosts } from '../backendAPI'

class App extends Component {
  state = {
    categories: [],
  }
  componentDidMount()  {
    // fed in from mapDispatchToProps
    this.props.fetchPosts(this.props.postOrder)
    this.props.fetchCats()
  }
  render() {
    const { posts, cats } = this.props
    return (
      <Container fluid={true}>
        <Route exact={true} path="/" render={()=> {
          return(
            <div>
              <Nav />
              <Row>
                <Col>
                  <h3 className="header">Categories</h3>
                  <Categories cats={cats}/>
                  <Divider />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="header">Posts</h3>
                  <SelectOrder />
                  {
                    posts.map((post)=> <Post key={post.id} id={post.id} fetchPosts={true}/>)
                  }
                </Col>

              </Row>
            </div>
          )
        }}/>
        <Route exact path="/new" component={NewPostForm}/>
        <Route exact path="/edit/post/:id" component={EditPostForm}/>
        <Route exact path="/:category/:id" component={Post}/>
        {/*  Below we create a Route for every possible category */}
        {
          cats.map((cat)=>
            <Route
              key={cat.path}
              exact path={`/${cat.path}`}
              render={()=>
                <CategoryView selectedCat={cat.name}/>
              }
              />
          )
        }
        {/* div to add some scroll room to the site */}
        <div className="scrollRoom"></div>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    cats: state.categories,
    postOrder: state.postOrder,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (key) => dispatch(fetchPostsOrdered(key)),
    fetchCats: () => dispatch(fetchCats()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
