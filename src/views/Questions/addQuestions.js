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
import { Course, Subject, Question, Test } from "../../apis/Network";
export default class AddQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  handleonInput = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {});
  };

  componentDidMount = () => {
  };
 
  validate = () => {
    let question = this.state.question;
    let rightAnswer = this.state.rightAnswer;
    let wrongAnswer1 = this.state.wrongAnswer1;
    let wrongAnswer2 = this.state.wrongAnswer2;
    let wrongAnswer3 = this.state.wrongAnswer3;
    let errors = {};
    let isValid = true;

    if (!question) {
      isValid = false;
      errors["question"] = "Please enter question.";
    }
    if (!rightAnswer) {
      isValid = false;
      errors["rightAnswer"] = "Please enter right answer.";
    }
    if (!wrongAnswer1) {
      isValid = false;
      errors["wrongAnswer1"] = "Please enter wrong Answer1.";
    }
    if (!wrongAnswer2) {
      isValid = false;
      errors["wrongAnswer2"] = "Please enter wrong answer.";
    }
    if (!wrongAnswer3) {
      isValid = false;
      errors["wrongAnswer3"] = "Please enter wrong Answer.";
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      var data = {
        testName: this.state.testName,
        courseId: this.state.courseId,
      };
      console.log("data_newww", data);
      const userdata = localStorage.getItem("token");

      HttpCallPost(`${Test}`, POST, userdata, data)
        .then((res) => {
          console.log("add coures", res);
          // this.props.history.push('questions');
        })
        .catch((err) => {
          // handleError(err)
          console.log("sjksdjbksajagk.jsdskhu", err);
        });
    }
  };
  onBack = () => {
    this.props.history.push("questions");
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <h3>Test </h3>
        </CardHeader>
        <CardBody>
          <div>
            <div className="md-4">
              <FormGroup>
                <Col md="3">
                  <Label htmlFor="selectSm">Questions</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="question"
                    onChange={this.handleonInput}
                    id="SelectLm"
                    bsSize="sm"
                    placeholder="type questions here"
                  />
                 <div className="text-danger">
                    {this.state.errors.question}
                  </div>
                </Col>
              </FormGroup>
            </div>
            <div className="md-4">
              <FormGroup>
                <Col md="3">
                  <Label htmlFor="selectSm">Right Answer</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="rightAnswer"
                    onChange={this.handleonInput}
                    id="SelectLm"
                    bsSize="sm"
                    placeholder="type answer here"
                  />
                 <div className="text-danger">
                    {this.state.errors.rightAnswer}
                  </div>
                </Col>
              </FormGroup>
            </div>
            <div className="md-4">
              <FormGroup>
                <Col md="3">
                  <Label htmlFor="selectSm">Wrong Answer</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="wrongAnswer1"
                    onChange={this.handleonInput}
                    id="SelectLm"
                    bsSize="sm"
                    placeholder="type answer here"
                  />
                 <div className="text-danger">
                    {this.state.errors.wrongAnswer1}
                  </div>
                </Col>
              </FormGroup>
            </div>
            <div className="md-4">
              <FormGroup>
                <Col md="3">
                  <Label htmlFor="selectSm">Wrong Answer</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="wrongAnswer2"
                    onChange={this.handleonInput}
                    id="SelectLm"
                    bsSize="sm"
                    placeholder="type answer here"
                  />
                 <div className="text-danger">
                    {this.state.errors.wrongAnswer2}
                  </div>
                </Col>
              </FormGroup>
            </div>
            <div className="md-4">
              <FormGroup>
                <Col md="3">
                  <Label htmlFor="selectSm">Wrong Answer</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="wrongAnswer3"
                    onChange={this.handleonInput}
                    id="SelectLm"
                    bsSize="sm"
                    placeholder="type answer here"
                  />
                 <div className="text-danger">
                    {this.state.errors.wrongAnswer3}
                  </div>
                </Col>
              </FormGroup>
            </div>
            <FormGroup>
              <Row>
                <Col xs="6" md="1" size="lg">
                  <Button
                    className="btn btn-success"
                    onClick={(event) => this.onSubmit(event)}
                    bsSize="lg"
                  >
                    Submit
                  </Button>
                </Col>
                <Col xs="6" md="1" size="lg">
                  <Button
                    className="btn btn-success"
                    onClick={(event) => this.onBack(event)}
                    bsSize="lg"
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </div>
        </CardBody>
      </Card>
    );
  }
}
