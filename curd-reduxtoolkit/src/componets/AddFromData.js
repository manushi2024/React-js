import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Button,
  Form as BootstrapForm,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddFrom, EditFrom } from "../ReduxToolkit/Curdslice";
import { Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zAZ0-9-.]+$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string().required("Dob is required"),
  state: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  Address: Yup.string().required("Address is required"),
  email: Yup.string().matches(EMAIL_REGX, "Invalid email address"),
});

const Addfrom = ({ isEditing, showModal, closeModal, onSubmit, formData }) => {
  const city = ["Gandhinagar", "surat", "Panaji", "Bengaluru", "Ranchi"];
  const state = ["Gujarat", "Goa", "Jharkhand", "Karnataka"];
  const { editData } = useSelector((state) => state.AddFrom);
  console.log(editData);
  const dispatch = useDispatch();

  let initialValues = {
    name: "",
    username: "",
    gender: "",
    dob: "",
    state: "",
    city: "",
    Address: "",
    email: "",
  };

  const handelsubmit=()=>{
    
  }



  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Edit Employee" : "Add Employee"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Row className="justify-content-center">
            <Col md={20}>
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handelsubmit}
                  
              >
                {() => (
                  <Form className="p-2">
                    <div className="container my-2 bg-dark w-100 text-light p-2">
                      <BootstrapForm.Group>
                        <label>First Name</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>

                      <BootstrapForm.Group>
                        <label>User Name</label>
                            <Field
                          type="text"
                          name="username"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>
                      <BootstrapForm.Group>
                        <label>Gender</label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="gender"
                              value="Male"
                              className="radio-box"
                            />
                            Male
                          </label>
                          <label>
                            <Field type="radio" name="gender" value="Female" />
                            Female
                          </label>
                        </div>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>
                      <BootstrapForm.Group>
                        <label>Dob</label>
                        <Field
                          type="date"
                          name="dob"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="dob"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>

                      <BootstrapForm.Group>
                        <label>Country</label>
                        <Field as="select" name="state" className="form-select">
                          <option value="">Select State</option>
                          {state.map((state) => (
                            <option value={state} key={state}>
                              {state}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>

                      <BootstrapForm.Group>
                        <label>Citys</label>
                        <Field as="select" name="city" className="form-select">
                          <option value="">Select City</option>
                          {city.map((city) => (
                            <option value={city} key={city}>
                              {city}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>
                      <BootstrapForm.Group>
                      <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        <ErrorMessage
                          name="Address"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>

                      <BootstrapForm.Group>
                        <label>Email</label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </BootstrapForm.Group>

                      <Button type="submit" variant="primary" className="box">
                        {isEditing ? "Save Changes" : "Submit"}
                      </Button>
                      <Button
                        className="btn btn-info box-1"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Addfrom;
