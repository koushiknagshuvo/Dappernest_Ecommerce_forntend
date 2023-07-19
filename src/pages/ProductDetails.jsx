import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import "./styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get all Product route
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div class="container my-4 pt-md-5 ">
        <div class="row mx-auto">
          <div class="col-12 col-md-4 product_details_img ">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="img-fluid"
              alt={product.name}
            />
          </div>
          <div class="col-12 col-md-6 me-auto product-details-info ">
            <h1 className="mt-2">{product.name}</h1>
            <h6>
              Price :
              <span className="ps-2">
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "BDT",
                })}
              </span>
            </h6>

            <div className="mb-2">
              <span className="me-2 ">(38)</span>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star-half"></i>
            </div>
            <span className="Description">
              Description : {product.description}
            </span>

            <button
              className="btn btn-dark"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
              }}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row similar-products mt-5 pt-5 ">
          <h2 className="text-center mb-5">Similar Products</h2>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          {relatedProducts?.map(p => (
            <div
              className="col-sm-12 col-md-3 mt-3 Similar_Products_cart_body"
              key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title ">{p.name}</h5>
                  <h5 className="card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "BDT",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 30)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info"
                    onClick={() => navigate(`/product/${p.slug}`)}>
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className=" mt-5" />
    </Layout>
  );
};

export default ProductDetails;
