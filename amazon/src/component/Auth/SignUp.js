import React, { useState, useEffect } from "react";
import Footer from "../Home/Footer";
import Navbar from "../Home/Navbar";
import { Button, Checkbox, Form, Input, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/actions/authActions";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignUp = useSelector((state) => state.userAuth);
  const { userInfo, loading, error } = userSignUp;

  //modal for credential errors
  // function errorModal() {
  //   Modal.error({
  //     title: "Credentials are incorrect",
  //     content: "We can not find your account. Please try again."
  //   });
  // }

  const redirect = props?.location?.search
    ? props.location.search.split("=")[1]
    : "/";

  //redirect to check out page
  useEffect(() => {
    userInfo && navigate(redirect);
  }, [userInfo, navigate, redirect]);

  //changeHandler
  const changeHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log(formState);
  };

  //finishHandler
  const finishHandler = () => {
    const { name, email, password } = formState;
    if (email && password && name) {
      dispatch(signup(name, email, password));
    }
    // error && errorModal();
  };
  return (
    <>
      <Navbar />
      {loading ? (
        <Spin size="large" style={{ margin: 20 }} />
      ) : (
        <div className="signInContainer">
          <Form
            autoComplete="on"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            scrollToFirstError={true}
            size="small"
            // onFinish={finishHandler}
            initialValues={{
              remember: true
            }}
          >
            <Form.Item
              label="Username"
              colon={true}
              rules={[
                {
                  required: true,
                  message: "Please input your username!"
                }
              ]}
            >
              <Input
                name="name"
                placeholder="Your Name Here"
                onChange={(e) => changeHandler(e)}
              />
            </Form.Item>
            <Form.Item
              label="userEmail"
              colon={true}
              rules={[
                {
                  required: true,
                  message: "Please input your email!"
                }
              ]}
            >
              <Input
                name="email"
                placeholder="Your Email Here"
                onChange={(e) => changeHandler(e)}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              colon={true}
              rules={[
                {
                  required: true,
                  message: "Please input your correct last used password!"
                }
              ]}
            >
              <Input.Password
                name="password"
                onChange={(e) => changeHandler(e)}
              />
            </Form.Item>

            <Form.Item
              label={<Checkbox>Remember me</Checkbox>}
              name="remember"
              valuePropName="checked"
              labelCol={{
                md: { offSet: 0 },
                xs: { offSet: 0 },
                sm: { offset: 8 }
              }}
              colon={false}
            ></Form.Item>

            <Form.Item
              label={
                <Button
                  type="default"
                  htmlType="submit"
                  style={{
                    color: "#ff9900",
                    fontWeight: "bold",
                    backgroundColor: "#203040"
                  }}
                  onClick={finishHandler}
                >
                  Sign Up
                </Button>
              }
              name="signInBtn"
              labelCol={{
                md: { offSet: 0 },
                xs: { offSet: 0 },
                sm: { offset: 8 }
              }}
              colon={false}
            >
              <Typography variant="h3">
                Already a member{" "}
                <Link
                  to="/signin"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Sign In
                </Link>
              </Typography>
            </Form.Item>
          </Form>
        </div>
      )}
      <Footer />
    </>
  );
}
