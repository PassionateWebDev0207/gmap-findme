import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Mapbox from './components/mapbox';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Mapbox} />
      </Switch>
    </Router>
  );
}

export default App;
