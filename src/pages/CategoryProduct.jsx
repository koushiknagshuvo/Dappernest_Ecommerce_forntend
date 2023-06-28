import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "./styles/Homepage.css";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
  const [Loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        {Loading ? (
          <>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: "100vh" }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container mt-5 pt-5 category">
              <h2 className="text-center">Category - {category?.name}</h2>
              <h6 className="text-center">{products?.length} result found </h6>
              <div className="container row mx-md-auto home-page">
                {products?.map((p) => (
                  <div className="col-md-3 mt-5 Category_product" key={p._id}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />

                    <div
                      className="card-name-price"
                      onClick={() => navigate(`/product/${p.slug}`)}>
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "BDT",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-dark ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                        }}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <hr className="mt-5" />
      </Layout>
    </>
  );
};

export default CategoryProduct;
