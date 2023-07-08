import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategoty";
import "../pages/styles/AdminDashbord.css";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div>
        <div className="container mt-5">
          <div className="row gx-3">
            {categories.map(c => (
              <div
                className=" card col-12 col-md-6 col-lg-4 mt-3 All_indivisual_category "
                key={c._id}>
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
