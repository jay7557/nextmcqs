import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { HttpCallPost, HttpCallGet, handleError, HttpCallDelete } from '../../apis/usehttps'
import { GET, POST, Delete } from '../../apis/constants'
import { User } from '../../apis/Network'

// function UserRow(props) {
//   const user = props.user
//   const userLink = `/users/${user.id}`

//   const getBadge = (status) => {
//     return status === 'Active' ? 'success' :
//       status === 'Inactive' ? 'secondary' :
//         status === 'Pending' ? 'warning' :
//           status === 'Banned' ? 'danger' :
//             'primary'
//   }

//   return (
//     <tr key={user.id.toString()}>
//       <th scope="row"><Link to={userLink}>{user.id}</Link></th>
//       <td><Link to={userLink}>{user.name}</Link></td>
//       <td>{user.registered}</td>
//       <td>{user.role}</td>
//       <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
//     </tr>
//   )
// }
const getBadge = (status) => {
  return status === 'Active' ? 'success' :
    status === 'Inactive' ? 'secondary' :
      status === 'Pending' ? 'warning' :
        status === 'Banned' ? 'danger' :
          'primary'
}
class Users extends Component {
  constructor(){
    super()
    this.state={
      User_list:[]
    }
  }
  componentDidMount=()=>{
    this.getUsers()
  }
  getUsers=()=>{
    const userdata = localStorage.getItem("token")
        HttpCallGet(`${User}`, GET, userdata)
            .then(res => {
              console.log("userlist ",res)
                this.setState({ User_list: res.data.data })
            })
            .catch(err => {
                // handleError(err)
            })
  }
  render() {

    // const userList = usersData.filter((user) => user.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users List
                {/* <small className="text-muted">example</small> */}
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Mobile Number</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.User_list.map((user, index) =>
                       <tr key={index}>
                       <th scope="row">{index+1}</th>
                       <th >{user.userName}</th>
                       <td>{user.firstName} {user.lastName}</td>
                       <td>{user.email}</td>
                       <td>{user.mobileNumber}</td>
                       <td>
                         {(user.status===0)?<Badge color={getBadge(user.status)}>Active</Badge>:<Badge color={getBadge(user.status)}>Block</Badge>}</td>
                     </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
