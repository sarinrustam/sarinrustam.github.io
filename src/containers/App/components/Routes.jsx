import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import WorkoutTable from '../../TableContainer/index';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={WorkoutTable} />
  </Switch>
);

export default hot(module)(Routes);
