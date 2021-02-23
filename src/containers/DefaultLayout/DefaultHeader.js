import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import './style.css'
import image from '../../assets/image/index'
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(){
    super()
  }
  logOut = () => {
    localStorage.removeItem('token');
    
    window.location.assign('/');

 }
 onClickloguot = () => {
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
       text: "Logout",
       icon: 'warning',
       showCancelButton: true,
       cancelButtonText: 'No!',
       confirmButtonText: 'Yes!',
       reverseButtons: true
    })
       .then((result) => {
          if (result.value) {
             this.logOut()
          } else {
          }
       })
 }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {/* <AppSidebarToggler className="d-lg-none" display="md" mobile /> */}
        <AppNavbarBrand
          full={{ src: image.logo_main, width: 180, height: 45  , alt: 'CoreUI Logo' }}
          minimized={{ src: image.logo_main, width: 50, height: 30, alt: 'CoreUI Logo' }}
        />
        <div style={{textAlign:"right"}}>
        <button className='btn btn-success pull-right' style={{ textAlign: "right",marginRight:15 }} onClick={this.onClickloguot}>Logout</button>

          </div>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
