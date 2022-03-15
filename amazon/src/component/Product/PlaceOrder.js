import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { Alert } from "antd";
import { createdOrder } from "../../redux/actions/orderActions";
import { useNavigate } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../../redux/constant/orderConstant";

export default function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // iterating addToCart redux state into cart
  const cart = useSelector((state) => state.addToCart);
  const { loading, success, error, order } = useSelector(
    (state) => state.orderCreate
  );

  // if order dispatched successfully it will be redirected to order completion page
  useEffect(() => {
    if (success) {
      console.log(order);
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, navigate, order, success]);
  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = toPrice(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );
  const placeOrderHandler = () => {
    // cart items is the array of items store in redux state of addToCart
    dispatch(createdOrder({ ...cart, orderItems: cart.cartItems }));
  };

  const IsError = () => {
    return <Alert message="Error" description={error} type="error" showIcon />;
  };
  return (
    <div>
      {loading ? (
        <Spin size="large" style={{ margin: 20 }} />
      ) : (
        <>
          {error && <IsError />}
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong> {cart.shippingAddress.name} <br />
                      <strong>Address: </strong> {cart.shippingAddress.address},
                      {cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.postalCode},
                      {cart.shippingAddress.country}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong> {cart.paymentMethod}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {cart.cartItems.map((item) => (
                        <li key={item.product}>
                          <div className="row">
                            <div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div>
                            <div className="min-30">
                              <Link to={`/productdetail/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>

                            <div>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>${cart.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>${cart.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>${cart.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={placeOrderHandler}
                      className="primary block"
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
