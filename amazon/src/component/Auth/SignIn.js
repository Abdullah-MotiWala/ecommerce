import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin } from "../../redux/actions/authActions";
import Footer from "../Home/Footer";
import Navbar from "../Home/Navbar";
import { Modal } from "antd";
import { Spin } from "antd";
import { useLocation } from "react-router-dom";

export default function SignIn(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passRef = useRef(null);
  const nameRef = useRef(null);

  // const redirect = props?.location?.search
  //   ? props.location.search.split("=")[1]
  //   : "/";

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //if user is logged in
  const userSignIn = useSelector((state) => state.userAuth);
  const { userInfo, loading, error } = userSignIn;

  //error modal
  function errorModal() {
    Modal.error({
      title: "Credentials are incorrect",
      content: "We can not find your account. Please try again."
    });
  }

  //form finish handler
  const finishHandler = (e) => {
    let email = nameRef.current.input.value;
    let password = passRef.current.input.value;
    dispatch(signin(email, password));
    error && errorModal();
  };

  //redirect to check out page
  useEffect(() => {
    userInfo && navigate(redirect);
  }, [userInfo, navigate, redirect]);

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
            onFinish={finishHandler}
            initialValues={{
              remember: true
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              colon={true}
              rules={[
                {
                  required: true,
                  message: "Please input your username!"
                }
              ]}
            >
              <Input placeholder="Your Name Here" ref={nameRef} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              colon={true}
              rules={[
                {
                  required: true,
                  message: "Please input your correct last used password!"
                }
              ]}
            >
              <Input.Password ref={passRef} />
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
                >
                  Login
                </Button>
              }
              name="signInBtn"
              labelCol={{
                md: { offSet: 0 },
                xs: { offSet: 0 },
                sm: { offset: 8 }
              }}
              colon={false}
            ></Form.Item>
          </Form>
        </div>
      )}
      <Footer />
    </>
  );
}
