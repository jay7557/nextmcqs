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
export default class AddTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_list: [],
      errors:{}
    };
  }

  handleonInput = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {});
  };

  componentDidMount = () => {
    this.getCouresList();
  };
  getCouresList = () => {
    const userdata = localStorage.getItem("token");
    HttpCallGet(`${Course}`, GET, userdata)
      .then((res) => {
        this.setState({ course_list: res.data.data });
      })
      .catch((err) => {
        // handleError(err)
      });
  };
  validate = () => {
    let testName = this.state.testName;
    let courseId = this.state.courseId;

    let errors = {};
    let isValid = true;

    if (!testName) {
      isValid = false;
      errors["testName"] = "Please enter test name.";
    }
    if (!courseId) {
      isValid = false;
      errors["courseId"] = "Please select course.";
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
        this.props.history.push('addquestions');
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
                  <Label htmlFor="selectSm">Text Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="testName"
                    onChange={this.handleonInput}
                    id="SelectLm"
                    bsSize="sm"
                  />
                  <div className="text-danger">
                    {this.state.errors.testName}
                  </div>
                </Col>
              </FormGroup>
            </div>

            <div className="md-4">
              <FormGroup>
                <Col md="3">
                  <Label htmlFor="selectSm">Select Course</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="select"
                    name="courseId"
                    onChange={this.handleonInput}
                    id="SelectLm"
                    bsSize="sm"
                  >
                    <option value="">select</option>

                    {this.state.course_list.map((item, i) => {
                      return (
                        <option value={item._id}>{item.couresName}</option>
                      );
                    })}
                  </Input>
                  <div className="text-danger">
                    {this.state.errors.courseId}
                  </div>
                </Col>
              </FormGroup>
            </div>
            {/* <div className='md-4'>
                            <FormGroup>
                                <Col md="3">
                                    <Label htmlFor="selectSm">Select Subject</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="select" name="subject_id" onChange={this.handleonInput} id="subject_id" bsSize="sm">
                                        {this.state.SubjectList.map((item, i) => {
                                            
                                            return (
                                                <option value={item.id}>{item.subject_name}</option>
                                            )
                                        })}
                                    </Input>
                                    {(this.state.subject_validation === true) ?
                                        <label className='text-danger'>please select subject</label>
                                        : null}
                                </Col>
                            </FormGroup>
                        </div> */}
            {/* <div className='md-4'>
                            <FormGroup>
                                <Col md="3">
                                    <Label htmlFor="selectSm">Questions</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" name="question" onChange={this.handleonInput} id="SelectLm" bsSize="sm" placeholder='type questions here' />
                                    {(this.state.question_validation === true) ?
                                        <label className='text-danger'>please enter question</label>
                                        : null}
                                </Col>
                            </FormGroup>
                        </div>
                        <div className='md-4'>
                            <FormGroup>
                                <Col md="3">
                                    <Label htmlFor="selectSm">Right Answer</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" name="right_answer" onChange={this.handleonInput} id="SelectLm" bsSize="sm" placeholder='type answer here' />
                                    {(this.state.right_answer_validation === true) ?
                                        <label className='text-danger'>please enter right answer</label>
                                        : null}
                                </Col>
                            </FormGroup>
                        </div>
                        <div className='md-4'>
                            <FormGroup>
                                <Col md="3">
                                    <Label htmlFor="selectSm">Wrong Answer</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" name="wrong_answer1" onChange={this.handleonInput} id="SelectLm" bsSize="sm" placeholder='type answer here' />
                                    {(this.state.wrong_answer_validation1 === true) ?
                                        <label className='text-danger'>please enter answer</label>
                                        : null}
                                </Col>
                            </FormGroup>
                        </div>
                        <div className='md-4'>
                            <FormGroup>
                                <Col md="3">
                                    <Label htmlFor="selectSm">Wrong Answer</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" name="wrong_answer2" onChange={this.handleonInput} id="SelectLm" bsSize="sm" placeholder='type answer here' />
                                    {(this.state.wrong_answer_validation2 === true) ?
                                        <label className='text-danger'>please enter answer</label>
                                        : null}
                                </Col>
                            </FormGroup>
                        </div>
                        <div className='md-4'>
                            <FormGroup>
                                <Col md="3">
                                    <Label htmlFor="selectSm">Wrong Answer</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" name="wrong_answer3" onChange={this.handleonInput} id="SelectLm" bsSize="sm" placeholder='type answer here' />
                                    {(this.state.wrong_answer_validation3 === true) ?
                                        <label className='text-danger'>please enter answer</label>
                                        : null}
                                </Col>
                            </FormGroup>
                        </div> */}
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
