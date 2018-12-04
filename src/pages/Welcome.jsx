import React, { Component, Fragment } from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import NavbarWelcome from '../partials/Navbar/NavbarWelcome'
import styles from '../css/Welcome.css'

class Welcome extends Component {
  renderVideo = () => (
    <iframe
      width="100%"
      height="300"
      src="https://www.youtube.com/embed/dtbh_wdjwxk"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope;"
      allowfullscreen
    >
    </iframe>
  )

  renderMenu = () => (
    <Fragment>
      <Row>
        <Col md={{ size: 12 }}>
          <Link to="/sign_in">
            <div className="anchor-as supplier">As a Supplier</div>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 12 }}>
          <div className="or-separator">OR</div>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 12 }}>
          <Link to="/sign_in_partner">
            <div className="anchor-as partner">As a Partner</div>
          </Link>
        </Col>
      </Row>
    </Fragment>
  )

  renderCopyRight = () => (
    <Row>
      <Col md={{ size: 12 }} className="quote-container">
        <div>"Now, you will love this."</div>
        <div>- Trashbuddy -</div>
      </Col>
    </Row>
  )

  render() {
    return <Fragment>
      <NavbarWelcome />
      <div styleName="Welcome">
        <Container>
          <Row>
            <Col md={{ size: 6 }}>
              {this.renderVideo()}
            </Col>
            <Col md={{ size: 6 }} className="right-side">
              {this.renderMenu()}
              {this.renderCopyRight()}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  }
}

export default CSSModules(Welcome, styles, { allowMultiple: true })
