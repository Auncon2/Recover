import { Card, Col, Divider, Row, Space, Typography } from "antd";
import moment from "moment";

import { tokenNoGenerate } from "../../utilities/helper";
import { Ref } from "react";
import { IProfile } from "../../auth/types/loginTypes";
import {
  ICheckingOrder,
  IInvoice,
} from "../../Modules/Restaurent/pos/types/pointOfSalesTypes";
const { Text } = Typography;

interface Props {
  fullInvoicePrintRef: Ref<HTMLDivElement>;
  customerPrintRef: Ref<HTMLDivElement>;
  chefPrintRef: Ref<HTMLDivElement>;
  tokenPrintRef: Ref<HTMLDivElement>;
  profile: IProfile;
  invoice: IInvoice;
}

const Invoice: React.FC<Props> = ({
  fullInvoicePrintRef,
  customerPrintRef,
  chefPrintRef,
  tokenPrintRef,
  //   profile,
  invoice,
}) => {
  const tokenNumber = tokenNoGenerate();

  return (
    <div style={{ maxWidth: "35%", margin: "0 auto" }}>
      <Card size="small" ref={fullInvoicePrintRef}>
        {/* invoice? */}
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          ref={customerPrintRef}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Text style={{ fontSize: "1.25rem", display: "block" }}>
              {/* {profile?.restaurant_name || "N/A"} */}
            </Text>
            <Text style={{ display: "block" }}>
              {/* {profile?.restaurant_address || "N/A"} */}
            </Text>
            <Text style={{ display: "block" }}>
              {/* Hotline: {profile?.restaurant_hotline || "N/A"} */}
            </Text>
            <Text style={{ display: "block" }}>
              {moment(invoice?.invoice_created_at)
                .subtract(6, "hours")
                .format("YYYY-MM-DD, hh:mm A")}
            </Text>
            <Text style={{ display: "block" }}>
              {/* BIN No: {profile?.restaurant_bin_number || "N/A"} */}
            </Text>
            <Text style={{ display: "block" }}>MUSAK: 6.3</Text>
          </div>

          <div>
            <Text
              style={{ display: "block", borderBottom: "1px dashed black" }}
            >
              <strong>Customer Type:</strong>{" "}
              {/* {(invoice?.invoice_customer_type === DINEIN && "Dine In") ||
                (invoice?.invoice_customer_type === TAKEOUT && "Take Out") ||
                (invoice?.invoice_customer_type === DELIVERY && "Delivary")} */}
            </Text>
            {invoice?.table_name ? (
              <Text
                style={{ display: "block", borderBottom: "1px dashed black" }}
              >
                <strong>Table Name:</strong> {invoice?.table_name}
              </Text>
            ) : (
              <>
                {invoice?.invoice_customer_type !== "takeout" && (
                  <Text
                    style={{
                      display: "block",
                      borderBottom: "1px dashed black",
                    }}
                  >
                    <strong> Platform Name:</strong> {invoice?.invoice_platform}
                  </Text>
                )}
              </>
            )}

            <Text
              style={{ display: "block", borderBottom: "1px dashed black" }}
            >
              <strong>Staff Name:</strong> {invoice?.first_name || "N/A"}
            </Text>
          </div>

          <div>
            <Row>
              <Col
                span={12}
                style={{ backgroundColor: "#f2f2f2", fontWeight: 600 }}
              >
                Name
              </Col>
              <Col
                span={4}
                style={{ backgroundColor: "#f2f2f2", fontWeight: 600 }}
              >
                QTY
              </Col>
              <Col
                span={4}
                style={{ backgroundColor: "#f2f2f2", fontWeight: 600 }}
              >
                Rate
              </Col>
              <Col
                span={4}
                style={{ backgroundColor: "#f2f2f2", fontWeight: 600 }}
              >
                Price
              </Col>
            </Row>
            {invoice?.createdfoods?.map(
              (
                {
                  item_food_id,
                  food_item_name,
                  item_quantity,
                  item_total,
                  food_item_production_price,
                }: ICheckingOrder,
                index: number
              ) => (
                <Row key={item_food_id}>
                  <Col span={12}>
                    {index + 1}. {food_item_name}
                  </Col>
                  <Col span={4}>{item_quantity}</Col>
                  <Col span={4}>{food_item_production_price}</Col>
                  <Col span={4}>{item_total}</Col>
                </Row>
              )
            )}
          </div>

          <div>
            <Row style={{ borderBottom: "1px dashed black" }}>
              <Col span={12}>
                <Text>Gross Total</Text>
              </Col>
              <Col span={12}>
                <Text>: {invoice?.invoice_subtotal}</Text>
              </Col>
            </Row>
            <Row style={{ borderBottom: "1px dashed black" }}>
              <Col span={12}>
                <Text>Discount (%)</Text>
              </Col>
              <Col span={12}>
                <Text>: {invoice?.invoice_discount || 0.0}</Text>
              </Col>
            </Row>
            <Row style={{ borderBottom: "1px dashed black" }}>
              <Col span={12}>
                <Text>VAT (Included) 5%</Text>
              </Col>
              <Col span={12}>
                <Text>
                  :{" "}
                  {(invoice?.invoice_subtotal * 5) / 100 -
                    invoice?.invoice_discount || 0.0}
                </Text>
              </Col>
            </Row>
            <Row style={{ borderBottom: "1px dashed black" }}>
              <Col span={12}>
                <Text strong>Total Amount To Pay</Text>
              </Col>
              <Col span={12}>
                <Text>: {invoice?.invoice_net_total}</Text>
              </Col>
            </Row>
            <Row style={{ borderBottom: "1px dashed black" }}>
              <Col span={12}>
                <Text strong>Payment Method</Text>
              </Col>
              <Col span={12}>
                <Text>: {invoice?.invoice_payment_type || "N/A"}</Text>
              </Col>
            </Row>
            <Row style={{ borderBottom: "1px dashed black" }}>
              <Col span={12}>
                <Text strong>Paid Amount</Text>
              </Col>
              <Col span={12}>
                <Text>: {invoice?.invoice_total_paid || 0}</Text>
              </Col>
            </Row>
            <Row style={{ borderBottom: "1px dashed black" }}>
              <Col span={12}>
                <Text strong>Change Amount</Text>
              </Col>
              <Col span={12}>
                <Text>: {invoice?.invoice_change || 0}</Text>
              </Col>
            </Row>
            <Text
              style={{
                fontSize: "0.7rem",
                display: "block",
                textAlign: "center",
              }}
            >
              © Powered By M360ICT, www.m360ict.com
            </Text>
          </div>
        </Space>

        <Divider style={{ border: "1px dashed black" }} />

        {/* for chef */}
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          ref={chefPrintRef}
        >
          <div>
            <Text
              strong
              style={{
                display: "block",
                fontSize: "1rem",
                textAlign: "center",
              }}
            >
              CHEF RECEIPT
            </Text>
            <Text style={{ display: "block", textAlign: "center" }}>
              ORDER NO: #{invoice?.invoice_no}
            </Text>
            <Text style={{ display: "block", textAlign: "center" }}>
              Staff Name: {invoice?.table_name || "N/A"}
            </Text>
            <Text style={{ display: "block", textAlign: "center" }}>
              Table Name: {invoice?.first_name || "N/A"}
            </Text>
          </div>
          <div>
            <Row>
              <Col
                span={12}
                style={{ backgroundColor: "#f2f2f2", fontWeight: 600 }}
              >
                Name
              </Col>
              <Col
                span={12}
                style={{ backgroundColor: "#f2f2f2", fontWeight: 600 }}
              >
                QTY
              </Col>
            </Row>

            {invoice?.createdfoods?.map(
              (
                { item_food_id, food_item_name, item_quantity }: ICheckingOrder,
                index: number
              ) => (
                <Row key={item_food_id}>
                  <Col span={12}>
                    {index + 1}. {food_item_name}
                  </Col>
                  <Col span={12}>{item_quantity}</Col>
                </Row>
              )
            )}
          </div>
        </Space>

        <Divider style={{ border: "1px dashed black" }} />

        {/* customer token */}
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          ref={tokenPrintRef}
        >
          <Text style={{ display: "block", textAlign: "center" }}>
            {moment(invoice?.invoice_created_at)
              .subtract(6, "hours")
              .format("YYYY-MM-DD, hh:mm A")}
          </Text>
          <Text
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            TOKEN NO {tokenNumber}
          </Text>
          <Text style={{ display: "block", textAlign: "center" }}>
            ORDER NO #{invoice?.invoice_no}
          </Text>
          <Text
            style={{
              display: "block",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Thanks, it's a pleasure to serve you
          </Text>
          <Text
            style={{
              fontSize: "0.7rem",
              display: "block",
              textAlign: "center",
            }}
          >
            © Powered By M360ICT, www.m360ict.com
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default Invoice;
