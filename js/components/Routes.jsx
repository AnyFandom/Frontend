import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import React, {PropTypes} from 'react';

import Layout from './Layout'
import Index from '../containers/Index'
import ShowPost from '../containers/ShowPost'
import AddPost from '../containers/AddPost'
import EditPost from '../containers/EditPost'
import Api from '../Api'

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/app' component={Layout}>
          <IndexRoute component={Index} />
          <Route path='posts/add' component={AddPost} />
          <Route path='posts/:id' component={ShowPost} />
          <Route path='posts/:id/edit' component={EditPost} />
        </Route>
      </Router>
    )
  }
}

export default AppRouter
