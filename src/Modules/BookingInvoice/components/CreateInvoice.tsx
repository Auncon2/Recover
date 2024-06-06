import {
  AppstoreOutlined,
  HomeOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import { useForm } from "antd/es/form/Form";
import { MdDeleteForever } from "react-icons/md";
import { useCreateInvoiceMutation } from "../api/BookingInvoiceEndPoints";
import { useEffect, useState } from "react";
import { useGetCustomerListQuery } from "../../Customer/api/CustomerEndPoints";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   selectcommonObjectState,
//   updatecommonObjectState,
// } from "../../../app/slice/statusSlice";

const CreateInvoice = () => {
  const [filterValue, setFilterValue] = useState<any>({});
  // const [dummy, _setDummy] = useState<any>({});
  const navigate = useNavigate();
  const [guestList, setGuestList] = useState<any>([]);
  const [createInvoiceData, { isSuccess, isLoading }] =
    useCreateInvoiceMutation();
  const { data: guestlist } = useGetCustomerListQuery(filterValue);
  const [form] = useForm();
  const onFinish = (values: any) => {
    // console.log("Success:", values);
    const CreateInvoice = {
      user_id: values.user_id,
      discount_amount: values.discount_amount ? values.discount_amount : 0,
      tax_amount: values.tax_amount ? values.tax_amount : 0,

      invoice_item: values?.invoice_item?.map((item: any) => ({
        name: item.name,
        total_price: Number(item.price),
        quantity: Number(
          item.quantity || item.quantity >= 1 ? item.quantity : 1
        ),
      })),
    };
    console.log("CreateInvoice:", CreateInvoice);
    createInvoiceData(CreateInvoice);
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/invoice/booking-invoice`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (guestlist) {
      const GuestList =
        guestlist?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: `${value?.name} (${
            value?.email ? value?.email : `Phone No : ${value?.phone}`
          }) , (Last Balance : ${value?.last_balance})`,

          key: `room_${value.name}_${index}`,
        })) || [];
      setGuestList(GuestList);
    }
  }, [guestlist]);

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  // const dispatch = useDispatch();
  //

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const dataFromApi = {
  //       id: 1,
  //       name: "John Doe",
  //       email: "john@example.com",
  //     };

  //     dispatch(updatecommonObjectState(dataFromApi));
  //   };

  //   fetchData();
  // }, [dispatch]);
  return (
    <>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: "40px" }}
        items={[
          {
            href: "/",
            title: (
              <>
                <HomeOutlined className=" me-1" />
                <span>Dashboard</span>
              </>
            ),
          },
          {
            href: "",
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>Invoice</span>
              </>
            ),
          },

          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  Create Invoice
                </span>
              </div>
            ),
          },
        ]}
      />
      {/* {commonObjectState && (
        <div>
          <p>User ID: {commonObjectState?.id}</p>
          <p>User Name: {commonObjectState?.name}</p>
          <p>User Email: {commonObjectState?.email}</p>
        </div>
      )} */}

      <Form
        name="property_status"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <span
            className="text-lg font-bold text-[#01adad] "
            style={{ textTransform: "uppercase" }}
          >
            Create Invoice
          </span>
          <Link to={`/invoice/booking-invoice`}>
            <Button
              icon={<FaArrowLeftLong />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "210px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Return to Invoice List
            </Button>
          </Link>
        </div>
        <Card
          // title="Create Invoice"
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Select Guest Type"
                style={{ width: "100%", borderRadius: "50px" }}
              >
                <Select
                  placeholder="Search by status"
                  style={{ width: "100%" }}
                  onChange={(value) =>
                    setFilterValue({
                      // ...filterValue,
                      user_type: value ? value : "",
                    })
                  }
                  defaultValue="All"
                  options={[
                    {
                      value: "",
                      label: "All",
                    },
                    {
                      value: "room-guest",
                      label: "Room Guest",
                    },
                    {
                      value: "hall-guest",
                      label: "Hall Guest",
                    },

                    {
                      value: "user",
                      label: "Website User",
                    },
                    // {
                    //   value: "guest",
                    //   label: "guest",
                    // },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Guest Name"
                name="user_id"
                style={{ width: "100%", borderRadius: "50px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select Guest Name"
                  showSearch
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={guestList}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Discount Amount"
                name="discount_amount"
                style={{ width: "100%" }}
              >
                <InputNumber
                  placeholder="Enter discount amount"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Tax Amount"
                name="tax_amount"
                style={{ width: "100%" }}
              >
                <InputNumber
                  placeholder="Enter tax amount"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Form.List name="invoice_item" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index: number) => (
                <Badge.Ribbon
                  key={key}
                  text={`Item ${name + 1}`}
                  placement="start"
                >
                  <Card
                    // key={key}
                    size="small"
                    // title={`Room ${field.name + 1}`}
                    extra={
                      <div className="hover:cursor-pointer">
                        {index > 0 && (
                          <MdDeleteForever
                            onClick={() => {
                              remove(name);
                              // handleFilterChange(
                              //   {},
                              //   form.getFieldsValue(),
                              //   name
                              // );
                              // handleFilterChange(
                              //   form.getFieldsValue()
                              // );
                              // handleFilterChange({}, form.getFieldsValue());
                            }}
                            size="25"
                            color="#ff6666"
                          />
                        )}
                      </div>
                    }
                    style={{
                      marginTop: "30px",
                      borderWidth: "6px ",
                    }}
                    className="w-full 2xl:w-[1200px]"
                  >
                    <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <Form.Item
                          label={<span className="font-semibold">Item</span>}
                          {...restField}
                          name={[name, "name"]}
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Enter item's name",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            placeholder="Enter item's name"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <Form.Item
                          label={
                            <span className="font-semibold">Item's price</span>
                          }
                          {...restField}
                          name={[name, "price"]}
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Enter the price of the item!",
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="Enter price of the item"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                        <Form.Item
                          label={
                            <span className="font-semibold">
                              Item's quantity
                            </span>
                          }
                          {...restField}
                          name={[name, "quantity"]}
                          style={{ width: "100%" }}
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Enter how many item!",
                          //   },
                          // ]}
                        >
                          <InputNumber
                            min={1}
                            defaultValue={1}
                            placeholder="Enter total number of items"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Badge.Ribbon>
              ))}
              <Row align={"middle"} justify={"start"}>
                <Col xs={24} sm={12} md={12} lg={7}>
                  <Form.Item className="mt-5">
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{
                        color: "#04b0ce",
                        fontWeight: "600",
                      }}
                    >
                      Add Item
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form.List>

        <Form.Item wrapperCol={{ offset: 0, span: 18 }}>
          <Button
            icon={<SendOutlined />}
            style={{
              marginTop: "5px",
              background: "#01adad",
              borderRadius: "50px",
              width: "130px",
              color: "white",
            }}
            htmlType="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateInvoice;
