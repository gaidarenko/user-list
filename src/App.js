import React, { Component } from 'react';
import './App.css';
import UserManager from './components/UserManager';

class App extends Component {

  render() {
    return (
      <div className="container">
        <UserManager />
      </div>
    );
  }
}

export default App;
