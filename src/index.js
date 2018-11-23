import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { searchRobots, requestRobots } from './reducers';
import 'tachyons';

//createLogger is a function Middleware from 'redux-logger' npm package that logs actions and reducers 
//for debugging purposes
const logger = createLogger();

const rootReducer = combineReducers({ searchRobots, requestRobots });
//create our Redux store from a root reducer (which combines all reducers). We second param is where we pass 
//any middleware such as createLogger (for console logging - debugging) and thunkMiddleware, which 
//handles async actions (such as the one we will need for fetching users API to populate the robots array).
//Note the Middlewares will be executed in the order they're passed as params.
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker();
