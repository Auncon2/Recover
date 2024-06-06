import { Row, Col, Space, theme } from "antd";
import { FaHotel, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
// import { TbFileInvoice } from "react-icons/tb";
import { useGeDahsboardListQuery } from "../api/DashboardEndPoint";
import { BsBarChartFill, BsCashCoin } from "react-icons/bs";
import { useAppSelector } from "../../../app/store/store";
import { globalTheme } from "../../../app/slice/themeSlice";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { motion } from "framer-motion";

const TopCard = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const { data: dashboard } = useGeDahsboardListQuery();
  const {
    // due_invoice_amount,
    total_advance_payment_fm_guest,
    total_expense,
    total_invoice,
    total_room,
  } = dashboard?.data || {};

  // Dummy data for the cards
  const cardsData = [
    {
      title: "Total Room",
      value: Number(total_room ? total_room : 0),
      icon: <FaHotel style={{ fontSize: 20, color: "white" }} />,

      charticon: <BiSolidBarChartAlt2 color="skyblue" />,
      charticon2: <BsBarChartFill size={23} color="skyblue" />,
      textcolor: "#208000",
      logoCardColor: "linear-gradient(to right,#09a5a5, #06cece)",
    },
    {
      title: "Total Expenses",
      value: total_expense ? total_expense : 0,
      icon: <GiTakeMyMoney style={{ fontSize: 24, color: "White" }} />,
      charticon: <BiSolidBarChartAlt2 color="#3bb300" />,
      charticon2: <BsBarChartFill size={23} color="#3bb300" />,
      textcolor: "#208000",
      logoCardColor: "linear-gradient(to right,#3bb300,#4ce600)",
    },
    {
      title: "Total Advance Payment",
      value: Number(
        total_advance_payment_fm_guest ? total_advance_payment_fm_guest : 0
      ),
      icon: <BsCashCoin style={{ fontSize: 24, color: "White" }} />,
      charticon: <BiSolidBarChartAlt2 color="#b3b300" />,
      charticon2: <BsBarChartFill size={23} color="#b3b300" />,
      textcolor: "#208000",
      logoCardColor: "linear-gradient(to right,#b3b300,#e6e600)",
    },
    {
      title: "Total Invoice",
      value: Number(total_invoice ? total_invoice : 0),
      icon: <FaMoneyBillTrendUp style={{ fontSize: 24, color: "White" }} />,
      charticon: <BiSolidBarChartAlt2 color="#ff8000" />,
      charticon2: <BsBarChartFill size={23} color="#ff8000" />,
      textcolor: "#208000",
      logoCardColor: "linear-gradient(to right,#cc6600, #ff8000)",
    },
    // {
    //   title: "Due Invoice Amount",
    //   value: Number(due_invoice_amount ? due_invoice_amount : 0),
    //   icon: <TbFileInvoice style={{ fontSize: 24, color: "White" }} />,
    //   charticon: <BiSolidBarChartAlt2 color="skyblue" />,
    //   charticon2: <BsBarChartFill size={23} color="skyblue" />,
    //   textcolor: "#87ceeb",
    // },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
        {cardsData.map((card, index) => (
          <Col key={index} xs={24} md={24} lg={12} xl={12} xxl={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor:
                  themeGlobal.theme === theme.defaultAlgorithm
                    ? "white"
                    : "#121212",
                padding: "10px",

                borderRadius: "10px",
              }}
            >
              <div style={{ paddingLeft: "20px", fontWeight: "bolder" }}>
                <p style={{ fontSize: "15px", color: "#01adad" }}>
                  {card.title}
                </p>
                <p
                  style={{
                    fontSize: "25px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      color:
                        themeGlobal.theme === theme.defaultAlgorithm
                          ? "#47697f"
                          : "",
                      fontSize: "18px",
                    }}
                  >
                    {card.value.toLocaleString()}
                  </span>

                  <Space.Compact>
                    {card.charticon}
                    {card.charticon2}
                  </Space.Compact>
                </p>
              </div>
              <div style={{ paddingRight: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundImage: card.logoCardColor,
                    padding: "12px",
                    borderRadius: "10px",
                  }}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
};

export default TopCard;
