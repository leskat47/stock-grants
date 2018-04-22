import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import "./Grant.css"

class Message extends Component {

  render() {
    return (
      <div className="Grant">
          <p>Enter date: {this.props.enter}</p>
          <p>Exit date: {this.props.exit}</p>
          <p>Number of shares: {this.props.shares}</p>
          <p>Total value: $ {this.props.total}</p>
          <p>Total annual value: $ {this.props.annual}</p>

      </div>
    )
  }
}

export default Message
