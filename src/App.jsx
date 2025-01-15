import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ClientDetails from './Components/ClientDetails';
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Switch>
        {!isLoggedIn ? (
          <Route path="/" exact render={() => <Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" exact component={Dashboard} />
            <Route path="/client/:id" component={ClientDetails} />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;