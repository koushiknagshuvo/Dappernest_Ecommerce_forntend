import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [icon, setIcon] = useState("");
  const [id, setId] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  // Get Single Category
  const getSingleCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/category/single-category/${params.slug}`
      );
      setName(data?.category?.name);
      setId(data?.category?._id);

      console.log(data?.category?.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleCategory();
    //eslint-disable-next-line
  }, []);

  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      photo && productData.append("photo", photo);
      icon && productData.append("icon", icon);

      const { data } = axios.put(
        `/api/v1/category/update-category/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
        navigate("/dashboard/admin/create-category");
      } else {
        toast.success("Product Updateted Successfully");
        navigate("/dashboard/admin/create-category");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-12 col-md-9 col-lg-9">
            <h1>Update Categoory</h1>

            <div className="mb-3">
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
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`/api/v1/category/category-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
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
              {icon ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(icon)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`/api/v1/category/category-icon/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button
                className="btn btn-primary"
                onClick={handleCategoryUpdate}>
                Update Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
