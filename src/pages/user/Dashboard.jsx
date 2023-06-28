import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Users Dashbord "}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <UserMenu />
          </div>
          <div className="col-12 col-md-6 col-lg-8">
            <h4 className="my_profile">Personal information</h4>

            <div className="Personal_information">
              <div className="row">
                <div className="col-md-6">
                  <div className="Profile_name">
                    <h5> {auth?.user?.name}</h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="Profile_name">
                    <p>Full Name </p>
                    <h6> {auth?.user?.name}</h6>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="Profile_email">
                    <p>Email </p>
                    <h6> {auth?.user?.email}</h6>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="Profile_number">
                    <p>Phone Number </p>
                    <h6> {auth?.user?.phone}</h6>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="Profile_address">
                    <p>Address </p>
                    <h6> {auth?.user?.address}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
