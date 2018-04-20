import React, { Component } from 'react';


class OptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfShares: 0,
      numberOutstanding: 1,
      strikePrice: 0,
      exitDate: 0,
      exitValuation: 0,
      totalValue: 0,
      annualValue: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    });
    if (this.state.enterDate > 0 && this.state.exitDate > 0) {
      // calclulate total and annual value
    }
  }


  onSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    this.props.addData(this.state.numberOfShares,
                       this.state.numberOutstanding,
                       this.state.strikePrice,
                       this.state.enterDate,
                       this.state.exitDate)
  }

  render() {
    return (
    <form onSubmit={this.onSubmit}>
      <p>
      <label>
        Number of Shares: <input
                          name="numberOfShares"
                          type="number"
                          value={this.state.numberOfShares}
                          onChange={this.handleInputChange} />
      </label>
      </p>
      <p>
      <label>
        Number of Shares Outstanding: <input
                          name="numberOutstanding"
                          type="number"
                          value={this.state.numberOutstanding}
                          onChange={this.handleInputChange} />
      </label>
      </p>
      <p>
      <label>
        Strike/Exercise Price: <input
                          name="strikePrice"
                          type="number"
                          step='0.01'
                          placeholder='0.00'
                          value={this.state.strikePrice}
                          onChange={this.handleInputChange} />
      </label>
      </p>
      <label>
        Exit date: <input
                          name="exitDate"
                          type="date"
                          value={this.state.exitDate}
                          onChange={this.handleInputChange} />
      </label>
      <label>
        Exit date: <input
                          name="exitValuation"
                          type="number"
                          step='0.01'
                          placeholder='0.00'
                          value={this.state.exitValuation}
                          onChange={this.handleInputChange} />
      </label>
      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  )
  }
}

export default OptionForm;
