import React from "react";
import { Tabs } from "antd";
import MyAccountTop from "./MyAccountTop";
import MyInfo from "./MyInfo";
import MyAddress from "./MyAddress";
import SavedCards from "./SavedCards";
import MyOrders from "./MyOrders";

const { TabPane } = Tabs;

const MyAccount: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#80808014", padding: "10px" }}>
      <MyAccountTop />
      <Tabs
        style={{ backgroundColor: "white", marginTop: "10px" }}
        tabPosition="left"
        tabBarStyle={{ textAlign: "left", backgroundColor: "white" }}
      >
        <TabPane tab="My Information" key="1">
            <MyInfo />
        </TabPane>
        <TabPane tab="Manage Address" key="2">
          <MyAddress />
        </TabPane>
        <TabPane tab="My Saved Cards" key="3">
          <SavedCards />
        </TabPane>
            <TabPane style={{ textAlign: "left"}} tab="My Orders Lists" key="4">
          <MyOrders />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MyAccount;
