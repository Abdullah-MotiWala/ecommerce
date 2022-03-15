import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

export default function Shipping() {
  const navigate = useNavigate();
  const userSignedIn = useSelector((state) => state.userAuth);
  const { userInfo } = userSignedIn;
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [navigate, userInfo]);

  const userShippingData = JSON.parse(localStorage.getItem("shippingAddress"));
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    ...userShippingData
  });

  const changeHandler = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    console.log(info);
  };
  const clickHandler = () => {
    dispatch(saveShippingAddress(info));
    navigate("/payment");
  };
  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100vh",
          width: "100vw"
        }}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          style={{ padding: "5px" }}
          className="shippingForm"
        >
          <Form.Item
            label={<h1 style={{ margin: "10px" }}>Shipping Address</h1>}
            colon={false}
            labelCol={{
              md: { offSet: 0 },
              xs: { offSet: 0 },
              sm: { offset: 4 }
            }}
          >
            {" "}
          </Form.Item>
          <Form.Item label="Name">
            <Input
              name="name"
              onChange={(e) => {
                changeHandler(e);
              }}
              value={info.name}
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              name="address"
              onChange={(e) => {
                changeHandler(e);
              }}
              value={info.address}
            />
          </Form.Item>
          <Form.Item label="Postal Code">
            <Input
              name="postalCode"
              onChange={(e) => {
                changeHandler(e);
              }}
              value={info.postalCode}
            />
          </Form.Item>
          <Form.Item label="City">
            <Input
              name="city"
              onChange={(e) => {
                changeHandler(e);
              }}
              value={info.city}
            />
          </Form.Item>
          <Form.Item label="Country">
            <Input
              name="country"
              onChange={(e) => {
                changeHandler(e);
              }}
              value={info.country}
            />
          </Form.Item>

          <Form.Item
            label={<Button onClick={clickHandler}>Submit</Button>}
            colon={false}
            labelCol={{
              md: { offSet: 0 },
              xs: { offSet: 0 },
              sm: { offset: 4 }
            }}
          ></Form.Item>
        </Form>
      </div>
    </>
  );
}
