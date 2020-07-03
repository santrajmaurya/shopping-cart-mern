import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#001529",
        color: "wheat",
        position: "sticky", 
        bottom: "0"
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  );
};

export default FooterComponent;
