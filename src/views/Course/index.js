import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  HttpCallPost,
  HttpCallGet,
  handleError,
  HttpCallDelete,
} from "../../apis/usehttps";
import { GET, POST, Delete } from "../../apis/constants";
import { Course } from "../../apis/Network";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import "./index.css";
// import axios from 'ax'
export default class Course_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_list: [],
    };
  }
  componentDidMount = () => {
    this.getCouresList();
  };
  getCouresList = () => {
    const userdata = localStorage.getItem("token");
    HttpCallGet(`${Course}`, GET, userdata)
      .then((res) => {
        console.log("datda", res);
        this.setState({ course_list: res.data.data });
      })
      .catch((err) => {
        handleError(err);
        console.log("datda", err);
      });
  };
  onDelete = (id) => {
      let couresId = id
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        allowOutsideClick: false,
        title: "Are you sure?",
        text: "Delete",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No!",
        confirmButtonText: "Yes!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.isDeleted(couresId);
        } else {
        }
      });
    //
  };
  isDeleted = (couresId) => {
    const userdata = localStorage.getItem("token");
    HttpCallDelete(`${Course}/${couresId}`, Delete, userdata)
      .then((res) => {
        console.log("ress", res);
        this.getCouresList();
      })
      .catch((err) => {
        handleError(err);
      });
  };
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> List of Corse
              </CardHeader>
              <CardBody>
                <div
                  className="add_btn"
                  style={{
                    textAlign: "right",
                    marginRight: 15,
                    marginBottom: 10,
                  }}
                >
                  <Link to={"/add_course"} className="btn btn-info">
                    {" "}
                    Add Course
                  </Link>
                </div>
                <Table
                  id="dtHorizontalExample"
                  className="table table-striped table-bordered table-sm"
                  cellspacing="0"
                  width="100%"
                >
                  <thead className="bg-info">
                    <tr>
                      <th>Course ID</th>
                      <th>Code Name</th>
                      <th>Name </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.course_list.map((item, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{item.couresName}</td>
                          <td>{item.shortName}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => this.onDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                {/* <div className="text-right text-info">
                                    <Pagination
                                        prevPageText='prev'
                                        nextPageText='next'
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={10}
                                        totalItemsCount={this.state.totelRecord}
                                        pageRangeDisplayed={10}
                                        marginPagesDisplayed={2}
                                        activeClassName={'active'}
                                        hideFirstLastPages={true}
                                        onChange={event => this.NextPage(event)}
                                    />
                                </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
