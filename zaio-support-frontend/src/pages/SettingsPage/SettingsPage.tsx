import React, { useContext, useEffect, useState } from "react";
import { DashboardSidebar } from "../../components/DashboardSidebar/DashboardSidebar";
import { DashboardNavbar } from "../../components/DashboardNavbar/DashboardNavbar";
import { UserContext } from "../../context/UserContext";
import { Spinner } from "react-bootstrap";
import "./SettingsPage.css";

interface Props {}

export const SettingsPage = (props: Props) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, []);
  return (
    <div>
      <DashboardNavbar />
      <div className="d-flex mt-5">
        <DashboardSidebar />
        <div className="w-100">
          <div className="dashboard-header">
            Settings{" "}
            {loading && <Spinner animation="border" className="ms-3" />}
          </div>
          <div className="dashboard-main settings-page">
            <p className="fw-bold title">Account Info</p>
            <hr />
            <div className="row">
              <div className="col-4">
                <p className="setting">Email</p>
              </div>
              <div className="col-4">
                <p className="current">{user?.email}</p>
              </div>
              <div className="col-4 edit-container">
                <i className="bi bi-pencil-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
