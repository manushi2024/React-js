import "../Login.css";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


function Loginpage() {
  const [formValue, setFormValue] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
const navigate =useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .test("unique-email", "Email already in use", async function (value) {
        if (!value) {
          return false;
        }
        try {
          const response = await axios.post(
            "http://localhost:4000/check-email",
            { email: value }
          );
          return response.data.isValid;
        } catch (error) {
          return this.createError({ message: "Error validating email" });
        }
      }),
      name:Yup.string().required('name is required'),
      age:Yup.string().required('age is required')
  });

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/submit",
        values
      );
      setFormValue(response.data);
      setSuccessMessage("Form is submitted");
      setTimeout(() => setSuccessMessage(""), 5000);
      setSubmitting(false);
      resetForm();
      navigate("/")
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    
    <div className={`Loginpage ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
     
      <div>      
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        <div>
          <Formik
            initialValues={{ email: "",name:"",age:"" }}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
            validateOnChange={false} 
            validateOnBlur={true}    
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                  <h1>Remote Validation</h1>
                  <label htmlFor="name">
                  NAME<span>*</span>
                </label>
                <Field
                  type="name"
                  name="name"
                  className="form-control"
                  placeholder=" name"
                  onBlur={async (e, formik) => {}}
                />
                {errors.name && touched.name && (
                  <p style={{ color: "red" }}>{errors.name}</p>
                )}     
          <br></br>
          <label htmlFor="email">
                  EMAIL <span>*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  onBlur={async (e, formik) => {}}
                />
                {errors.email && touched.email && (
                  <p style={{ color: "red" }}>{errors.email}</p>
                )} 
              <br></br>
                 <label htmlFor="age">
                AGE
                </label>
                <Field
                  type="number"
                  name="age"
                  className="form-control"
                  placeholder="age "
                  onBlur={async (e, formik) => {}}
                />
                {errors.age && touched.age && (
                  <p style={{ color: "red" }}>{errors.age}</p>
                )}
                <br />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                {successMessage && (
                  <p style={{ color: "green", fontSize: "20px" }}>
                    {successMessage}
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
