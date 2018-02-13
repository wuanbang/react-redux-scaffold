import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';

const rootElement = document.getElementById('container');
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App} >
                <IndexRoute component={HomePage} />
            </Route>
        </Router>
    </Provider>,
    rootElement
);