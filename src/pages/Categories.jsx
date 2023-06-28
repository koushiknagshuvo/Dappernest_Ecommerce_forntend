import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategoty";
import "../pages/styles/AdminDashbord.css";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div style={{ marginTop: "50px" }}>
        <div className="container">
          <div className="row gx-3 overflow-hidden">
            {categories.map((c) => (
              <div
                className="col-12 col-md-6 col-lg-4 All_indivisual_category overflow-hidden "
                key={c._id}>
                <div className="category_image  p-3">
                  <Link
                    to={`/category/${c.slug}`}
                    className="All_indivisual_category_name">
                    <img
                      className="All_indivisual_category_image"
                      src={`/api/v1/category/category-photo/${c._id}`}
                      alt={c.name}
                    />
                    {c.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
