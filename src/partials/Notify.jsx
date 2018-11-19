import React, { Component } from 'react'
import { Alert } from 'reactstrap'
import CSSModules from 'react-css-modules'

import styles from '../css/Notify.css'
class Notify extends Component {
  render() {
    return <div styleName="Notify">
      <Alert
        color={this.props.type}
        className="alert-notify"
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
      >
        {this.props.message}
      </Alert>
    </div>
  }
}

export default CSSModules(Notify, styles, { allowMultiple: true })