import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import "../App.css";
import Addfrom from "./Addfrom";
import Autosuggest from "react-autosuggest";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineDash } from "react-icons/ai";

import { useClickOutside } from 'use-events';

import { useDispatch, useSelector } from "react-redux";
import {
  AddFrom,
  DeleteFrom,
  UpdateFrom,
  autoSuggestions,
  clearAutoSuggestions,
  importdata,
  searchEmployees,
  selectData,
  selectSuggestions,
} from "../ReduxToolkit/Curdslice";

function Curd() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setopen] = useState(false);
   const iconRef=useRef(null);

//const [isActive] = useClickOutside([], event => console.log(event));

  const handleSearch = (event, { newValue }) => {
    setSearchQuery(newValue);
    console.log(event);
  };

  const DisplaySuggestiondata = ({ value }) => {
    dispatch(searchEmployees(value));
  };

  const { data } = useSelector((state) => state.AddFrom);

  const getSuggestions = () => {
    return data
      .filter((emp) => {
        const empData = `${emp.name} ${emp.username} ${emp.email} ${emp.Address}`;
        return empData.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map((emp) => emp.username);
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion}</div>;
  };

  const inputProps = {
    placeholder: "Search employees...",
    value: searchQuery,
    onChange: handleSearch,
  };

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
    dispatch(DeleteFrom(id));
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handelclearsuggestions = () => {
    setSearchQuery("");
  };

 
  function download_csv_file() {
   
    var csv = "name,  userfname,,gender,dob, state, city, Address,email,\n";
    data.forEach(function (row) {
      csv += Object.values(row).join(",");
      csv += "\n";
    });

    document.write(csv);

    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "EmployeeList.csv";
    hiddenElement.click();
  }
  
  function CSVToArray(csvText) {
    const lines = csvText.split("\n");
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      if (values.length === 9) {
        const [
          name,
          userfname,
          gender,
          dob,
          state,
          city,
          Address,
          email,
          lanaguage,
        ] = values;
        result.push({
          name,
          userfname,
          gender,
          dob,
          state,
          city,
          Address,
          email,
          lanaguage,
        });
      }
    }
    return result;
  }
//The contains() method in JavaScript is used to check if a particular element is a descendant of another specified element. In the context of handling click events and checking if the click occurred outside a specific element, contains() is often used to determine if the clicked element is a descendant of the target element.
useEffect(() => {
  function handleClickOutside(event) {
    if (iconRef.current && !iconRef.current.contains(event.target)) {
      
      console.log(!iconRef.current.contains(event.target));
      if(iconRef.current){
        console.log("change icon");
        setopen(false)
        setopen(open)
      }else{
        console.log("error");
      }

      
    
    }
  }

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [iconRef]);






 


  
  //useClickOutside(colsedropdown)

  

  
  const handleImportCSV = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const csvData = event.target.result;
          const parsedData = CSVToArray(csvData);
            dispatch(importdata(parsedData));

          console.log(parsedData);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

 
  return (
    <>
      <div className="table-title w-20" style={{ backgroundColor: "gray" }}>
        <div className="row " style={{ background: "black" }}>
          <div className="col-sm-7">
            <h2 style={{ color: "white", marginLeft: "20px" }}>
              Manage <b>Employees</b>
            </h2>
          </div>
          <div className="col-sm-4 flexs">
            <Button
              onClick={() => openModal(false)}
              className="btn btn-success"
              style={{ width: "180px", marginTop: "5px" }}
            >
              <span>Add New Employee</span>
            </Button>
            <Button
              onClick={download_csv_file}
              className="btn btn-warning"
              style={{ width: "120px", marginTop: "5px" }}
            >
              <span>Export</span>
            </Button>
            <Button
              onClick={handleImportCSV}
              className="btn btn-denger"
              style={{ width: "100px", marginTop: "5px" }}
            >
              <span>Import</span>
            </Button>
          </div>
        </div>
      </div>
     
      <div
        className="input-1"
        style={{ marginLeft: "500px", marginTop: "20px" }}
      >
        <Autosuggest
          suggestions={getSuggestions()}
          onSuggestionsFetchRequested={DisplaySuggestiondata}
          onSuggestionsClearRequested={handelclearsuggestions}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
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
              <th>User_Name</th>
              <th>Gender</th>
              <th>Dob</th>
              <th>State</th>
              <th>City</th>
              <th>Email</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.username}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.state}</td>
                <td>{emp.city}</td>
                <td>{emp.email}</td>
                <td>{emp.lanaguage}</td>
                <td>
                  <div className="dropdown" ref={iconRef} >
                    <h5
                      onClick={() => {
                        setopen(!open);
                      }}
                    >
                        {
                        open ?<AiOutlineDash />:<RxCross2 />
                            
                        }
                    </h5>
                  
                  {open && (
                    <>
                    <div  className="dropdown-content" >
                    <span>
                        <BiEditAlt
                          className="edit_icons"
                          style={{ width: "35px", height: "30px" }}
                          onClick={() => {
                            dispatch(UpdateFrom(emp, emp.id));
                            openModal(true);
                          }}
                        
                        />
                        Edit
                      </span>
                      <span>
                        <AiFillDelete
                          className="edit_icon"
                          style={{ width: "35px", height: "30px" }}
                          onClick={() => handleShowDeleteModal(emp.id)}
                        />
                        Delete
                      </span>
                    </div>
                    
                     
                    </>
                  )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
      <Addfrom
        isEditing={isEditing}
        formData={formData}
        showModal={showModal}
        closeModal={closeModal}
        onSubmit={Addfrom}
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
          <Button variant="danger" onClick={handleShowDeleteModal}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Curd;
