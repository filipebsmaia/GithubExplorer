import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

interface Props {
  toggleTheme(): void;
}

const Routes: React.FC<Props> = ({ toggleTheme }) => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Dashboard toggleTheme={toggleTheme} />}
      />
      <Route path="/repository/:repository+" exact component={Repository} />
    </Switch>
  );
};

export default Routes;
