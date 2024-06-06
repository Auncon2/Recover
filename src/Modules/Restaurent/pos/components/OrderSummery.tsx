import {
  DECREASE,
  DELIVERY,
  DINEIN,
  INCREASE,
  INPUT,
  PERCANTAGE,
  TAKEOUT,
} from "../utils/pos-constant";
import AddStaff from "./AddStaff";
import { useSelector } from "react-redux";

import {
  Button,
  Card,
  Col,
  InputNumber,
  Popover,
  Row,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { ICarts } from "../types/pointOfSalesTypes";
const { Text } = Typography;
import {
  CheckOutlined,
  ShoppingCartOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useGetEmployeeQuery } from "../../../Employee/api/EmployeeEndPoint";
import { formatter } from "../../../../utilities/helper";

interface Props {
  isLoading: boolean;
  isFetching: boolean;
  carts: ICarts[];
  createdfoods: any;
  handleConfirmOrder: any;
  handleEditAddToCarts: any;
  handleRemoveFromCart: any;
  handlePaymentNow: any;
}

const OrderSummery: React.FC<Props> = ({
  isFetching,
  isLoading,
  carts,
  createdfoods,
  handleConfirmOrder,
  handleEditAddToCarts,
  handleRemoveFromCart,
  // handlePaymentNow,
}) => {
  const {
    subTotal,
    vatAmount,
    discount,
    discountAmount,
    netTotal,
    discountType,
    orderType,
    // staff,
  } = useSelector((state: any) => state.pos);

  const { data: employee } = useGetEmployeeQuery({});
  console.log(employee);

  // const findEmployee = employee?.data?.find(
  //   (element: any) => element.employee_id === staff
  // );

  const columns: TableProps<ICarts>["columns"] = [
    {
      title: "SL",
      render: (_, _record, index) => <>{index + 1}</>,
    },
    {
      title: "Name",
      render: (_record) => (
        <Popover
          trigger="hover"
          content={
            <Button
              onClick={() => handleRemoveFromCart(_record.item_food_id)}
              size="small"
              type="primary"
              icon={<CheckOutlined />}
            >
              Yes
            </Button>
          }
          title={
            <Typography.Text type="secondary">
              Do you want to remove{" "}
              <Typography.Text strong type="danger" underline>
                {_record.food_item_name}
              </Typography.Text>{" "}
              from this list?
            </Typography.Text>
          }
        >
          {_record.food_item_name}
        </Popover>
      ),
    },

    {
      title: "Quantity",
      render: (_record) => (
        <Space size="small">
          <Button
            onClick={() => handleEditAddToCarts(DECREASE, _record.item_food_id)}
            size="small"
            type="primary"
            danger
          >
            -
          </Button>
          <InputNumber
            value={_record.item_quantity}
            formatter={(value) => formatter(value)}
            onChange={(value) =>
              handleEditAddToCarts(INPUT, _record.item_food_id, value)
            }
            placeholder="qty"
          />
          <Button
            onClick={() => handleEditAddToCarts(INCREASE, _record.item_food_id)}
            size="small"
            style={{
              backgroundColor: "#149D4F",
              color: "white",
            }}
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: "Rate",
      render: (_record) => formatter(_record.item_price),
    },
    {
      title: "Total",
      render: (_record) => formatter(_record.item_total),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: "100%" }} className="scrollbar">
      <Card size="small" style={{ backgroundColor: "#0079FF" }}>
        <Row>
          <Col span={16}>
            <Text
              strong
              style={{
                display: "block",
                color: "white",
                fontSize: "1.3rem",
              }}
            >
              ORDER SUMMERY
            </Text>

            <Text
              style={{
                display: "block",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              ORDER TYPE :{" "}
              {(orderType === DINEIN && "Dine In") ||
                (orderType === TAKEOUT && "Take Out") ||
                (orderType === DELIVERY && "Delivary")}
            </Text>
            <Text style={{ display: "block", color: "white" }}>
              SERVED BY :{" "}
              {/* {findEmployee?.first_name?.concat(
                  ` ${findEmployee?.last_name}`
                ) || "N/A"} */}
            </Text>
          </Col>
          <Col span={8}>
            <AddStaff />
          </Col>
        </Row>
      </Card>

      <Table
        pagination={false}
        bordered
        size="small"
        dataSource={carts}
        columns={columns}
        loading={isFetching}
        summary={() => {
          if (carts.length > 0) {
            return (
              <>
                <Table.Summary.Row style={{ backgroundColor: "#FAFAFA" }}>
                  <Table.Summary.Cell index={2} colSpan={4}>
                    <Typography.Text
                      style={{ textAlign: "right", display: "block" }}
                    >
                      Sub Total
                    </Typography.Text>
                  </Table.Summary.Cell>

                  <Table.Summary.Cell index={2}>
                    <Row justify={"start"}>
                      <Typography.Text>{formatter(subTotal)}</Typography.Text>
                    </Row>
                  </Table.Summary.Cell>
                </Table.Summary.Row>

                <Table.Summary.Row style={{ backgroundColor: "#FAFAFA" }}>
                  <Table.Summary.Cell index={2} colSpan={4}>
                    <Typography.Text
                      style={{ textAlign: "right", display: "block" }}
                    >
                      VAT 5% of {formatter(subTotal)}
                    </Typography.Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Row justify={"start"}>
                      <Typography.Text>
                        {formatter(vatAmount?.toFixed(2))}
                      </Typography.Text>
                    </Row>
                  </Table.Summary.Cell>
                </Table.Summary.Row>

                {discountType && (
                  <Table.Summary.Row style={{ backgroundColor: "#FAFAFA" }}>
                    <Table.Summary.Cell index={2} colSpan={4}>
                      <Typography.Text
                        style={{ textAlign: "right", display: "block" }}
                      >
                        {discountType === PERCANTAGE
                          ? `Discount (${discountAmount}%)`
                          : "Fixed Discount"}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Row justify={"start"}>
                        <Typography.Text>{formatter(discount)}</Typography.Text>
                      </Row>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}

                <Table.Summary.Row style={{ backgroundColor: "#FAFAFA" }}>
                  <Table.Summary.Cell index={2} colSpan={4}>
                    <Typography.Text
                      strong
                      style={{ textAlign: "right", display: "block" }}
                    >
                      Net Total
                    </Typography.Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Row justify={"start"}>
                      <Typography.Text strong>
                        {formatter(netTotal)}
                      </Typography.Text>
                    </Row>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          } else {
            return null;
          }
        }}
      />

      {carts.length > 0 && (
        <Button
          onClick={handleConfirmOrder}
          style={{
            backgroundColor: "#0079FF",
            color: "white",
          }}
          icon={createdfoods ? <EditOutlined /> : <ShoppingCartOutlined />}
          block
          loading={isLoading}
        >
          {createdfoods ? "Update" : "Order Now"}
        </Button>
      )}

      {createdfoods &&
        //   <PaymentSection
        //     handlePaymentNow={handlePaymentNow}
        //     isLoading={isLoading}
        //   />
        "aa"}
    </Space>
  );
};

export default OrderSummery;
