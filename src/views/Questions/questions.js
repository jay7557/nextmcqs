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
import { GET, POST, PUT } from "../../apis/constants";
import { Course, Subject, Question, Test } from "../../apis/Network";
export default class QuestionsPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      testId: "",
      test: {},
      totalQue: [],
    };
  }

  handleonInput = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {});
  };

  componentDidMount = () => {
    this.getTest();
  };

  validate = () => {
    let question = this.state.question;
    let rightAnswer = this.state.rightAnswer;
    let wrongAnswer = this.state.wrongAnswer;
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
      errors["rightAnswer"] = "Please enter Right answer.";
    }
    if (!wrongAnswer) {
      isValid = false;
      errors["wrongAnswer"] = "Please enter Wrong answer.";
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
        testId: this.state.testId,
        question: this.state.question,
        ansA: this.state.wrongAnswer,
        ansB: this.state.wrongAnswer1,
        ansC: this.state.wrongAnswer2,
        ansD: this.state.wrongAnswer3,
        rightAns: this.state.rightAnswer,
      };
      console.log("data_newww", data);
      const userdata = localStorage.getItem("token");

      HttpCallPost(`${Test}`, PUT, userdata, data)
        .then((res) => {
          console.log("add coures", res.data);
          this.getTest();

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
  getTest = () => {
    this.setState({ testId: localStorage.getItem("testId") });
    let testId = localStorage.getItem("testId");
    const userdata = localStorage.getItem("token");
    console.log("testId", testId);
    HttpCallGet(`${Test}/${testId}`, GET, userdata)
      .then((res) => {
        console.log("resp", res.data.data[0].questions);
        this.setState({
          test: res.data.data[0],
          totalQue: res.data.data[0].questions,
        });
      })
      .catch((err) => {
        // handleError(err)
      });
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <h3>{this.state.test.testName} </h3>
          <h3>Total Question {this.state.totalQue.length}</h3>
        </CardHeader>
        <CardBody>
            <div>
                {this.state.totalQue.map((item,i)=>{
                    return(
                        <div>
                            <Row>
                              
                                <span>{i+1  }.  </span>
                                <p style={{marginInlineStart:"5px"}}>  {item.question}</p>
                            </Row>
                            <Row>
                                <div className='col-sm-2'>A.  {item.ansA}</div>
                                <div className='col-sm-2'>B.  {item.ansB}</div>
                                <div className='col-sm-2'>C.  {item.ansC}</div>
                                <div className='col-sm-2'>D.  {item.ansD}</div>
                                <div className='col-sm-2'>Right Answer.  {item.rightAns}</div>

                            </Row>
                        </div>
                    )
                })}
            </div>
        </CardBody>
      </Card>
    );
  }
}
