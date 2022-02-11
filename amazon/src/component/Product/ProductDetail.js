import React from "react";
import data from "../../data";
import { useParams } from "react-router-dom";
import { Row, Col, Space } from "antd";
import { Card } from "antd";
import { hover } from "@testing-library/user-event/dist/hover";

export default function ProductDetail(props) {
  let { id } = useParams();
  const { products } = data;
  const tarProduct = products.find((x) => x._id === id);
  const { meta } = Card;

  return (
    <div>
      {!tarProduct ? (
        <div>Product not found</div>
      ) : (
        <>
          {/* product image */}

          <Row justify="center">
            <Col span={{ md: 12, sm: 24 }} style={{ padding: "5px" }}>
              <img
                alt={tarProduct.description}
                src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                className="proImage"
              />
            </Col>

            {/* product detail  */}
            <Col span={12} style={{ textAlign: "center" }}>
              <Row className="proDetRow" align="center" justify="space-around">
                <Col span={{ md: 12, sm: 24 }} className="proDetCol">
                  <Card
                    title={tarProduct.brand}
                    bordered={false}
                    style={{ width: 250, textAlign: "left" }}
                  >
                    <p>{tarProduct.numReviews} reviews</p>
                    <p>Price : ${tarProduct.price}</p>
                    <p>Description : {tarProduct.description}</p>
                  </Card>
                </Col>

                {/* add to cart  */}
                <Col
                  span={{ md: 12, sm: 24 }}
                  style={{
                    minWidth: 300,
                    height: 150,
                    border: "1px black solid",
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 5
                  }}
                >
                  <Row justify="space-between">
                    <Col>Price</Col>
                    <Col>${tarProduct.price}</Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>Status</Col>
                    <Col>
                      {tarProduct.countInStock > 0 ? (
                        <p style={{ color: "#4BB543" }}>In Stock</p>
                      ) : (
                        <p style={{ color: "#CA0B00" }}>Not Availablce</p>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <button
                      style={{
                        width: "100%",
                        backgroundColor: "#ff9900",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      Add to Cart
                    </button>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
