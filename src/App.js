import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Main from './components/Main/Main';

const App = () => (
  <Router>
    <Route path='/' exact component={Join} />
    <Route path='/main' exact component={Main} />
  </Router>
);

export default App;
