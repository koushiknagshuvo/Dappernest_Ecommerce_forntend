import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
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
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

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

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
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
                  </div>
                )}

                {selectedOption === "bkash" && (
                  <div>
                    <h3 className="Cash_on_Delivery_h3"> 01720648273</h3>
                    <h5>Send Money a total of : {totalPrice()} </h5>
                    <input
                      type="text"
                      placeholder="Transaction Id"
                      className="bkash_input"
                    />
                    <input
                      type="text"
                      placeholder="Sending Bkash Number"
                      className="bkash_input"
                    />
                  </div>
                )}
              </div>

              {/* <button className="btn btn-primary w-100 my-2">
                Make Payment
              </button> */}
              {/* cash one delevery */}

              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={instance => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary w-100 my-2"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}>
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
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
