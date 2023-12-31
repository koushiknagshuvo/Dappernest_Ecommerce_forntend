import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Layout from "./../components/Layout/Layout";
import "./styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [TransactionId, setTransactionId] = useState("");
  const [BkashNumber, setBkashNumber] = useState("");
  const [CashOnDelevary, setCashOnDelevary] = useState(
    "Buyer Choose Cash On Delivery Option"
  );

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map(item => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "BDT",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = pid => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCashOnDelevary = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/product/order/Cashpayment", {
        option: CashOnDelevary,
        cart,
      });

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePamentByBkash = async e => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/product/order/payment", {
        TransactionId,
        BkashNumber,
        cart,
      });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = e => {
    setSelectedOption(e.target.value);
  };
  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-4 mb-5">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7 overflow-hidden ">
              {cart?.map(p => (
                <div key={p._id}>
                  <div className="d-flex indivisual_cart_information">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="img-fluid"
                      alt={p.name}
                    />
                    <div className=" indivisual_cart_information_form">
                      <h2>{p.name}</h2>
                      <p className="cart_price">Price : {p.price}</p>
                      <p>{p.description.substring(0, 100)} ...</p>

                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary mt-4 ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}>
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}>
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }>
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}

              {/* cash one delevery */}
              <div className="Payment_methode">
                <label className="Cash_on_Delivery">
                  <input
                    className="mx-2"
                    type="radio"
                    value="cash"
                    checked={selectedOption === "cash"}
                    onChange={handleOptionChange}
                  />
                  Cash on Delivery
                </label>
                <label className="mx-2 pay_by_bkash">
                  <input
                    className="mx-2"
                    type="radio"
                    value="bkash"
                    checked={selectedOption === "bkash"}
                    onChange={handleOptionChange}
                  />
                  Pay by Bkash
                </label>

                {selectedOption === "cash" && (
                  <div>
                    <h3 className="Cash_on_Delivery_h3">
                      You Choose Cash On Delivery Option
                    </h3>
                    <input
                      type="text"
                      placeholder="Buyer Choose Cash On Delivery Option"
                      className="bkash_input"
                      value={CashOnDelevary}
                      onChange={e => setCashOnDelevary(e.target.value)}
                    />
                    <button
                      className="btn btn-primary w-100 my-2"
                      onClick={handleCashOnDelevary}>
                      Make Payment On Cash
                    </button>
                  </div>
                )}

                {selectedOption === "bkash" && (
                  <div>
                    <h4 className="Cash_on_Delivery_h3">
                      Please Send Money On Bkash [Personal]
                    </h4>
                    <h3 className="Delivery_buy_bkash_h3">
                      <span>0</span>
                      <span>1</span>
                      <span>7</span>
                      <span>2</span>
                      <span>0</span>
                      <span>6</span>
                      <span>4</span>
                      <span>8</span>
                      <span>2</span>
                      <span>7</span>
                      <span>3</span>
                    </h3>
                    <h5>Send Money A Total Of : {totalPrice()} </h5>
                    <input
                      type="text"
                      placeholder="Transaction Id"
                      className="bkash_input"
                      required
                      onChange={e => setTransactionId(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Sending Bkash Number"
                      className="bkash_input"
                      required
                      onChange={e => setBkashNumber(e.target.value)}
                    />
                    <button
                      className="btn btn-primary w-100 my-2"
                      onClick={handlePamentByBkash}>
                      Make Payment By bKash
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5 pt-3" />
    </Layout>
  );
};

export default CartPage;
