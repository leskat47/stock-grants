import React, { Component } from 'react';
import './OptionForm.css';
import PropTypes from 'prop-types';
var moment = require('moment');

class OptionForm extends Component {
  constructor(props) {
    super();
    this.state = {
      shares: '',
      outstandingShares: '',
      strikePrice: '',
      exitValuation: '',
      enterDate: '',
      exitDate: '',
      totalValue: '--',
      annualValue: '--'
    };
    this.isEnabled = this.validateInput();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  static propTypes = {
    addData: PropTypes.func.isRequired,
    calculateTotal: PropTypes.func.isRequired,
    calculateAnnual: PropTypes.func.isRequired,
  }

  validateInput() {
    var { shares,
        outstandingShares,
        strikePrice,
        exitValuation,
        enterDate,
        exitDate,
        totalValue,
        annualValue} = this.state;
    const blanks = [shares, outstandingShares, strikePrice, exitValuation].filter(x => (x === 0) || (x === ''))

    if (blanks.length || totalValue === '--') {
      return false
    }
    return true
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if ((name === 'exitDate' && this.state.enterDate) || (name === 'enterDate' && this.state.exitDate)) {
      if (moment(this.state.enterDate) > moment(value, "YYYY-MM-DD")){
        this.setState({'dateError': "Exit date must be greater than enter date."})
      } else {
        this.setState({ 'dateError': '' });
      }
    }

    if (['shares', 'outstandingShares', 'strikePrice', 'exitValuation'].includes(name) ) {
      if (value < 0 || value === '') {
        event.target.nextSibling.removeAttribute("hidden");
      } else if (!event.target.nextSibling.getAttribute("hidden")){
        event.target.nextSibling.setAttribute("hidden", true);
      }
    }

    this.setState({ [name]: value }, this.getReturn);
    this.isEnabled = this.validateInput();
  }

  getReturn() {
    if (this.state.exitDate && this.state.enterDate && this.state.outstandingShares) {
      const total = this.props.calculateTotal(this.state.shares,
                                              this.state.outstandingShares,
                                              this.state.exitValuation,
                                              this.state.strikePrice)
      if (total > 0) {
        this.setState({'totalValue': total}, this.getAnnual);
      } else {
        this.setState({'totalValue': '--', 'annualValue': '--'});
      }
    }
  }

  getAnnual() {
      let annual = this.props.calculateAnnual(this.state.enterDate,
                                              this.state.exitDate,
                                              this.state.totalValue)
      this.setState({'annualValue': annual})
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addData(this.state.shares,
                       this.state.outstandingShares,
                       this.state.strikePrice,
                       this.state.enterDate,
                       this.state.exitDate,
                       this.state.exitValuation,
                       this.state.totalValue,
                       this.state.annualValue
                     )
  }

  render() {
    return (
    <div className="OptionForm">
    <form onSubmit={this.onSubmit}>
      <p>
      <label>
        Number of Shares: <input
                          name="shares"
                          type="number"
                          min="0"
                          value={this.state.shares}
                          onChange={this.handleInputChange} />
                          <span className="error" hidden> Enter valid amount</span>
      </label>
      </p>
      <p>
      <label>
        Number of Shares Outstanding: <input
                          name="outstandingShares"
                          type="number"
                          min="0"
                          required
                          value={this.state.outstandingShares}
                          onChange={this.handleInputChange} />
                          <span className="error" hidden> Enter valid amount</span>
      </label>
      </p>
      <p>
      <label>
        Strike/Exercise Price: <input
                          name="strikePrice"
                          type="number"
                          min="1"
                          step='0.0001'
                          placeholder='0.00'
                          value={this.state.strikePrice}
                          onChange={this.handleInputChange} />
                          <span className="error" hidden> Enter valid amount</span>
      </label>
      </p>
      <p>
      <label>
        Enter date: <input
                          name="enterDate"
                          type="date"
                          value={this.state.enterDate}
                          onChange={this.handleInputChange} />
      </label> <span className="error"> {this.state.dateError}</span>
      </p>
      <p>
      <label>
        Exit date: <input
                          name="exitDate"
                          type="date"
                          value={this.state.exitDate}
                          onChange={this.handleInputChange} />
      </label> <span className="error"> {this.state.dateError}</span>
      </p>
      <p>
      <label>
        Exit valuation: <input
                          name="exitValuation"
                          type="number"
                          min="0"
                          step='0.01'
                          placeholder='0.00'
                          value={this.state.exitValuation}
                          onChange={this.handleInputChange} />
                          <span className="error" hidden> Enter valid amount </span>
      </label>
      </p>

      <p>
      Total Value: $ {this.state.totalValue}
      </p>
      <p>
      Annual Value: $ {this.state.annualValue}
      </p>
      <p>
        <input type="submit" className="btn" value="Add to My Records" disabled = { !this.isEnabled } />
      </p>
    </form>
    </div>
  )
  }
}

export default OptionForm;
