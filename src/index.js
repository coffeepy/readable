import React from 'react';
import ReactDOM from 'react-dom';
// css imports
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
//local file imports
import App from './components/App';
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
// library imports
import { Provider } from 'react-redux'
import { createStore,  applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

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
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider><App /></MuiThemeProvider>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
