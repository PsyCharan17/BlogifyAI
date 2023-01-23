import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./InputForm.css";
import axios from "axios";
// import uploadBlog from "../../../../backend/controllers/uploadController";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [doneProcessing, setDoneProcessing] = useState(false);

  // const gettingBlogs = () => {
  //   axios.get("http://localhost:5000/api/upload/getBlogs").then((res) => {
  //     console.log(res.data);
  //   });
  // };

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
        // putting
        "http://localhost:5000/api/upload",
        { title, blogContent },
        config
      );

      const doneProcessing = await axios.post(
        "http://127.0.0.1:8000/blog",
        { title: title },
        config
      );

      console.log(data);
      console.log(doneProcessing);
      // setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <div className="form-container">
        {loading && <div>Loading...</div>}
        <div style={{ display: "flex", marginLeft: "20px" }}>
          <Form onSubmit={submitHandler}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              style={{
                color: "white",
                marginTop: "30px",
                marginBottom: "30px",
                alignContent: "center",
              }}
            >
              <Form.Label style={{ paddingLeft: "200px" }}>
                <strong>Enter Title of the Blog</strong>
              </Form.Label>

              <br></br>
              <Form.Control
                type="text"
                placeholder="Title of the Blog"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                style={{
                  marginTop: "30px",
                  marginBottom: "20px",
                  height: "30px",
                  width: "600px",
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label
                style={{
                  color: "white",
                  marginTop: "30px",
                  marginBottom: "40px",
                  paddingLeft: "220px",
                }}
              >
                <strong>Enter Blog Content</strong>
              </Form.Label>
              <br></br>
              <Form.Control
                as="textarea"
                rows={10}
                onChange={(e) => setBlogContent(e.target.value)}
                value={blogContent}
                style={{
                  marginTop: "30px",
                  marginRight: "200px",
                  marginBottom: "20px",
                  width: "600px",
                  height: "300px",
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{
                marginLeft: "240px",
                height: "30px",
                width: "100px",
                marginTop: "20px",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
