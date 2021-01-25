import React, { Component } from 'react';
import '../css/App.css';
import Upload from './Upload'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Simulator from './Simulator'

class App extends Component {

  render(): JSX.Element {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Upload} />
            <Route exact path="/site" component={Simulator} />
          </Switch>
        </div>
      </Router>
     
    );
  }
}


export default App;
