import React, { Component } from 'react';
import OptionForm from './OptionForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  handleData(shares, outstanding, strike, enter, exit) {
    alert('Submitted');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <OptionForm addData={this.handleData} />
      </div>
    );
  }
}

export default App;
