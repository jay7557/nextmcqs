import React, { useState } from 'react';
import Loader from "../../component/loader/loader";

import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { HttpCallPost, handleError } from '../../apis/usehttps'
import { LoginUrl, BaseUrl } from '../../apis/Network'
import { POST } from '../../apis/constants'
import Helper from '../../common/helper'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import image from '../../assets/image/index'
import './style.css'
const Login = (props) => {
  const [loader, setLoader] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    Email: {
      err: false,
      errMsg: '',
      propname: 'Username',
      value: '',
      required: true
    },
    Password: {
      err: false,
      errMsg: '',
      propname: 'Password',
      value: '',
      required: true
    }
  });
  const onLoginPress = (event) => {
    event.preventDefault()
    setLoader(true)
    // setIsLogin(true)

    Helper.validateForm(formData).then(({ error, formDataObj }) => {
      if (!error) {
        setFormData(formDataObj);
        callLoginApi()
      } else {
        setFormData(formDataObj);
        setLoader(false);
      }
    });
  }
  const callLoginApi = () => {
    setLoader(true)
    // props.history.push('/dashboard')

    const userdata = {
      "email": formData.Email.value,
      "password": formData.Password.value,
      // "appcode": "ANRD"
    }
    console.log("usedrdata", userdata)
    axios.post(BaseUrl + "admin/login", userdata)
      .then(response => {
        setLoader(false)
        localStorage.setItem("token", response.data.token)
        setIsLogin(true)
        props.history.push('/dashboard')


      })
      .catch(err => {
        setLoader(false)
        console.log("errrrr", err)
        // Swal.fire({
        //   position: 'center',
        //   type: 'error',
        //   title: errResponse.response.data,
        // })
        // handleError(err)
      })
  }
  //          HttpCallPost(`${LoginUrl}`, POST, userdata).then(response => {
  //   console.log("response",response)
  //           setLoader(false)
  //           localStorage.setItem("token", response.data.token)
  //               localStorage.setItem("userId", response.data.userId)
  //               localStorage.setItem("role", response.data.role)
  //               setIsLogin(true)
  //               if(response.data.role === 3){
  //                   props.history.push('/admin/dashboard')
  //               }else if(response.data.role === 2){
  //                   props.history.push('/manager/dashboard')
  //               }else{
  //                   props.history.push('/operator/dashboard')
  //               }

  //           }).catch(err => {
  //               setLoader(false)
  //               // handleError(err)
  //           });
  // }
  const onChangeHandle = (event, name) => {
    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        err: false,
        errMsg: '',
        value: event.target.value,
        propname: name
      }
    });
  }
  return (
    <div className="app flex-row align-items-center login">

      {loader ?
        <Loader loading={true} />
        :

        <Container >
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Welcome To NExtmcqs</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" name="username" onChange={(event) => onChangeHandle(event, "Email")} autoComplete="username" />
                        {
                          formData.Email.err ?
                            <span className="errorText">{formData.Email.errMsg}</span>
                            : null
                        }
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" onChange={(event) => onChangeHandle(event, "Password")} autoComplete="current-password" />
                        {
                          formData.Password.err ?
                            <span className="errorText">{formData.Password.errMsg}</span>
                            : null
                        }
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={(event) => onLoginPress(event)}>Login</Button>

                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to='/resetpassword'>
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      }
    </div>
  );
}


export default Login;
