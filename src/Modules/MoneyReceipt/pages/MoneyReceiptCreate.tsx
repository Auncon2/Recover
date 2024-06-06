import { Tabs } from "antd";

import CreateMoneyReceipInvoice from "../components/CreateMoneyReceipInvoice";
import TabPane from "antd/es/tabs/TabPane";
import { useParams } from "react-router-dom";
import CreateMoneyReceiptV2 from "../components/CreateMoneyReceiptV2";
import { FaFileInvoiceDollar, FaRegUser } from "react-icons/fa6";

const MoneyReceiptCreate = () => {
  const { guestid, invoiceid } = useParams();
  return (
    <>
      <Tabs
        defaultActiveKey={
          guestid != "create" || invoiceid != "money-receipt" ? "1" : "2"
        }
      >
        {[
          //   { component: <CreateMoneyReceipt /> , icon: AppleOutlined, key: "1" },
          {
            component: <CreateMoneyReceiptV2 />,
            icon: FaRegUser,
            key: "1",
          },
          {
            component: <CreateMoneyReceipInvoice />,
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
                  ? "Create Money Receipt With Guest"
                  : "Create Money Receipt With Invoice"}
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

export default MoneyReceiptCreate;
