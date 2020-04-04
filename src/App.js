import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Mapbox from './components/mapbox';
import GoogleMap from './components/google-map';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/mapbox" component={Mapbox} />
        <Route path="/google-map" component={GoogleMap} />
        <Redirect to="/mapbox" />
      </Switch>
    </Router>
  );
}

export default App;
