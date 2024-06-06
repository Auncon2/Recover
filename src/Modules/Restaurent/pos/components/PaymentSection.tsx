import { useDispatch, useSelector } from "react-redux";
import {
  BANK,
  CASH,
  CASHBACK,
  E_WALLET,
  PERCANTAGE,
} from "../utils/pos-constant";
import {
  calculateChangeAmount,
  inputDiscount,
  inputPaidAmount,
  paymentDone,
  selectDiscountType,
  selectedPaymentType,
} from "../api/posSlice";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  PrinterOutlined,
  BankOutlined,
  WalletOutlined,
  DollarOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { Button, Col, InputNumber, Row, Space, Typography } from "antd";
import { AiTwotoneContainer } from "react-icons/ai";
const { Text } = Typography;

interface Props {
  isLoading: boolean;
  handlePaymentNow: any;
}

const PaymentSection: React.FC<Props> = ({ handlePaymentNow, isLoading }) => {
  const {
    change,
    netTotal,
    paymentType,
    discountType,
    paidAmount,
    // invoiceNumber,
  } = useSelector((state: any) => state.pos);
  const dispatch = useDispatch();

  const fullInvoicePrintRef = useRef<HTMLDivElement>(null);
  const customerPrintRef = useRef<HTMLDivElement>(null);
  const chefPrintRef = useRef<HTMLDivElement>(null);
  const tokenPrintRef = useRef<HTMLDivElement>(null);

  const handleFullInvoicePrintOut = useReactToPrint({
    content: () => fullInvoicePrintRef.current,
  });
  const handleCustomerPrintOut = useReactToPrint({
    content: () => customerPrintRef.current,
  });
  const handleChefPrintOut = useReactToPrint({
    content: () => chefPrintRef.current,
  });
  const handleTokenPrintOut = useReactToPrint({
    content: () => tokenPrintRef.current,
  });

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Row gutter={10}>
        <Col span={6}>
          <Button
            onClick={handleFullInvoicePrintOut}
            icon={<PrinterOutlined />}
            block
          >
            FULL INVOICE
          </Button>
        </Col>
        <Col span={6}>
          <Button
            onClick={handleCustomerPrintOut}
            icon={<PrinterOutlined />}
            block
          >
            INVOICE
          </Button>
        </Col>
        <Col span={6}>
          <Button onClick={handleChefPrintOut} icon={<PrinterOutlined />} block>
            CHEF
          </Button>
        </Col>
        <Col span={6}>
          <Button
            onClick={handleTokenPrintOut}
            icon={<PrinterOutlined />}
            block
          >
            TOKEN
          </Button>
        </Col>
      </Row>

      <Text
        style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        Select payment type
      </Text>

      <Row gutter={10}>
        <Col span={8}>
          <Button
            onClick={() => dispatch(selectedPaymentType(CASH))}
            icon={<DollarOutlined />}
            style={{
              backgroundColor: `${
                paymentType === CASH ? "#0157B7" : "transparent"
              }`,
              color: `${paymentType === CASH ? "white" : "black"}`,
            }}
            block
          >
            CASH
          </Button>
        </Col>
        <Col span={8}>
          <Button
            onClick={() => dispatch(selectedPaymentType(BANK))}
            style={{
              backgroundColor: `${
                paymentType === BANK ? "#0157B7" : "transparent"
              }`,
              color: `${paymentType === BANK ? "white" : "black"}`,
            }}
            icon={<BankOutlined />}
            block
          >
            BANK
          </Button>
        </Col>
        <Col span={8}>
          <Button
            onClick={() => dispatch(selectedPaymentType(E_WALLET))}
            style={{
              backgroundColor: `${
                paymentType === E_WALLET ? "#0157B7" : "transparent"
              }`,
              color: `${paymentType === E_WALLET ? "white" : "black"}`,
            }}
            icon={<WalletOutlined />}
            block
          >
            E-WALLET
          </Button>
        </Col>
      </Row>

      <Text
        style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        Select discount type
      </Text>

      <Row gutter={10}>
        <Col span={8}>
          <Button
            onClick={() => dispatch(selectDiscountType(PERCANTAGE))}
            style={{
              backgroundColor: `${
                discountType === PERCANTAGE ? "#0157B7" : "transparent"
              }`,
              color: `${discountType === PERCANTAGE ? "white" : "black"}`,
            }}
            icon={<PercentageOutlined />}
            block
          >
            DISCOUNT
          </Button>
        </Col>
        <Col span={8}>
          <Button
            onClick={() => dispatch(selectDiscountType(CASHBACK))}
            style={{
              backgroundColor: `${
                discountType === CASHBACK ? "#0157B7" : "transparent"
              }`,
              color: `${discountType === CASHBACK ? "white" : "black"}`,
            }}
            icon={<DollarOutlined />}
            block
          >
            FIXED DISCOUNT
          </Button>
        </Col>
        <Col span={8}>
          <InputNumber
            onChange={(value) => dispatch(inputDiscount(value || 0))}
            style={{ minWidth: "100%" }}
            placeholder="Input Discount"
          />
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={12}>
          <Text style={{}}>
            Payable Amount<Text type="danger">*</Text>
          </Text>
          <InputNumber
            onChange={(value) => {
              dispatch(inputPaidAmount(value || 0));
              dispatch(calculateChangeAmount(value || 0));
            }}
            style={{ minWidth: "100%" }}
            placeholder="Payable amount"
          />
        </Col>
        <Col span={12}>
          <Text>Change Amount</Text>
          <InputNumber
            value={change}
            style={{ minWidth: "100%" }}
            placeholder="Change amount"
            readOnly
          />
        </Col>
      </Row>

      <Button
        onClick={() => {
          handlePaymentNow();
          dispatch(paymentDone());
        }}
        disabled={paidAmount >= netTotal ? false : true}
        type="primary"
        icon={<AiTwotoneContainer />}
        loading={isLoading}
      >
        Pay Now
      </Button>

      <div style={{ display: "none" }}>
        {/* <InvoicePageTwo
          id={invoiceNumber}
          fullInvoicePrintRef={fullInvoicePrintRef}
          customerPrintRef={customerPrintRef}
          chefPrintRef={chefPrintRef}
          tokenPrintRef={tokenPrintRef}
        /> */}
        aa
      </div>
    </Space>
  );
};

export default PaymentSection;
