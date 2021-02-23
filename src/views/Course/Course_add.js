import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  CardHeader,
} from "reactstrap";
import { HttpCallPost, HttpCallGet, handleError } from "../../apis/usehttps";
import { GET, POST } from "../../apis/constants";
import { Course } from "../../apis/Network";
import axios from "axios";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import Loader from "../../component/loader/loader";

export default class Add_course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      errors: {},
    };
  }

  handleonInput = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
    });
  };
  //
  validate = () => {
    let course = this.state.fullname;
    let couresShortName = this.state.shortname;

    let errors = {};
    let isValid = true;

    if (!course) {
      isValid = false;
      errors["course"] = "Please enter course name.";
    }
    if (!couresShortName) {
        isValid = false;
        errors["couresShortName"] = "Please enter course short name.";
      }
    this.setState({
      errors: errors,
    });

    return isValid;
  };
  //
  onSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      var data = {
        couresName: this.state.fullname,
        shortName: this.state.shortname,
      };
      this.setState({ submitButton: true, loader: true });
      const userdata = localStorage.getItem("token");

      HttpCallPost(`${Course}`, POST, userdata, data)
        .then((res) => {
          this.setState({ submitButton: true, loader: false });
          this.props.history.push('course');
        })
        .catch((err) => {
          this.setState({ submitButton: true, loader: false });
        });
    }
  };
  render() {
    return (
      <div>
        {" "}
        {this.state.loader ? (
          <Loader loading={true} />
        ) : (
          <Card>
            <CardHeader>
              <h3>ADD NEW COURSE</h3>
            </CardHeader>
            <CardBody>
              <div>
                <div className="md-4">
                  <FormGroup>
                    <Col md="3">
                      <Label htmlFor="selectLg">Enter Course Full Name</Label>
                    </Col>
                    <Col xs="12" md="9" size="lg">
                      <Input
                        type="text"
                        name="fullname"
                        id="selectLg"
                        bsSize="lg"
                        onChange={this.handleonInput}
                      />
                      <div className="text-danger">
                        {this.state.errors.course}
                      </div>
                    </Col>
                  </FormGroup>
                </div>
                <div className="md-4">
                  <FormGroup>
                    <Col md="3">
                      <Label htmlFor="selectLg">Enter Course Short Name</Label>
                    </Col>
                    <Col xs="12" md="9" size="lg">
                      <Input
                        type="text"
                        name="shortname"
                        id="selectLg"
                        bsSize="lg"
                        onChange={this.handleonInput}
                      />
                        <div className="text-danger">
                        {this.state.errors.couresShortName}
                      </div>
                    </Col>
                  </FormGroup>
                </div>
                <div className="md-4">
                  <FormGroup>
                    <Col xs="12" md="9" size="lg">
                      <Button
                        className="btn btn-success"
                        onClick={(event) => this.onSubmit(event)}
                        bsSize="lg"
                      >
                        Submit
                      </Button>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}
