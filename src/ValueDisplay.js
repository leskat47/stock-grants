import React, { Component } from 'react';

class ValueDisplay extends Component {

  render() {
    return (
      <div>
        {this.props.totalValue}
      </div>
    )
  }
}

export default ValueDisplay;
