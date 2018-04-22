import React, { Component } from 'react';
import Grant from './Grant';
import PropTypes from 'prop-types';
import './Report.css'

class Report extends Component {
  static propTypes = {
  allOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return (
      <div className="Report">
        <h4>Your Stock Records</h4>
        {this.props.allOptions.map((grant, i) => (
        <Grant key={i} {...grant} />
      ))}
      </div>
    );
  }
}

export default Report;
