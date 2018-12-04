import React, { Component, Fragment } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardLink,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
  Alert
} from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import map from 'lodash/map'
import startCase from 'lodash/startCase'
import CSSModules from 'react-css-modules'
import AsyncSelect from 'react-select/lib/Async'

import Notify from '../partials/Notify'
import NavbarWelcome from '../partials/Navbar/NavbarWelcome'
import loader from '../img/loader.svg'
import styles from '../css/SignUp.css'
class SignUpPartner extends Component {
  state = {
    email: "",
    password: "",
    password_1: "",
    full_name: "",
    phone_number: "",
    area: "",
    address: "",
    errorSignUpPartnerMessage: "",
    errorSignUpPartner: false,
    submitting: false,
    successSignUpPartner: false,
    optionsArea: []
  }

  componentDidMount() {
    this.getOptionsArea()
  }

  getOptionsArea() {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL_MAIN_API}/areas`
    })
      .then(response => {
        this.setterDataAreas(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  setterDataAreas = (response) => {
    const DATA = []
    let area = ''
    map(response.data, (val) => {
      area = startCase(val.province_name) + ", " +
        startCase(val.district_name) + ", " +
        startCase(val.sub_district_name)
      DATA.push({
        "value": val.sub_district_id,
        "label": area
      })
    })
    this.setState({ optionsArea: DATA })
  }

  handleChangeArea = (area) => {
    this.setState({ area: area.value })
  }

  loadOptionsArea = (input, callback) => {
    const DATA = this.state.optionsArea
    if (input.length > 3) {
      let optionsArea = DATA.filter(i =>
        i.label.toLowerCase().includes(input.toLowerCase())
      )
      setTimeout(() => {
        callback(optionsArea)
      }, 1000)
    }
  }

  handleInputChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    }, () => {
      if (name === "password" || name === "password_1") {
        (this.state.password !== this.state.password_1) ?
          this.setState({
            errorSignUpPartnerMessage: "Password and Confirmation Password are not match",
            errorSignUpPartner: true
          }) :
          this.setState({ errorSignUpPartner: false })
      }
    })
  }

  handleSuccessSignUpPartner = (res) => {
    if (res.data.success) {
      this.setState({
        successSignUpPartner: true
      })
    }
    else {
      this.setState({
        errorSignUpPartner: true,
        errorSignUpPartnerMessage: res.data.message
      })
    }
  }

  renderSuccessMsg = () => (
    <div className="success-msg">
      <Alert color="success">
        Sounds good, our team will be contact you for activate your account via your email or phone number as soon as possible.
      </Alert>
      <Link to="/"><Button color="link">Goto Home</Button></Link>/
      <Link to="/sign_in_partner">
        <Button color="link">Sign In Partner</Button>
      </Link>
    </div>
  )

  handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    this.setState({ submitting: true })

    const data = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.full_name,
      phone_number: this.state.phone_number,
      area: this.state.area,
      address: this.state.address
    }

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_URL_MAIN_API}/partner`,
      data: data
    })
      .then(res => {
        this.handleSuccessSignUpPartner(res)
      })
      .catch(error => {
        this.setState({ errorSignUpPartner: true, errorSignUpPartnerMessage: "Sorry, our system is busy now :(" })
      })
      .then(() => {
        this.setState({ submitting: false })
      })
  }

  handleShowAlert = () => {
    this.setState({ errorSignUpPartner: false })
  }

  renderAlert = () => (
    <Notify
      type="danger"
      isOpen={this.state.errorSignUpPartner}
      toggle={this.handleShowAlert}
      message={this.state.errorSignUpPartnerMessage}
    />
  )

  renderFormSignUpPartner = () => (
    <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label>Email</Label>
        <Input
          required="required"
          type="email"
          name="email"
          placeholder="please input valid email"

          onChange={this.handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          required="required"
          type="password"
          name="password"
          placeholder="input your password"
          onChange={this.handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Confirmation Password</Label>
        <Input
          required="required"
          type="password"
          name="password_1"
          placeholder="input your password again"
          onChange={this.handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Full Name</Label>
        <Input
          required="required"
          type="text"
          name="full_name"
          placeholder="input your full name"
          onChange={this.handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Area</Label>
        <AsyncSelect
          classNamePrefix="select-input"
          cacheOptions
          loadOptions={this.loadOptionsArea}
          defaultOptions
          loadingMessage={() => "minimal 3 character"}
          noOptionsMessage={() => "area is not found"}
          onChange={this.handleChangeArea}
        />
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Input
          required="required"
          type="textarea"
          name="address"
          placeholder="input your address"
          onChange={this.handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Phone Number</Label>
        <Input
          required="required"
          type="text"
          name="phone_number"
          placeholder="input your active phone number"
          onChange={this.handleInputChange}
        />
      </FormGroup>
      <CardText>
        <small className="text-muted">
          Click Sign Up button is accept our <CardLink href="#">Terms and Privacy</CardLink>
        </small>
      </CardText>
      <FormGroup>
        <Button
          color="main"
          size="md"
          block
          disabled={this.state.submitting}
        >
          {this.state.submitting ? <img src={loader} /> : "Sign Up"}
        </Button>
      </FormGroup>
    </Form>
  )

  renderLinks = () => (
    <CardText>
      <small className="text-muted">
        <Link to="/">About</Link>
        {} . <Link to="/sign_in_partner">Sign In</Link>
      </small>
    </CardText>
  )

  render() {
    return <Fragment>
      {this.renderAlert()}
      <NavbarWelcome atSignUpPartnerPage={true} />
      <div styleName="SignUp">
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              {
                this.state.successSignUpPartner ?
                  this.renderSuccessMsg() :
                  <Card>
                    <CardBody>
                      <CardTitle className="text-center">
                        Sign Up <Badge color="secondary" className="badge-partner">Partner</Badge>
                      </CardTitle>
                      {this.renderFormSignUpPartner()}
                      {this.renderLinks()}
                    </CardBody>
                  </Card>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  }
}

export default CSSModules(SignUpPartner, styles, { allowMultiple: true })