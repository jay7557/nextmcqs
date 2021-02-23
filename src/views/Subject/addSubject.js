import React, { Component } from 'react'
import { Button, FormGroup, Label, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardHeader } from 'reactstrap';
import { HttpCallPost, HttpCallGet, handleError } from '../../apis/usehttps'
import { GET, POST } from '../../apis/constants'
import { Course,Subject } from '../../apis/Network'
import axios from 'axios';
// import Swal from 'sweetalert2/dist/sweetalert2.js'

export default class AddSubjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course_list: []
        }


    }

    handleonInput = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            console.log("course_id ", this.state.course_id,)
        })
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
    onSubmit = (event) => {
        event.preventDefault()
        var data = {
            "course_id": this.state.course_id,
            "subject_name": this.state.subject_name
        }
        console.log("data_newww", data)
        const userdata = localStorage.getItem("token")

        HttpCallPost(`${Subject}`, POST, userdata, data)
            // axios.post('localhost:4000/admin/course', data)
            .then(res => {
                console.log('add coures', res)
                // this.setState({ submitButton: true, isloading: false })

                // this.props.history.push('blogs');
            }).catch(err => {
                // this.setState({ submitButton: true, isloading: false })
                // Swal.fire({
                //     position: 'center',
                //     type: 'error',
                //     title: 'not save.',
                // })
                // handleError(err)
                console.log("sjksdjbksajagk.jsdskhu", err)
            })
    }
    render() {
        return (

            <Card>
                <CardHeader>
                    <h3>ADD NEW Subject</h3>
                </CardHeader>
                <CardBody>
                    <div>
                        <div className='md-4'>
                            <FormGroup>
                                <Col md="3">
                                    <Label htmlFor="selectSm">Status</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="select" name="course_id" onChange={this.handleonInput} id="SelectLm" bsSize="sm">
                                        {this.state.course_list.map((item, i) => {
                                            return (
                                                <option value={item.id}>{item.course_name}</option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                        </div>
                        <div className='md-4'>
                            <FormGroup >
                                <Col md="3">
                                    <Label htmlFor="selectLg">Enter Subject Name</Label>
                                </Col>
                                <Col xs="12" md="9" size="lg">
                                    <Input type="text" name="subject_name" id="selectLg" bsSize="lg" onChange={this.handleonInput} />
                                </Col>
                            </FormGroup>
                        </div>
                        <div className='md-4'>
                            <FormGroup >
                                <Col xs="12" md="9" size="lg">
                                    <Button className='btn btn-success' onClick={(event) => this.onSubmit(event)} bsSize="lg">Submit</Button>
                                </Col>
                            </FormGroup>
                        </div>
                    </div>
                </CardBody>
            </Card>

        )
    }
}
