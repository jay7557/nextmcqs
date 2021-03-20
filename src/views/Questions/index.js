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
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { HttpCallPost, HttpCallGet,HttpCallDelete, handleError } from "../../apis/usehttps";
import { GET, POST } from "../../apis/constants";
import { Course, Subject, Test } from "../../apis/Network";
import "./index.css";
var dateFormat = require("dateformat");
export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_list: [],
      SubjectList: [],
      testList: [],
      AllData:[]
    };
  }

  handleonSelect = (event) => {
    let subject = event.target.value
    if(subject ==="all"){
      this.setState({testList: this.state.AllData})

    }
    else{
      const result = this.state.AllData.filter(word => word.courseId.couresName ===subject);
      this.setState({testList: result})
    }
   
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
        this.setState({ testList: res.data.data,AllData: res.data.data});
      })
      .catch((err) => {
        // handleError(err)
      });
  };
  onQuestionsPaper=(item)=>{
    localStorage.setItem('testId',item._id)
    this.props.history.push('questionsPaper');
  }
  onDelete = (id) => {
    // alert(id)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
         confirmButton: 'btn btn-success',
         cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
   })
   swalWithBootstrapButtons.fire({
      allowOutsideClick: false,
      title: 'Are you sure?',
      text: "Once deleted, you will not be able to recover this test paper !",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No!',
      confirmButtonText: 'Yes,Delete it!',
      reverseButtons: true
   })
      .then((result) => {
         if (result.value) {
            this.Delete(id)
         } else {
         }
      })
  }
  Delete=(id)=>{
    const userdata = localStorage.getItem("token");

    HttpCallDelete(`${Test}/${id}`, GET, userdata)
    .then((res) => {
      console.log("getTestList", res.data.data);
      this.getTestList()
    })
    .catch((err) => {
      // handleError(err)
    });
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
                <Link to={"/addTest"} className="btn btn-info float-right">
                  {" "}
                  Add New Questions
                </Link>
              </div>
              <div></div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <table className="table">
            <thead>
              <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Course</th>
              <th>Created Date</th>
              <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {this.state.testList.map((item, i) => {
                return (
                  <tr>
                    <td>{i+1}.</td>
                    <td><h6 className="text-uppercase">{item.testName}</h6></td>
                    <td><h6 className="text-uppercase">{item.courseId.couresName}</h6></td>
                    <td>{dateFormat(item.createdAt, "longDate")}</td>
                    <td>
                    <Button className='btn btn-success mr-3' onClick={()=>this.onQuestionsPaper(item)}>View</Button>
                      <Button className='btn btn-danger' onClick={() => this.onDelete(item._id)}>Delete</Button>
                    </td>
                  </tr>  
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}
