import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListCustomerComponent from './components/ListCustomerComponent';
import EditCustomerComponent from './components/EditCustomerComponent';
import LoginCustomerComponent from './components/LoginComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={LoginCustomerComponent}></Route>
            <Route path="/customers" component={ListCustomerComponent}></Route>
            <Route path="/edit-customers/:id" component={EditCustomerComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;
