import { Breadcrumb, Tabs } from "antd";

import TabPane from "antd/es/tabs/TabPane";

import { FaFileInvoiceDollar, FaRegUser } from "react-icons/fa6";
import SingleHallBookingInvoiceList from "./SingleHallBookingInvoiceList";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";

const HallBookingInvoiceModule = () => {
  return (
    <>
      <Breadcrumb
        className="my-5"
        separator=">"
        items={[
          {
            href: "/",
            title: (
              <>
                <HomeOutlined className=" me-1" />
                <span>Dashboard</span>
              </>
            ),
          },
          {
            href: "",
            title: <span>Room Booking Invoice</span>,
          },

          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  View Room Booking Invoice
                </span>
              </div>
            ),
          },
        ]}
      />

      <hr className="my-5 borde0 border-[#20a09e]" />
      <Tabs defaultActiveKey={"1"}>
        {[
          //   { component: <CreateMoneyReceipt /> , icon: AppleOutlined, key: "1" },
          {
            component: <SingleHallBookingInvoiceList copy={"Client Copy"} />,
            icon: FaRegUser,
            key: "1",
          },
          {
            component: <SingleHallBookingInvoiceList copy={"Office Copy"} />,
            icon: FaFileInvoiceDollar,
            key: "2",
          },
        ].map((tab) => (
          <TabPane
            key={tab.key}
            tab={
              <div className="flex items-center gap-2">
                <tab.icon />
                {tab.key === "1"
                  ? "Invoice Client Copy"
                  : "Invoice Office Copy"}
              </div>
            }
          >
            {tab.component}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default HallBookingInvoiceModule;
