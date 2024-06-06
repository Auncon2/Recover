import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { setCommonModal } from "../../../app/slice/modalSlice";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";

import dayjs from "dayjs";
import { useWatch } from "antd/es/form/Form";
import { useGetAllHotelRestaurentlistQuery } from "../../Restaurent/CreateRestaurent/api/CreateRestaurentEndPoints";
import { useGetDegisnationTypelistQuery } from "../../Settings/api/DegisnationEndPoints";
import { useGetDepartmentTypelistQuery } from "../../Settings/api/DepartmentEndPoints";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import { imageURL } from "../../../app/slice/baseQuery";
import { useUpdateEmployeeMutation } from "../api/EmployeeEndPoint";

const UpdateEmployee = ({ singleEmployee }: any) => {
  const [form] = Form.useForm();
  const [status, _setStatus] = useState<any>({ status: 1 });
  const [updateEmployeeProfile, { isLoading, isSuccess }] =
    useUpdateEmployeeMutation();

  const { data: restaurentList } = useGetAllHotelRestaurentlistQuery("");
  const { data: designation } = useGetDegisnationTypelistQuery(status);
  const { data: department } = useGetDepartmentTypelistQuery(status);

  const dispatch = useDispatch();
  const Category_Type = useWatch("category", form);

  useEffect(() => {
    if (singleEmployee?.data) {
      form.setFieldsValue({
        res_id: singleEmployee?.data?.res_id,
        name: singleEmployee?.data?.name || "N/A",
        department_id: singleEmployee?.data?.dep_id,
        designation_id: singleEmployee?.data?.des_id,
        blood_group: singleEmployee?.data?.blood_group || "N/A",
        salary: singleEmployee?.data?.salary || "N/A",
        status: singleEmployee?.data?.status || "N/A",
        mobile_no: singleEmployee?.data?.mobile_no || "N/A",

        birth_date: dayjs(singleEmployee?.data?.birth_date) || dayjs(),
        appointment_date:
          dayjs(singleEmployee?.data?.appointment_date) || dayjs(),
        joining_date: dayjs(singleEmployee?.data?.joining_date) || dayjs(),
        address: singleEmployee?.data?.address || "N/A",

        category: singleEmployee?.data?.category || "N/A",
      });
    }
  }, [form, singleEmployee?.data]);

  const onFinish = (values: any) => {
    console.log("values", values);
    const formData = new FormData();
    const {
      photo,
      res_id,
      birth_date,
      appointment_date,
      joining_date,
      ...rest
    } = values;

    if (res_id) {
      formData.append("res_id", res_id);
    }
    if (birth_date) {
      formData.append("birth_date", dayjs(birth_date).format("YYYY-MM-DD"));
    }
    if (appointment_date) {
      formData.append(
        "appointment_date",
        dayjs(appointment_date).format("YYYY-MM-DD")
      );
    }
    if (joining_date) {
      formData.append("joining_date", dayjs(joining_date).format("YYYY-MM-DD"));
    }

    if (photo) {
      if (photo[0].originFileObj) {
        formData.append("photo", photo[0].originFileObj);
      }
    }
    for (const key in rest) {
      if (rest[key]) {
        formData.append(key, rest[key]);
      }
    }
    updateEmployeeProfile({
      data: formData as any,
      id: singleEmployee?.data?.id,
    });
    console.table(Object.fromEntries(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const fileList: any[] = [
    {
      name:
        singleEmployee && singleEmployee?.data?.photo
          ? singleEmployee?.data?.photo.split("/")[1]
          : "",
      status: "done",
      url:
        singleEmployee && singleEmployee?.data?.photo
          ? imageURL + singleEmployee?.data?.photo
          : "",
    },
  ];
  const onSearch = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: "100%" }}
      >
        <Row align={"top"} gutter={[10, 5]} style={{ width: "100%" }}>
          {/* category_type */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Select Category"
              name="category"
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select department"
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  {
                    value: "restaurant",
                    label: "Restaurant",
                  },
                  {
                    value: "hotel",
                    label: "Hotel",
                  },
                  {
                    value: "management",
                    label: "Management",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          {/* category */}
          {Category_Type != "restaurant" ? (
            ""
          ) : (
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Form.Item
                label="Restaurant Name"
                name="res_id"
                style={{ width: "100%" }}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select department"
                  showSearch
                  optionFilterProp="children"
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={
                    restaurentList?.data &&
                    restaurentList?.data.map((item: any) => ({
                      label: item.name,
                      value: item.res_id,
                    }))
                  }
                  disabled={Category_Type != "restaurant"}
                />
              </Form.Item>
            </Col>
          )}

          {/* name */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Employee Name"
              name="name"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <Input
                type="text"
                placeholder="Enter Name"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* mobile_no */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Mobile No"
              name="mobile_no"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <Input
                type="number"
                placeholder="Enter Your mobile_no"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* address */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Address"
              name="address"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <Input
                type="text"
                placeholder="Enter Your Address"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* blood_group */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Blood Group"
              name="blood_group"
              labelCol={{ span: 8 }}
            >
              <Select
                placeholder="Select Blood Group"
                style={{ width: "100%" }}
              >
                <Select.Option value="a+">A+</Select.Option>
                <Select.Option value="a-">A-</Select.Option>
                <Select.Option value="b+">B+</Select.Option>
                <Select.Option value="b-">B-</Select.Option>
                <Select.Option value="ab+">AB+</Select.Option>
                <Select.Option value="ab-">AB-</Select.Option>
                <Select.Option value="o+">O+</Select.Option>
                <Select.Option value="o-">O-</Select.Option>
                {/* Add more blood types as needed */}
              </Select>
            </Form.Item>
          </Col>
          {/* birth_date */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Birth Date"
              name="birth_date"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/* appointment_date */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Appointment Date"
              name="appointment_date"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/* joining_date */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Joining Date"
              name="joining_date"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* department */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Department"
              name="department_id"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select department"
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={
                  department?.data?.map((value: any, index: any) => ({
                    value: value.id,
                    label: value.department_name,

                    key: `room_${value.department_name}_${index}`,
                  })) || []
                }
              />
            </Form.Item>
          </Col>
          {/* designation */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Designation"
              name="designation_id"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Designation"
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={
                  designation?.data?.map((value: any, index: any) => ({
                    value: value.id,
                    label: value.designation_name,

                    key: `room_${value.designation_name}_${index}`,
                  })) || []
                }
              />
            </Form.Item>
          </Col>
          {/* salary */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Salary"
              name="salary"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <Input
                type="number"
                placeholder="Enter Your salary"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* photo */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item
              label="Update Employee Profile Picture"
              name="photo"
              getValueFromEvent={normFile}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture"
                accept="image/*"
                // defaultFileList={[fileList[1]]}
                defaultFileList={fileList}
              >
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row align={"middle"} justify="start">
          <Button
            htmlType="submit"
            loading={isLoading}
            icon={<SendOutlined />}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "100%",
            }}
          >
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default UpdateEmployee;
