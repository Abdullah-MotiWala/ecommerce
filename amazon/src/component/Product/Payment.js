import React, { useState } from "react";
import { Radio, Space } from "antd";
import { Typography } from "antd";
import { Button } from "antd";
import { Row } from "antd";
import { savePaymentMethod } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

export default function Payment() {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const onChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const clickHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
  };
  const { Title } = Typography;
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "50vh",
          margin: "2rem",
          borderRadius: "5px",
          border: "1px solid #ff9900"
        }}
      >
        <Title>Payment</Title>
        <Radio.Group onChange={(e) => onChange(e)} value={paymentMethod}>
          <Space direction="vertical">
            <Radio value="Paypal">Paypal</Radio>
            <Radio value="Stripe">Stripe</Radio>
          </Space>
        </Radio.Group>
        <Row>
          <Button
            type="default"
            style={{
              width: "20rem%",
              backgroundColor: "#ff9900",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "2px"
            }}
            onClick={clickHandler}
          >
            Continue
          </Button>
        </Row>
      </div>
    </div>
  );
}
