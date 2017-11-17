import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css'

import { Provider } from 'react-redux'
import { createStore,  applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { fetchPosts } from './actions'
import thunk from 'redux-thunk'

// allows us to use redux tools and the thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))
store.dispatch(fetchPosts())
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
