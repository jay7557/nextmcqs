import React from "react";
// import { BarLoader } from "react-spinners";
import {Spinner} from 'reactstrap'
// import loaderImg from '../../assets/img/loading.gif'
const Loader = ({ loading }) => {
  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999
        }}
      >
        {/* <div className="loader" /> */}
        <div className="full-loader">
          <div className="container alignmentCenter">
            <div class="loader">
            <Spinner style={{ width: '4rem', height: '4rem' }} color="primary" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div style={{ display: "none" }} />;
  }
};

export default Loader;
