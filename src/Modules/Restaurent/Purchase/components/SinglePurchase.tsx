import {
  Card,
  Col,
  Divider,
  Drawer,
  Row,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import React from "react";
import { useGetPurchaseSingleDetailsQuery } from "../api/PurchaseEndPoint";
import { formatter, timeConverter } from "../../../../app/utils/Helper";
// import { useGetSinglePurchaseQuery } from "../api/purchaseEndpoint";
// import { formatter, timeConverter } from "../../../utilities/helper";
// import { IPurchaseIngredient } from "../types/purchaseTypes";

interface Props {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

const SinglePurchase: React.FC<Props> = ({ id, open, setOpen, setId }) => {
  const { data, isLoading } = useGetPurchaseSingleDetailsQuery(id);

  const {
    purchase_date,
    purchase_net_total,
    purchase_quantity,
    purchase_status,
    purchase_subtotal,
    supplier_name,
    purchaseingredients,
  } = data?.data || {};

  const columns: TableProps<any>["columns"] = [
    {
      title: "SL",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Ingredient Name",
      dataIndex: "ingredient_name",
    },
    {
      title: "Category",
      dataIndex: "food_category_name",
    },
    {
      title: "Quantity",
      render: (_, _record) => (
        <span>
          {formatter(_record.purchase_ingredient_quantity)} (
          {_record.purchase_ingredient_measurement})
        </span>
      ),
    },
    {
      title: "Price",
      render: ({ purchase_ingredient_price }) =>
        formatter(purchase_ingredient_price),
    },
  ];

  return (
    <Drawer
      onClose={() => {
        setOpen(false);
        setId(0);
      }}
      open={open}
      size="large"
      title={` Purchase Information.`}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Card>
          <Row gutter={10}>
            <Col span={12}>
              <p>
                <strong>Purchase Date : </strong>
                {timeConverter(purchase_date)}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <strong>Supplier Name : </strong>
                {supplier_name}
              </p>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              <p>
                <strong>Purchase Quantity : </strong>
                {formatter(purchase_quantity)}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <strong>Sub-Total : </strong>
                {formatter(purchase_subtotal)}
              </p>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              <p>
                <strong>Net-Total : </strong>
                {formatter(purchase_net_total)}
              </p>
            </Col>
            <Col span={12}>
              <p>
                <strong>Status : </strong>
                <Tag color="red">{purchase_status}</Tag>
              </p>
            </Col>
          </Row>
        </Card>
        <Divider />
        <Table
          bordered
          size="middle"
          dataSource={purchaseingredients}
          columns={columns}
          loading={isLoading}
        />
      </Space>
    </Drawer>
  );
};

export default SinglePurchase;
