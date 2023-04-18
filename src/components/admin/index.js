import React from "react";
import ListFeature from "./ListFeature";
import WelcomeUser from "../layout/WelcomeUser";

function AdminPage(props) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-4">
      <WelcomeUser />
      <ListFeature />
    </div>
  );
}

export default AdminPage;
