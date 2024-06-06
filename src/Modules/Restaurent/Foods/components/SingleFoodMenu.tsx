import {
  Card,
  Col,
  Divider,
  Drawer,
  Row,
  Space,
  Table,
  TableProps,
} from "antd";
import { useGetFoodslistQuery } from "../api/FoodsEndPoints";

interface Props {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

const SingleFoodMenu: React.FC<Props> = ({ id, open, setOpen, setId }: any) => {
  0;
  const { data: single, isLoading } = useGetFoodslistQuery(id);
  const {
    // food_item_name,
    // food_category_name,
    // food_item_retail_price,
    // food_item_production_price,
    // createdfoods,
  } = single?.data || {};

  const columns: TableProps<any>["columns"] = [
    {
      title: "SL",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Ingredient Name",
      render: (_, _record) => <span>{_record.ingredient_name}</span>,
    },
    {
      title: "Ingredient Quantity",
      render: (_, _record) => (
        <span>
          {_record.created_food_ingredients_quantity} (
          {_record.ingredient_measure_status})
        </span>
      ),
    },
  ];

  return (
    <>
      <Drawer
        onClose={() => {
          setOpen(false);
          setId(0);
        }}
        open={open}
        size="large"
        // title={`${food_item_name} Menu Information.`}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Card>
            <Row gutter={10}>
              <Col span={12}>
                <p>
                  <strong>Menu Name : </strong>
                  {/* {food_item_name} */}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Catagory Name : </strong>
                  {/* {food_category_name} */}
                </p>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <p>
                  <strong>Retail Price : </strong>
                  {/* {food_item_retail_price} */}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Production Price : </strong>
                  {/* {food_item_production_price} */}
                </p>
              </Col>
            </Row>
          </Card>
          <Divider />
          <Table
            bordered
            size="middle"
            // dataSource={createdfoods}
            columns={columns}
            loading={isLoading}
          />
        </Space>
      </Drawer>
    </>
  );
};

export default SingleFoodMenu;
