import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import OptionForm from './OptionForm/OptionForm';
import Report from './Report/Report';
import './App.css';
var moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    if (cookies.get('grants') === "undefined") {
      this.state = { grants: [] };
    } else {
      this.state = { grants: cookies.get('grants') };
    }
    this.handleData = this.handleData.bind(this);
    this.updateCookies = this.updateCookies.bind(this);
  }

  static propTypes = {
      cookies: instanceOf(Cookies).isRequired

  };
  handleData (shares, outstanding, strike, enter, exit, valuation, total, annual) {
    this.setState({
        grants: [{shares: shares, outstanding: outstanding,
                        strike: strike, enter: enter, exit: exit, valuation: valuation,
                        total: total, annual: annual},
                        ...this.state.grants],
    }, this.updateCookies)
  }

  updateCookies () {
    const { cookies } = this.props;
    cookies.set('grants', this.state.grants, { path: '/' });
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
        <Report allOptions={this.state.grants}/>
      </div>
    );
  }
}

export default withCookies(App);
