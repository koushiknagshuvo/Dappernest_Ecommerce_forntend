/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";

import "./styles/Homepage.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Categories from "./Categories";
import Q_and_A from "../components/Layout/Q_and_A";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* Hero banner */}
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper">
          <SwiperSlide>
            <img src="./images/Hero1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/Hero2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/Hero3.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/Hero4.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* Hero banner */}

      {/* Categories */}
      <h1 className="text-center mt-5 pt-xl-5  Categories_title">
        Top Trending Collections
      </h1>
      <Categories />
      {/* Categories */}

      {/*  fashion outfit */}

      <div className="Trending_fashion_outfit">
        <h1>Trending Ramadan fashion outfit</h1>
        <h6>Big time gifts, for every One.</h6>
        <NavLink className="btn btn-primary" to="/shop">
          Shop Now
        </NavLink>
      </div>
      {/* fashion outfit*/}

      <div className="home-page container">
        <h1 className="All_Products">Trending Now </h1>
        <div className="row gx-3">
          {products?.map((p) => (
            <div className="card mt-5 col-md-6 col-xl-3" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div
                  className="card-name-price"
                  onClick={() => navigate(`/product/${p.slug}`)}>
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className=" card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "BDT",
                    })}
                  </h5>
                </div>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <div className="card-name-price">
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className=" mb-5 mt-5">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                {loading ? "Loading ..." : <>Loadmore</>}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Q And A Section */}

      <Q_and_A />
      {/* Q And A Section */}

      {/* SHIPPING */}
      <div className="SHIPPING">
        <div className="container  d-flex justify-content-between flex-wrap">
          <div className="WORLDWIDE_SHIPPING d-flex">
            <i class="bx bx-package"></i>
            <h6>Worldwide Shipping</h6>
          </div>
          <div className="WORLDWIDE_SHIPPING d-flex">
            <i class="bx bx-refresh"></i>
            <h6>Easy Return</h6>
          </div>
          <div className="WORLDWIDE_SHIPPING d-flex">
            <i class="bx bx-shape-circle"></i>
            <h6>24/7 Support</h6>
          </div>
          <div className="WORLDWIDE_SHIPPING d-flex">
            <i class="bx bx-shield-alt-2"></i>
            <h6>Suquired Delevary</h6>
          </div>
        </div>
      </div>

      {/* SHIPPING */}
    </Layout>
  );
};

export default HomePage;
