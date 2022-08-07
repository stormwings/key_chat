import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './components/views/Dashboard';
import Login from './components/views/Login';
import Register from './components/views/Register';

const Router = () => {
  return (
    <div className="container">
      <div id="responsive--screen">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Router;

const NoMatch = () => <Redirect to="/login" />;