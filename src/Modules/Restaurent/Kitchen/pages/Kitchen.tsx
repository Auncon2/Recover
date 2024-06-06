import { useState } from "react";

import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Pagination,
  Row,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";

import { FileDoneOutlined } from "@ant-design/icons";
import {
  useCompleteKitchenMutation,
  useKitchenQuery,
} from "../api/kitchenEndPoints";
import { timeConverterWithTime } from "../../../../utilities/helper";

const Kitchen = () => {
  const [limit, setLimit] = useState<any>(10);
  const [skip, setSkip] = useState<any>(0);
  // const [search, setSearch] = useState<string | null>("");

  const [results, _setResults] = useState<any>([]);
  const { data: kitchen } = useKitchenQuery({});
  //   const { data: kitchen, isLoading } = useKitchenQuery(
  //     { limit, skip },
  //     { refetchOnMountOrArgChange: true }
  //   );
  const [update, { isLoading: upLoading }] = useCompleteKitchenMutation();

  //   useEffect(() => {
  //     if (!isLoading) {
  //       const filteredOrders = kitchen.data.filter((element: any) =>
  //         element.invoice_no.startsWith(search)
  //       );
  //       setResults(filteredOrders);
  //     }
  //   }, [isLoading, kitchen, search]);

  const columns: TableProps<any>["columns"] = [
    {
      title: "SL",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Item Name",
      render: ({ food_item_name }) => <span>{food_item_name}</span>,
    },
    {
      title: "Quantity",
      render: ({ item_quantity }) => <span>{item_quantity}</span>,
    },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row gutter={[10, 10]}>
          {results.map(
            (
              {
                invoice_no,
                createdfoods,
                first_name,
                invoice_created_at,
                invoice_customer_type,
                invoice_id,
                invoice_kitchen_status,
                table_name,
              }: any,
              index: number
            ) => (
              <Col span={8} key={index}>
                <Card
                  type="inner"
                  title={`ORDER NO #${invoice_no}`}
                  extra={timeConverterWithTime(invoice_created_at)}
                  style={{ height: "100%", border: "1px solid #cccccc" }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Descriptions
                      bordered
                      size="small"
                      layout="horizontal"
                      column={2}
                      items={[
                        {
                          key: "1",
                          label: "Table name",
                          children: table_name || "N/A",
                        },
                        {
                          key: "2",
                          label: "Staff name",
                          children: first_name || "N/A",
                        },
                        {
                          key: "3",
                          label: "Customer Type",
                          children: invoice_customer_type || "N/A",
                        },
                        {
                          key: "4",
                          label: "Kitchen Status",
                          children: (
                            <Typography.Text type="danger">
                              {invoice_kitchen_status || "N/A"}
                            </Typography.Text>
                          ),
                        },
                      ]}
                    />
                    <Divider />
                    <Table
                      bordered
                      pagination={false}
                      size="small"
                      dataSource={createdfoods}
                      columns={columns}
                      scroll={{ y: 200 }}
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        update({ id: invoice_id, status: "COMPLETED" })
                      }
                      icon={<FileDoneOutlined />}
                      loading={upLoading}
                    >
                      Finished
                    </Button>
                  </Space>
                </Card>
              </Col>
            )
          )}
        </Row>
        <Pagination
          defaultCurrent={1}
          total={kitchen?.total}
          current={Math.floor(skip / limit) + 1}
          pageSize={limit}
          onChange={(page, pageSize) => {
            setLimit(pageSize);
            setSkip((page - 1) * pageSize);
          }}
        />
      </Space>
    </div>
  );
};

export default Kitchen;
