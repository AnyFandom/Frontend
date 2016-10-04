import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import React, {PropTypes} from 'react';

import Layout from './Layout'
import Index from '../containers/Index'
import ShowPost from '../containers/ShowPost'
import AddPost from '../containers/AddPost'
import EditPost from '../containers/EditPost'
import ShowUsers from '../containers/ShowUsers'
import ShowUser from '../containers/ShowUser'
import EditUser from '../containers/EditUser'
import ShowFandoms from '../containers/ShowFandoms'
import ShowFandom from '../containers/ShowFandom'
import ShowBlog from '../containers/ShowBlog'
import AddFandom from '../containers/AddFandom'
import EditFandom from '../containers/EditFandom'
import EditBlog from '../containers/EditBlog'
import AddBlog from '../containers/AddBlog'
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
          <Route path='users' component={ShowUsers} />
          <Route path='users/:username' component={ShowUser} />
          <Route path='users/:username/edit' component={EditUser} />
          <Route path='fandoms' component={ShowFandoms} />
          <Route path='fandoms/add' component={AddFandom} />
          <Route path='fandoms/:id' component={ShowFandom} />
          <Route path='fandoms/:id/edit' component={EditFandom} />
          <Route path='blogs/add' component={AddBlog} />
          <Route path='blogs/:id' component={ShowBlog} />
          <Route path='blogs/:id/edit' component={EditBlog} />
        </Route>
      </Router>
    )
  }
}

export default AppRouter
