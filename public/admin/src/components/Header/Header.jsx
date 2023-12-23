import MediaQuery from "react-responsive";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


import { FaFaceFlushed } from "react-icons/fa6";
import Sidebar from "../Sidebar/Sidebar";
import { IoMenu } from "react-icons/io5";

const Header = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav className="header navbar navbar-dark bg-royal w-100">
      <div className="container-fluid px-4">
        <a className="navbar-brand d-flex align-items-center " href="#">
          <FaFaceFlushed className="me-2"/>
          Admin
        </a>
        <MediaQuery maxWidth={991.98}>
          <button type="button" className="btn text-white p-0 fs-1 lh-1 m-0 " onClick={handleShow}>
            <IoMenu />
          </button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Sidebar handleClose={handleClose}/>
            </Offcanvas.Body>
          </Offcanvas>
        </MediaQuery>
      </div>
    </nav>
  )
}

export default Header