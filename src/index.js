import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import Forums from './layouts/forums/Forums'
import Profile from './user/layouts/profile/Profile'

// Redux Store
import store from './store'
import Switch from 'react-router-dom/Switch';

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/forums" component={Forums} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
