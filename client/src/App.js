import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./routes/login";
import Index from "./routes/index";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login}></Route>
        <Route path="/index" component={Index}></Route>
      </Switch>
    </Router>
  );
}

export default App;
