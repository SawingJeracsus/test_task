import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { MainPage } from './pages/Main';
import { ProductPage } from './pages/Product';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/product/:id'>
            <ProductPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
