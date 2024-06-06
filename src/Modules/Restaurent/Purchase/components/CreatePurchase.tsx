import { useEffect, useMemo, useState } from "react";
// import { useGetSupplierQuery } from "../../Supplier/api/supplierEndpoint";
// import { useAccountQuery } from "../../Account/api/accountEndpoint";
// import { useGetProfileQuery } from "../../Profile/api/profileEndpoint";
// import { useAddPurchaseMutation } from "../api/purchaseEndpoint";
import moment from "moment";
// import { useGetIngredientsQuery } from "../../Ingredient/api/ingredientEndpoint";
import {
  Modal,
  Button,
  Form,
  type FormProps,
  Row,
  Col,
  DatePicker,
  Select,
  Radio,
  Table,
  Space,
  TableProps,
  InputNumber,
  Typography,
  Card,
} from "antd";
const { Text } = Typography;

// import { IPurchase, IPurchaseIngredient } from "../types/purchaseTypes";
// import { ISupplier } from "../../Supplier/types/supplierTypes";
// import { IAccount } from "../../Account/types/accountTypes";
// import { IIngredients } from "../../Ingredient/types/ingredientsTypes";
import { useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
import { formatter } from "../../../../app/utils/Helper";

import { useCreatePurchaseMutation } from "../api/PurchaseEndPoint";
import { useGetSupplierlistQuery } from "../../Supplier/api/SupplierEndPoints";
import { useGetIngredientslistQuery } from "../../Ingredients/api/IngredientsEndPoints";
import { useGetMeQuery } from "../../../../app/api/userApi/userApi";
import { useGetAccountListQuery } from "../../../Account/api/AccountEndPoint";

const CreatePurchase = ({ open, setOpen }: any) => {
  const { data: user } = useGetMeQuery();
  const UserId = user?.data?.id;
  const [filter, setFilter] = useState<any>({ admin_id: Number(UserId) });

  //   const { data: profile } = useGetProfileQuery({});
  //   const { data: supplier } = useGetSupplierQuery({});

  //   const { data: ingredient } = useGetIngredientsQuery({});
  //   const { data: profile } = useGetProfileQuery({});

  const { data: supplier } = useGetSupplierlistQuery({});

  const { data: ingredient } = useGetIngredientslistQuery({});
  const { data: account } = useGetAccountListQuery({ ...filter });
  const [create, { isSuccess, isLoading }] = useCreatePurchaseMutation({});

  const [form] = Form.useForm();
  // const paymentType = useWatch("payment_type", form);
  const discountType = useWatch("discount_type", form);
  const inputDiscount = useWatch("purchase_discount", form);
  const [multiIngredient, setMultiIngredient] = useState<any>([]);

  //   const columns: TableProps<IPurchaseIngredient>["columns"] = [
  const columns: TableProps<any>["columns"] = [
    {
      title: "SL",
      dataIndex: "ingredient_id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Ingredient Name",
      dataIndex: "ingredient_name",
    },
    {
      title: "Measurement",
      dataIndex: "measurement",
      render: (_, record) => record.measurement || "N/A",
    },
    {
      title: "Quantity",
      dataIndex: "purchase_ingredient_quantity",
      render: (_, record) => (
        <InputNumber
          style={{ minWidth: "100%" }}
          placeholder="Quantity"
          onChange={(value: any) =>
            handleInputChange(value, record, "quantity")
          }
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "purchase_ingredient_price",
      render: (_, record) => (
        <InputNumber
          style={{ minWidth: "100%" }}
          placeholder="Price"
          onChange={(value: any) => handleInputChange(value, record, "price")}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      ),
    },
    {
      title: "Total",
      render: ({ purchase_ingredient_total_price }) =>
        formatter(purchase_ingredient_total_price),
    },
  ];

  const handleInputChange = (
    value: number,
    // record: IPurchaseIngredient,
    record: any,
    field: string
  ) => {
    const updatedIngredients = multiIngredient.map(
      //   (item: IPurchaseIngredient) => {
      (item: any) => {
        if (item.ingredient_id === record.ingredient_id) {
          const updatedItem = {
            ...item,
            [`purchase_ingredient_${field}`]: value,
          };
          updatedItem.purchase_ingredient_total_price =
            updatedItem.purchase_ingredient_quantity *
            updatedItem.purchase_ingredient_price;
          return updatedItem;
        }
        return item;
      }
    );

    setMultiIngredient(updatedIngredients);
  };

  // useEffect(() => {
  //   // Calculate subTotal
  //   const calculatedSubTotal = multiIngredient.reduce(
  //     (acc: any, curr: any) => acc + curr.purchase_ingredient_total_price,
  //     0
  //   );
  //   setSubTotal(calculatedSubTotal);

  //   // Calculate totalQTY
  //   const calculatedTotalQTY = multiIngredient.reduce(
  //     (acc: any, curr: any) => acc + curr.purchase_ingredient_quantity,
  //     0
  //   );
  //   setTotalQTY(calculatedTotalQTY);
  // }, [multiIngredient]);

  const subTotal = useMemo(() => {
    return multiIngredient.reduce(
      //   (acc: number, curr: IPurchaseIngredient) =>
      (acc: number, curr: any) => acc + curr.purchase_ingredient_total_price,
      0
    );
  }, [multiIngredient]);

  const totalQTY = useMemo(() => {
    return multiIngredient.reduce(
      //   (acc: number, curr: IPurchaseIngredient) =>
      (acc: number, curr: any) => acc + curr.purchase_ingredient_quantity,
      0
    );
  }, [multiIngredient]);

  const discount = useMemo(
    () =>
      discountType === "percentage"
        ? inputDiscount / 100 || 0
        : inputDiscount || 0,
    [discountType, inputDiscount]
  );

  const netTotal = subTotal - discount;

  //   const onFinish: FormProps<IPurchase>["onFinish"] = (values) => {
  const onFinish: FormProps<any>["onFinish"] = (values) => {
    create({
      //   purchase_warehouse_id: profile?.data?.warehouse_id,
      purchase_number: Math.round(Math.random() * 99999),
      purchase_po_reference: "",
      purchase_payment_terms: "",
      purchase_date: values.purchase_date,
      purchase_note: "",
      purchase_quantity: totalQTY,
      purchase_subtotal: subTotal,
      purchase_discount: inputDiscount,
      purchase_net_total: netTotal,
      purchase_account: values.purchase_account,
      purchase_status: "pending",
      purchase_supplier: values.purchase_supplier,
      //   purchase_created_by: profile?.data?.id,
      purchase_ingredients: multiIngredient,
    });
  };
  useEffect(() => {
    if (account?.data?.length) {
      const accountId = Number(account?.data[0]?.id);
      form.setFieldValue("purchase_account", accountId);
    } else if (account?.data?.length === 0) {
      form.resetFields(["purchase_account"]);
    }
  }, [form, account?.data]);
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setMultiIngredient([]);
    }
  }, [isSuccess, setOpen]);
  return (
    <Modal
      title="Create Purchase"
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          payment_type: "cash",
          purchase_date: dayjs(moment().format("YYYY-MM-DD")),
        }}
      >
        <Row gutter={10}>
          <Col span={12}>
            {/* <Form.Item<IPurchase> */}
            <Form.Item<any>
              label="Purchase Date"
              name="purchase_date"
              rules={[
                { required: true, message: "Purchase date is required!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* <Form.Item<IPurchase> */}
            <Form.Item<any>
              label="Choose Supplier"
              name="purchase_supplier"
              rules={[{ required: true, message: "Supplier is required!" }]}
            >
              <Select
                showSearch
                allowClear
                placeholder="Choose Supplier"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  ((option?.label ?? "") as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={supplier?.data?.map(
                  //   ({ supplier_id, supplier_name }: ISupplier) => {
                  ({ id, name }: any) => {
                    return {
                      value: id,
                      label: name,
                    };
                  }
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label="Payment Type"
              name="payment_type"
              rules={[{ required: true, message: "Payment type is required!" }]}
            >
              <Radio.Group
                onChange={(value) => {
                  console.log("value", value?.target?.value);
                  setFilter({
                    ...filter,
                    ac_type: value?.target?.value,
                  });
                }}
              >
                <Radio value="bank">Bank</Radio>
                <Radio value="cash">Cash</Radio>
                <Radio value="cheque">Cheque</Radio>
                <Radio value="mobile-banking">Mobile Banking</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* <Form.Item<IPurchase> */}
            <Form.Item<any>
              label="Choose Account"
              name="purchase_account"
              rules={[{ required: true, message: "Account is required!" }]}
            >
              <Select
                showSearch
                allowClear
                placeholder="Choose Account"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  ((option?.label ?? "") as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                // options={(account?.data || [])
                //   .filter(
                //     ({ account_type }: any) => account_type === paymentType
                //   )
                //   //   .map(({ account_id, account_name }: IAccount) => ({
                //   .map(({ account_id, account_name }: any) => ({
                //     value: account_id,
                //     label: account_name,
                //   }))}
                options={account?.data?.map(({ id, name }: any) => ({
                  value: id,
                  label: name,
                }))}
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
              const selectedIngredients = ingredient?.data?.filter(
                ({ id }: any) => value.includes(id)
              );

              const newData = selectedIngredients?.filter(
                (selectedItem: any) => {
                  return !multiIngredient.some(
                    (existingItem: any) =>
                      existingItem.ingredient_id === selectedItem.id
                  );
                }
              );

              if (newData) {
                const data = newData.map((item: any) => ({
                  ingredient_id: item.id,
                  ingredient_name: item.name,
                  purchase_ingredient_quantity: 0,
                  purchase_ingredient_price: 0,
                  purchase_ingredient_total_price: 0,
                  measurement: item.measurement,
                }));

                const updatedData = [...multiIngredient, ...data];
                setMultiIngredient(updatedData);
              }
            }}
            onDeselect={(deselectedValue) => {
              const updatedData = multiIngredient.filter(
                (item: any) => item.ingredient_id !== deselectedValue
              );
              setMultiIngredient(updatedData);
            }}
            filterOption={(input, option) =>
              ((option?.label ?? "") as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={ingredient?.data?.map(
              //   ({ ingredient_id, ingredient_name }: IIngredients) => {
              ({ id, name }: any) => {
                return {
                  value: id,
                  label: name,
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
                      Sub Total :
                    </Typography>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <Row justify={"start"}>
                      <Typography.Text strong>
                        {formatter(subTotal)}
                      </Typography.Text>
                    </Row>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />

          <Card>
            <Form.Item
              label={<Text strong>Please choose any discount type :</Text>}
              name="discount_type"
            >
              <Radio.Group>
                <Radio value="percentage">Percentage (%)</Radio>
                <Radio value="fixed_discount">Fixed Discount</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={<Text strong>Enter discount amount</Text>}
              name="purchase_discount"
            >
              <InputNumber
                placeholder="Discount"
                style={{ minWidth: "25%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
            <Text strong style={{ textTransform: "uppercase" }}>
              Net total : {formatter(Number(netTotal.toFixed(2)))}
            </Text>
          </Card>
        </Space>

        {multiIngredient.length > 0 && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CreatePurchase;
