import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  CardHeader,
} from "reactstrap";
import { HttpCallPost, HttpCallGet, handleError } from "../../apis/usehttps";
import { GET, POST } from "../../apis/constants";
import { Course, Subject, Test } from "../../apis/Network";
import "./index.css";
export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_list: [],
      SubjectList: [],
      testList: [],
    };
  }

  handleonInput = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {});
  };

  componentDidMount = () => {
    this.getCouresList();
    this.getTestList();
  };
  getCouresList = () => {
    const userdata = localStorage.getItem("token");
    HttpCallGet(`${Course}`, GET, userdata)
      .then((res) => {
        console.log("jsyad0", res);
        this.setState({ course_list: res.data.data });
      })
      .catch((err) => {
        handleError(err);
      });
  };

  getTestList = () => {
    const userdata = localStorage.getItem("token");
    var id = this.state.subject_id;
    HttpCallGet(`${Test}`, GET, userdata)
      .then((res) => {
        console.log("getTestList", res.data.data);
        this.setState({ testList: res.data.data });
      })
      .catch((err) => {
        // handleError(err)
      });
  };
  onQuestionsPaper=(item)=>{
    localStorage.setItem('testId',item._id)
    this.props.history.push('questionsPaper');
  }
  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> List of Questions
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-md-9">
                <Label htmlFor="selectSm">Select Course</Label>
                <Input
                  type="select"
                  name="course_id"
                  onChange={this.handleonSelect}
                  id="SelectLm"
                  bsSize="ss"
                  className="select-course"
                >
                  <option value="all">All Course</option>;
                  {this.state.course_list.map((item, i) => {
                    return <option value={item.id}>{item.couresName}</option>;
                  })}
                </Input>
              </div>
              <div className="col-md-3">
                <Link to={"/addTest"} className="btn btn-info">
                  {" "}
                  Add New Questions
                </Link>
              </div>
              <div></div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Test List
          </CardHeader>
          <CardBody>
            <div>
              {this.state.testList.map((item, i) => {
                return (
                  <Card onClick={()=>this.onQuestionsPaper(item)}>
                    <CardBody>
                      <div key={i} >
                        <Row>
                          <Col>
                          <h3 >{i+1}</h3>
                          </Col>
                          <Col>
                          <h3>{item.testName}</h3>
                          </Col>
                          <Col>
                          {/* <h3>{item.testName.courseId["couresName"]}</h3> */}
                          </Col>
                        </Row>
                        
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
