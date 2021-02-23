import React, { Component } from 'react'
import { Button, FormGroup, Label, Card, CardBody, CardFooter, Col, Container, Table, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardHeader } from 'reactstrap';
import { HttpCallPost, HttpCallGet, handleError, HttpCallDelete } from '../../apis/usehttps'
import { GET, POST, Delete } from '../../apis/constants'
import { Course, Subject } from '../../apis/Network'
import { Link } from 'react-router-dom'

export default class Subjects extends Component {
    constructor() {
        super()
        this.state = {
            course_list: [],
            SubjectList: [],
        }

    }
    componentDidMount = () => {
        this.getCouresList()
    }
    getCouresList = () => {
        const userdata = localStorage.getItem("token")
        HttpCallGet(`${Course}`, GET, userdata)
            .then(res => {
                console.log("jsyad0", res)
                this.setState({ course_list: res.data })
            })
            .catch(err => {
                handleError(err)
            })
    }
    handleonSelect = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            this.getSubjectList()
        })
    }
    getSubjectList = () => {
        const userdata = localStorage.getItem("token")
        var id = this.state.course_id
        HttpCallGet(`${Subject}/${id}`, GET, userdata)
            .then(res => {
                console.log("jsyad0", res)
                this.setState({ SubjectList: res.data })
            })
            .catch(err => {
                handleError(err)
            })
    }

    onDelete = (id) => {
        const userdata = localStorage.getItem("token")
        HttpCallDelete(`${Subject}/${id}`, Delete, userdata)
            .then(res => {
                console.log("ress", res)
                this.getCouresList()
            })
            .catch(err => {
                handleError(err)
            })

    }
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i>  List of Subject
                           </CardHeader>
                    <CardBody>
                        <div className='add_btn' style={{ "textAlign": "right", marginRight: 15, marginBottom: 10 }}>
                            <Link to={'/addsubject'} className='btn btn-info'> Add New Subject</Link>
                        </div>
                        <div>
                            <div className='md-4'>
                                <FormGroup>
                                    <Col md="3">
                                        <Label htmlFor="selectSm">Select Course</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="select" name="course_id" onChange={this.handleonSelect} id="SelectLm" bsSize="sm">
                                            {this.state.course_list.map((item, i) => {
                                                return (
                                                    <option value={item.id}>{item.course_name}</option>
                                                )
                                            })}
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                <CardHeader>
                        <i className="fa fa-align-justify"></i>  Subjects
                           </CardHeader>
                    <CardBody>
                        <Table id="dtHorizontalExample" className="table table-striped table-bordered table-sm" cellspacing="0"
                            width="100%">
                            <thead>
                                <tr>
                                    <th>Subject ID</th>
                                    <th>Subject Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.SubjectList.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <th>{item.id}</th>
                                            <td>{item.subject_name}</td>
                                            <td><button className='btn btn-danger' onClick={() => this.onDelete(item.id)}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
