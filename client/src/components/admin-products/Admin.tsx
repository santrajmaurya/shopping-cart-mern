import React from "react";
import { Tabs } from "antd";
import { observer } from "mobx-react-lite";

import MyAccountTop from "../my-account/MyAccountTop";
import AddCategory from "./AddCategory";
import AddProducts from "./AddProducts";
import AdminProducts from "./AdminProducts";

const { TabPane } = Tabs;

const Admin: React.FC = observer(() => {
    return (
        <div style={{ backgroundColor: "#80808014", padding: "10px" }}>
            <MyAccountTop />
            <Tabs
                style={{ backgroundColor: "white", marginTop: "10px" }}
                tabPosition="left"
                tabBarStyle={{ textAlign: "left", backgroundColor: "white" }}
            >
                <TabPane tab="Add Category" key="1">
                    <AddCategory />
                </TabPane>
                <TabPane tab="Add Products" key="2">
                    <AddProducts />
                </TabPane>
                <TabPane tab="Manage Products" key="3">
                    <AdminProducts />
                </TabPane>
            </Tabs>
        </div>
    );
});

export default Admin;
