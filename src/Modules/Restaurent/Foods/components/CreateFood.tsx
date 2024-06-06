/* eslint-disable @typescript-eslint/no-explicit-any */
/*
@file CreateExpenseHead.tsx
@Author Istiak Ahmed<istiak.m360ict@gmail.com>
*/
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useMemo, useState } from "react";

import { useCreateFoodsMutation } from "../api/FoodsEndPoints";
import { useGetCategorylistQuery } from "../../Category/api/CategoryEndPoints";
import { TableProps } from "antd/lib";
import { useGetIngredientslistQuery } from "../../Ingredients/api/IngredientsEndPoints";
import { formatter, generateRandomNumber } from "../../../../utilities/helper";

const CreateFoods = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();

  const { data: category } = useGetCategorylistQuery({});
  const { data: purchaseIngredients } = useGetIngredientslistQuery({});
  console.log("ccc", purchaseIngredients);
  const [create, { isSuccess, isLoading }] = useCreateFoodsMutation();
  const [multiIngredient, setMultiIngredient] = useState<any[]>([]);

  const handleInputChange = (value: number, record: any, field: string) => {
    const updatedIngredients = multiIngredient.map((item: any) => {
      if (item.created_food_ingre_id === record.created_food_ingre_id) {
        const updatedItem = {
          ...item,
          [field]: value,
        };
        updatedItem.expense = parseFloat(
          (
            (updatedItem.created_food_ingredients_price /
              updatedItem.purchased_quantity) *
            updatedItem.created_food_ingredients_quantity
          ).toFixed(2)
        );
        return updatedItem;
      }
      return item;
    });
    setMultiIngredient(updatedIngredients);
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "SL",
      dataIndex: "created_food_ingre_id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "max_ingredient_name",
    },
    // max_ingredient_measure_status
    {
      title: "Purchase Qty.",
      render: ({ purchased_quantity }) => (
        <>
          {purchased_quantity}
          {/* {formatter(purchased_quantity)} ({max_ingredient_measure_status}) */}
        </>
      ),
    },
    {
      title: "Price",
      render: ({ created_food_ingredients_price }) =>
        formatter(created_food_ingredients_price),
    },
    {
      title: "Quantity",
      dataIndex: "purchase_ingredient_quantity",
      render: (_, record) => (
        <InputNumber
          style={{ minWidth: "100%" }}
          placeholder="Quantity"
          onChange={(value: any) =>
            handleInputChange(
              value,
              record,
              "created_food_ingredients_quantity"
            )
          }
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      ),
    },
    {
      title: "Expense",
      render: ({ expense }) => formatter(expense),
    },
  ];

  const totalExpense = useMemo(() => {
    return multiIngredient.reduce(
      (acc: number, curr: any) => acc + curr.expense,
      0
    );
  }, [multiIngredient]);

  const onFinish: FormProps<any>["onFinish"] = (values) => {
    // createFoods(values);
    create({
      ...values,
      food_item_entry_id: generateRandomNumber(values.food_item_name),
      food_item_production_price: totalExpense,
      item_ingredients: multiIngredient,
      food_item_status: "active",
    });
  };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       setOpen(false);
  //     }
  //   }, [isSuccess, setOpen]);

  // const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      // navigate(`/expense/expense-head-list`);
      cardhandleCancel();
    }
  }, [form, isSuccess]);
  //   const onFinish = (values: any) => {
  //     createFoods(values);
  //   };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item<any>
              label="Menu Name"
              name="food_item_name"
              rules={[{ required: true, message: "Menu name is required!" }]}
            >
              <Input placeholder="Menu name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<any>
              label="Choose Category"
              name="food_item_category"
              rules={[{ required: true, message: "Category is required!" }]}
            >
              <Select
                showSearch
                allowClear
                placeholder="Choose Category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  ((option?.label ?? "") as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={category?.data?.map(({ name, id }: any) => {
                  return {
                    value: id,
                    label: name,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Search ingredient"
            onChange={(value) => {
              const data = purchaseIngredients?.data
                ?.filter(({ purchased_ingredient_id }: any) =>
                  value.includes(purchased_ingredient_id)
                )
                ?.map(
                  ({
                    purchased_ingredient_id,
                    max_ingredient_name,
                    purchased_quantity,
                    unit_price,
                    max_ingredient_measure_status,
                  }: any) => ({
                    created_food_ingre_id: purchased_ingredient_id,
                    max_ingredient_name,
                    purchased_quantity: Number(purchased_quantity),
                    max_ingredient_measure_status,
                    created_food_ingredients_price: Number(unit_price),
                    created_food_created_by: 1,
                    expense: 0,
                  })
                );
              setMultiIngredient(data as any);
            }}
            filterOption={(input, option) =>
              ((option?.label ?? "") as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={purchaseIngredients?.data?.map(
              ({ purchased_ingredient_id, max_ingredient_name }: any) => {
                return {
                  value: purchased_ingredient_id,
                  label: max_ingredient_name,
                };
              }
            )}
          />
          <Table
            bordered
            size="small"
            dataSource={multiIngredient}
            columns={columns}
            pagination={false}
            summary={() => {
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={2} colSpan={5}>
                    <Typography style={{ textAlign: "right" }}>
                      Production Price :
                    </Typography>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <Row justify={"start"}>
                      <Typography.Text strong>
                        {formatter(totalExpense)}
                      </Typography.Text>
                    </Row>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
          <Form.Item<any>
            label="Enter Retail Price"
            name="food_item_retail_price"
            rules={[{ required: true, message: "Retail price is required!" }]}
          >
            <InputNumber
              placeholder="Price"
              style={{ minWidth: "25%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
        </Space>

        {multiIngredient.length > 0 && (
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
      {/* </Card> */}
    </>
  );
};

export default CreateFoods;
