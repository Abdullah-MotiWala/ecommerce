import { useParams } from "react-router-dom";
import React, { useEffect} from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import { Spin } from "antd";
import { Alert } from "antd";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET
} from "../constants/orderConstants";
import { Button } from "antd";

export default function OrderScreen(props) {
  const params = useParams();
  const { id: orderId } = params;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay
    // success: successPay
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);

  const {
    loading: loadingDeliver,
    error: errorDeliver
    // success: successDeliver
  } = orderDeliver;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_PAY_RESET });
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <Spin />
  ) : error ? (
    <Alert message="Error" description={error} type="error" showIcon />
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shippring</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Alert
                    type="success"
                    message={`Delivered at ${order.deliveredAt}`}
                  />
                ) : (
                  <Alert type="error" message="Not Delivered" />
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Alert type="success" message={`Paid at ${order.paidAt}`} />
                ) : (
                  <Alert type="error" message="Not Paid" />
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  <>
                    {errorPay && (
                      <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                      />
                    )}
                    {loadingPay && <Spin />}
                    <Button onClick={""}>Pay The Bill</Button>
                  </>
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <Spin />}
                  {errorDeliver && (
                    <Alert
                      message="Error"
                      description={error}
                      type="error"
                      showIcon
                    />
                  )}
                  <PayPalButton
                    type="button"
                    className="primary block"
                    onClick={successPaymentHandler}
                  >
                    Deliver Order
                  </PayPalButton>
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <Spin />}
                  {errorDeliver && (
                    <Alert type="error" message={errorDeliver} />
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
