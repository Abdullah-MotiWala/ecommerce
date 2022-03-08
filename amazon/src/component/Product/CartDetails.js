import { DeleteTwoTone } from "@ant-design/icons";
import { Avatar, Col, Row, Image, Button, Divider, Modal} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { useNavigate } from "react-router-dom";

export default function CartDetails() {

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  
  //getting id and qty from URL
  let { id } = useParams();
  let qty = searchParams.get("qty");

  const cart = useSelector((state) => state.addToCart);
  const { cartItems } = cart;

  function warning() {
    Modal.warning({
      title: "Out of Stock",
      content: "We have no more of this item, please choose another one"
    });
  }
  //chnage handle for cart counter
  const changeHandler = (value, stock, e) => {};

  //remove cart item
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    //navigate to sign in page
    navigate('/signin?redirect=/shipping');
  };

  useEffect(() => {
    id && dispatch(addToCart(id, qty));
  }, [id, qty, dispatch]);
  return (
    <div>
      <Navbar />
      <h1 style={{ color: "#203040" }}>Cart Details</h1>
      {cartItems.length === 0 ? (
        <p>
          Cart is Empty Come Back with <Link to="/"> shopping</Link>
        </p>
      ) : (
        <Row justify="space-around">
          <Col md={18} sm={24} xs={24}>
            {cartItems.map((prod, ind) => {
              return (
                <span key={ind}>
                  <Row
                    justify="space-around"
                    align="middle"
                    style={{ marginTop: 5 }}
                    className="cartRow"
                  >
                    {/* inner col for cart info and image */}
                    <Col md={8} sm={24} xs={24}>
                      <Row
                        gutter={[20, 5]}
                        justify="space-around"
                        align="bottom"
                      >
                        <Col>
                          <Avatar
                            shape="square"
                            size={64}
                            src={
                              <Image src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
                            }
                          ></Avatar>
                        </Col>
                        <Col>
                          <span style={{ fontSize: "1.15em" }}>
                            {prod.name}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                    {/* innner col for cart details */}

                    <Col
                      md={8}
                      sm={24}
                      xs={24}
                      style={{ borderRadius: 5 }}
                      className="cartDet"
                    >
                      <Row justify="space-around" align="middle">
                        <input
                          type={"number"}
                          min={1}
                          value={prod.qty}
                          onChange={(e) => {
                            e.target.value > prod.countInStock
                              ? warning()
                              : dispatch(
                                  addToCart(prod.product, e.target.value)
                                );
                          }}
                        />
                        <span>${prod.price}</span>
                        <DeleteTwoTone
                          onClick={() => removeFromCartHandler(prod.product)}
                          twoToneColor="#e30000"
                          style={{ fontSize: 50, cursor: "pointer" }}
                        />
                      </Row>
                    </Col>
                  </Row>
                  <Divider />
                </span>
              );
            })}
          </Col>
          {/* major col for cart btns */}
          <Col
            md={6}
            sm={24}
            xs={24}
            style={{
              border: "1px solid black",
              minWidth: 300,
              height: 100,
              borderRadius: 5,
              padding: 10,
              marginTop: 5,
              backgroundColor: "#fff"
            }}
            className="cartCheckout"
          >
            <Row justify="space-between" align="center">
              <span style={{ fontWeight: "bold" }}>
                Total Items :{" "}
                {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)}
                <br />
                Sub Total : $
                {cartItems.reduce((a, c) => +a + c.price * c.qty, 0)}
              </span>
            </Row>
            <Row>
              <Button
                type="default"
                style={{
                  width: "93%",
                  backgroundColor: "#ff9900",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  position: "absolute",
                  bottom: "5px",
                  borderRadius: "2px"
                }}
                onClick={checkOutHandler}
              >
                Check Out
              </Button>
            </Row>
          </Col>
        </Row>
      )}
      <Footer />
    </div>
  );
}
