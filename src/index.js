import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css'

import { Provider } from 'react-redux'
import { createStore,  applyMiddleware, compose } from 'redux'
import reducer from './reducers'
// fetchposts is asynchronous call, gets all posts
import { fetchPosts } from './actions/posts'
import thunk from 'redux-thunk'

// allows us to use redux tools and the thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// added thunk since we need to some middleware for asynchronous calls
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))
// used dispatch directly to update the store only at the beginning
// i dont want to fetch the posts everytime, use the cache unless its completely refreshed
// byt the user
// note i had to invoke fetchposts action when passing it to store.dispatch, this way the second
// function would be returned
store.dispatch(fetchPosts())
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
