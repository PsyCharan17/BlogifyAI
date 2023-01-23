import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./InputForm.css";
import axios from "axios";
// import uploadBlog from "../../../../backend/controllers/uploadController";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // uploadBlog();
      // console.log(title);
      // console.log(blogContent);
      const config = {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        { title, blogContent },
        config
      );
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <div className="form-container">
        {loading && <div>Loading...</div>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: "white" }}>
              <strong>Enter Title of the Blog</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Title of the Blog"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{ color: "white" }}>
              <strong>Enter Blog Content</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              onChange={(e) => setBlogContent(e.target.value)}
              value={blogContent}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default InputForm;
