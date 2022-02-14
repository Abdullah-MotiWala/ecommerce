import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";

export default function CartDetails() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  //getting id and qty from URL
  let { id } = useParams();
  let qty = searchParams.get("qty");

  useEffect(() => {
    id && dispatch(addToCart(id, qty));
  }, [id,qty,dispatch]);

  return <div>CardDetails</div>;
}
