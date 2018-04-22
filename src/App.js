import React, { Component } from 'react';
import OptionForm from './OptionForm';
import Report from './Report';
import './App.css';
var moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockOptions: []
    }
    this.handleData = this.handleData.bind(this);
  }

  handleData(shares, outstanding, strike, enter, exit, valuation, total, annual) {
    this.setState({
        stockOptions: [{shares: shares, outstanding: outstanding,
                        strike: strike, enter: enter, exit: exit, valuation: valuation,
                        total:total, annual: annual},
                        ...this.state.stockOptions],
    })
  }

  calculateTotal (shares, outstanding, valuation, strike) {
    const percentageOwnership = shares/outstanding;
    const total = Math.round((valuation * percentageOwnership) - (shares * strike), 2);
    return total;
  }

  calculateAnnual (enter, exit, total) {
    const timeElapsed = Math.round(moment.duration(moment(exit, "YYYY-MM-DD") -
                                   moment(enter, "YYYY-MM-DD").startOf('day')).asYears(),
                                   2)
    const annual = Math.round(total / timeElapsed, 2)
    return annual;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Option Grant Calculator</h1>
        </header>
        <OptionForm addData={this.handleData} calculateTotal={this.calculateTotal} calculateAnnual={this.calculateAnnual} />
        <Report allOptions={this.state.stockOptions}/>
      </div>
    );
  }
}

export default App;
