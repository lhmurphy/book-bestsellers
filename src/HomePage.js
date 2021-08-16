import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router";
import "./HomePage.css";
import { observer } from "mobx-react";
import { scrape, removeJob, getAllJobs } from "./requests";
const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  url: yup.string().required("URL is required"),
});
function HomePage({ jobsStore }) {
  const [redirect, setRedirect] = useState(false);
  const [jobId, setJobId] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const handleSubmit = async evt => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    jobsStore.jobs.push(evt);
    jobsStore.setJobs(jobsStore.jobs);
    await scrape(evt);
    getJobs();
  };
  const selectJob = id => {
    setJobId(id);
    setRedirect(true);
  };
  const getJobs = async () => {
    const response = await getAllJobs();
    jobsStore.setJobs(response.data);
  };
  const deleteJob = id => {
    removeJob(id);
    getJobs();
  };
  useEffect(() => {
    if (!initialized) {
      getJobs();
      setInitialized(true);
    }
  });
  if (redirect) {
    return <Redirect to={`/results/${jobId}`} />;
  }
  return (
    <div className="home-page">
      <h1>Web Scraping Jobs</h1>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={values.name || ""}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="chatRoomName">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={values.description || ""}
                  onChange={handleChange}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
<Form.Group controlId="url" as={Col} md="12">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  as="select"
                  name="url"
                  value={values.url || ""}
                  onChange={handleChange}
                  isInvalid={touched.url && errors.url}
                >
                  <option value="">Select</option>
                  <option value="https://www.redflagdeals.com/in/toronto/deals/">
                    Red Flag Deals
                  </option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.url}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginRight: "10px" }}>
              Add
            </Button>
          </Form>
        )}
      </Formik>
      <br />
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>URL</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobsStore.jobs.map((j, i) => {
            return (
              <tr key={i}>
                <td>{j.name}</td>
                <td>{j.description}</td>
                <td>{j.url}</td>
                <td>
                  <Button onClick={selectJob.bind(this, j.id)}>Results</Button>
                </td>
                <td>
                  <Button onClick={deleteJob.bind(this, j.id)}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default observer(HomePage);