import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Spin, Alert, Divider, InputNumber, Modal } from "antd";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../redux/actions/porductActions";

export default function ProductDetail(props) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [cartQty, setCartQty] = useState();

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id]);
  const productDet = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDet;
  console.log("running");

  //popup function for above countinstock item selection
  function warning() {
    Modal.warning({
      title: "Out of Stock",
      content: "We have no more of this item, please choose another one"
    });
  }
  const changeHandler = (value) => {
    value <= product.countInStock ? setCartQty(value) : warning();
  };
  return (
    <div>
      {error ? (
        <Alert message={error} type="error" showIcon />
      ) : loading ? (
        <Spin size="large" style={{ margin: 20 }} />
      ) : (
        <>
          {/* product image */}
          <Row justify="center">
            <Col span={{ md: 12, sm: 24 }} style={{ padding: "5px" }}>
              <img
                alt={product.description}
                src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                className="proImage"
              />
            </Col>

            {/* product detail  */}
            <Col span={12} style={{ textAlign: "center" }}>
              <Row className="proDetRow" align="center" justify="space-around">
                <Col span={{ md: 12, sm: 24 }} className="proDetCol">
                  <Card
                    title={product.brand}
                    bordered={false}
                    style={{ width: 250, textAlign: "left" }}
                  >
                    <p>{product.numReviews} reviews</p>
                    <p>Price : ${product.price}</p>
                    <p>Description : {product.description}</p>
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
                    marginTop: 5,
                    position: "relative"
                  }}
                >
                  <Row justify="space-between">
                    <Col>Price</Col>
                    <Col>${product.price}</Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <p style={{ color: "#4BB543", margin: "auto" }}>
                          In Stock
                        </p>
                      ) : (
                        <p style={{ color: "#CA0B00", margin: "auto" }}>
                          Not Availablce
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Divider style={{ margin: 10 }} orientation="center" />
                  <Row justify="space-between" align="center">
                    <Col>Qty</Col>
                    <Col>
                      <InputNumber
                        min={1}
                        disabled={product.countInStock === 0}
                        defaultValue={product.countInStock > 1 ? 1 : 0}
                        bordered={true}
                        value={cartQty}
                        onChange={(value) => changeHandler(value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <button
                      style={{
                        width: "93%",
                        backgroundColor: "#ff9900",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                        position: "absolute",
                        bottom: "10px",
                        borderRadius: "2px"
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
