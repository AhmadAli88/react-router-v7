import React from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      Here is Dashboard
      <Outlet />
    </div>
  );
};

export default Dashboard;
