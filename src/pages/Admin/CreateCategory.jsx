import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Forms/CategoryForm";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import "../../pages/styles/AdminDashbord.css";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [icon, setIcon] = useState("");

  // create Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryDate = new FormData();
      categoryDate.append("name", name);
      categoryDate.append("photo", photo);
      categoryDate.append("icon", icon);

      const { data } = await axios.post(
        "/api/v1/category/create-category",
        categoryDate
      );
      if (data?.success) {
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className=" container mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <div className="my-3">
                <h6>Upload icon</h6>
                <label className="btn btn-outline-secondary col-md-12">
                  {icon ? icon.name : "Upload icon"}
                  <input
                    type="file"
                    name="icon"
                    accept="image/*"
                    onChange={(e) => setIcon(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {icon && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(icon)}
                      alt="category_icon"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="my-3">
                <h6>Upload Photo</h6>
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="category_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Category Icon</th>
                    <th scope="col">Category Photo</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td>
                          <div
                            className="category_image card"
                            style={{ width: "5rem" }}>
                            <img
                              src={`/api/v1/category/category-icon/${c._id}`}
                              alt={c.name}
                            />
                          </div>
                        </td>
                        <td>
                          <div
                            className="category_image card"
                            style={{ width: "5rem" }}>
                            <img
                              src={`/api/v1/category/category-photo/${c._id}`}
                              alt={c.name}
                            />
                          </div>
                        </td>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <Link
                            className="btn btn-primary ms-2"
                            to={`/dashboard/admin/update-category/${c.slug}`}>
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
