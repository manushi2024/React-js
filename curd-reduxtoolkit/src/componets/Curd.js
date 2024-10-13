import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import "../App.css";
import Addfrom from "./Addfrom"

import { useDispatch, useSelector } from "react-redux";
import { AddFrom, DeleteFrom, UpdateFrom } from "../ReduxToolkit/Curdslice";

function Curd() {

  const [showModal, setShowModal] = useState(false);
const dispatch=useDispatch()

  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const openModal = (isEditing, data, index) => {
     setIsEditing(isEditing);
    setFormData(data);
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    // dispatch(DeleteFrom(id))
    // console.log("delete");
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  
  };
//

  //fetch data from storey
  //const data = useSelector((state) => state.AddFrom.data);
  //console.log(data);
  return (
    <>
      <div className="table-title w-20">
        <div className="row " style={{ background: "black" }}>
          <div className="col-sm-7">
            <h2 style={{ color: "white",marginLeft:"20px" }}>
              Manage <b>Employees</b>
            </h2>
          </div>
          <div className="col-sm-4 flexs">
            <Button
              //onClick={() => openModal(false)}
              className="btn btn-success"
              style={{ width: "180px" }}
            >
              <span>Add New Employee</span>
            </Button>
          
          </div>
        </div>
      </div>
      <div className="col-sm-4 flexs" style={{marginLeft:"450px" ,marginTop:"10px"}}>
        <input type="search" style={{width:"220px"}} placeholder="search user" />
        <button >Search</button>
      </div>
      <div
        className="container table-container"
        style={{ marginLeft: "30px", marginTop: "10px" }}
      >
        <table className="table ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>User Name</th>
              <th>Gender</th>
              <th>Dob</th>
              <th>State</th>
              <th>City</th>
              <th>Address</th>
              <th>Email</th>
              <th>Language</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.username}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.state}</td>
                <td>{emp.city}</td>
                <td>{emp.Address}</td>
                <td>{emp.email}</td>
                <td>
                </td>
                <td>
                  <span>
                    <BiEditAlt  className="edit_icons"  onClick={() =>{ 
                      dispatch(UpdateFrom(emp,emp.id))
                      openModal(true)}} />
                  </span>
                  <span>
                    <AiFillDelete className="edit_icon" onClick={() => handleShowDeleteModal(emp.id)} />
                  </span>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>

      <Addfrom
         isEditing={isEditing}
         formData={formData}
         showModal={showModal}
         closeModal={closeModal}
         onSubmit={ AddFrom} 
      /> 

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleShowDeleteModal}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Curd;