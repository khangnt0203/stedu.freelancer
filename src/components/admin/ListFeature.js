import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import ManageSubject from "./ManageSubject";
import ManageUser from "./ManageUser";
import ManageDepositRequest from "./ManagePayment";
import ManageFee from "./ManageFee";

function ListFeature(props) {
  const [currentTab, setCurrentTab] = useState("subject");
  const FEATURE_TABS = [
    {
      value: "subject",
      name:'Quản lý Môn học',
      component: <ManageSubject />,
    },
    {
      value: "user",
      name:'Quản lý Đăng ký gia sư',
      component: <ManageUser/>,
    },
    {
      value: "discount",
      name:'Quản lý Cấu hình phí dịch vụ',
      component: <ManageFee/>,
    },
    {
      value: "deposit",
      name:'Quản lý Thanh toán',
      component: <ManageDepositRequest/>,
    },
    // {
    //   value: "withdraw",
    //   name:'Quản lý Yêu cầu rút tiền',
    //   component: "",
    // },
  ];
  return (
    <div>
      <Tabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}   variant="scrollable"
  scrollButtons="auto">
        {FEATURE_TABS.map((tab) => (
          <Tab key={tab.value} label={tab.name} value={tab.value} />
        ))}
      </Tabs>
      {FEATURE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </div>
  );
}

export default ListFeature;
