import React from "react";
import { Card } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Star from "./Star";

export default function ProductCard(props) {
  // const {_id,name,category,image,price,countInStock,brand,rating,numReviews,description} = props.product;
  // console.log(props.product)
  const { product } = props;
  const {
    _id,
    name,
    category,
    image,
    price,
    countInStock,
    brand,
    rating,
    numReviews,
    description
  } = product;
  const { Meta } = Card;
  return (
    <div>
      <Link to={`productdetail/${_id}`}>
        <Card
          actions={[<Star />, <span>{numReviews} Reviews</span>]}
          hoverable
          style={{ width: 240, marginTop: 10 }}
          cover={
            <img
              alt={image}
              src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2022/January/ValentinesDay/Fuji_Vday_dash_1X._SY304_CB646464301_.jpg"
            />
          }
        >
          <Meta
            style={{ height: "50px" }}
            title={name}
            description={description}
          />
          <Meta
            style={{ margin: "10px auto -15px auto" }}
            title={`$${price}`}
          />
        </Card>
      </Link>
    </div>
  );
}
