import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  UploadFile,
} from "antd";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { useEffect, useState } from "react";
import { useCreateEmployeeMutation } from "../api/EmployeeEndPoint";
import { DatePickerProps } from "antd/lib";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { useGetDegisnationTypelistQuery } from "../../Settings/api/DegisnationEndPoints";
import { useGetDepartmentTypelistQuery } from "../../Settings/api/DepartmentEndPoints";
import dayjs from "dayjs";
import { useWatch } from "antd/es/form/Form";
import { useGetAllHotelRestaurentlistQuery } from "../../Restaurent/CreateRestaurent/api/CreateRestaurentEndPoints";
// import { useNavigate } from "react-router-dom";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreateEmployee = ({ cardhandleCancel }: any) => {
  const [form] = Form.useForm();
  const [departmentTypeList, setDepartmentTypeList] = useState<any>([]);
  const [degisnationTypeList, setDegisnationTypeList] = useState<any>([]);
  const [status, _setStatus] = useState<any>({ status: 1 });
  const { data: designation } = useGetDegisnationTypelistQuery(status);
  const { data: department } = useGetDepartmentTypelistQuery(status);
  const [fileList, setFileList] = useState<any>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const Category_Type = useWatch("category", form);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const onChange: DatePickerProps["onChange"] = (
    date: any,
    dateString: any
  ) => {
    console.log(date, dateString);
  };
  const { data: restaurentList } = useGetAllHotelRestaurentlistQuery("");

  const [createEmployee, { isLoading, isSuccess }] =
    useCreateEmployeeMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      cardhandleCancel();
    }
  }, [form, isSuccess]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    const { res_id, birth_date, appointment_date, joining_date, ...rest } =
      values;

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
    if (fileList[0]?.originFileObj) {
      formData.append("photo", fileList[0]?.originFileObj);
    }
    for (const key in rest) {
      if (rest[key]) {
        formData.append(key, rest[key]);
      }
    }
    createEmployee(formData);
  };

  useEffect(() => {
    if (department) {
      const departmentTypeList =
        department?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.department_name,

          key: `room_${value.department_name}_${index}`,
        })) || [];
      setDepartmentTypeList(departmentTypeList);
    }
  }, [department]);
  useEffect(() => {
    if (designation) {
      const degsinationTypeList =
        designation?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.designation_name,

          key: `room_${value.designation_name}_${index}`,
        })) || [];
      setDegisnationTypeList(degsinationTypeList);
    }
  }, [designation]);

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
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Select Category"
              name="category"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Category"
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
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Restaurant Name"
                name="res_id"
                style={{ width: "100%" }}
                labelCol={{ span: 8 }} // Adjust the span value for the label size
                rules={[
                  {
                    required: true,
                    message: "Enter your Department",
                  },
                ]}
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
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Employee Name"
              name="name"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
              rules={[
                {
                  required: true,
                  message: "Enter Name",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Name"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* email */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Email"
              name="email"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
            >
              <Input
                type="email"
                placeholder="Enter Your Email"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* mobile_no */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Mobile No"
              name="mobile_no"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
              rules={[
                {
                  required: true,
                  message: "Enter your mobile_no",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter Your mobile_no"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* address */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
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
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
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
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Birth Date"
              name="birth_date"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
              rules={[
                {
                  required: true,
                  message: "Enter your Birth Date",
                },
              ]}
            >
              <DatePicker onChange={onChange} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/* appointment_date */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Appointment Date"
              name="appointment_date"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
              rules={[
                {
                  required: true,
                  message: "Enter your Appointment Date",
                },
              ]}
            >
              <DatePicker onChange={onChange} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/* joining_date */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Joining Date"
              name="joining_date"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
              rules={[
                {
                  required: true,
                  message: "Enter your Joining Date",
                },
              ]}
            >
              <DatePicker onChange={onChange} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* department */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Department"
              name="department_id"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
              rules={[
                {
                  required: true,
                  message: "Enter your Department",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select department"
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={departmentTypeList}
              />
            </Form.Item>
          </Col>
          {/* designation */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Designation"
              name="designation_id"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
              rules={[
                {
                  required: true,
                  message: "Enter your Designation",
                },
              ]}
            >
              {/* <Select
                style={{ width: "100%" }}
                placeholder="Select Designation"
              >
                {designation?.data?.map((room: any) => (
                  <Select.Option key={room.id} value={room.id}>
                    {room.designation_name}
                  </Select.Option>
                ))}
              </Select> */}
              <Select
                style={{ width: "100%" }}
                placeholder="Select Designation"
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={degisnationTypeList}
              />
            </Form.Item>
          </Col>
          {/* salary */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Salary"
              name="salary"
              style={{ width: "100%" }}
              labelCol={{ span: 8 }} // Adjust the span value for the label size
              rules={[
                {
                  required: true,
                  message: "Enter your salary",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter Your salary"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* photo */}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Form.Item
              label="Upload employee picture"
              rules={[
                {
                  required: true,
                  message: "Enter Your Photo !",
                },
              ]}
            >
              <Upload
                onChange={(fileList: any) => {
                  setFileList(fileList?.fileList);
                }}
                action="/upload.do"
                listType="picture-card"
                onPreview={handlePreview}
                maxCount={1}
                accept=".png,.jpg,.jpeg"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Col>
        </Row>

        <Row align={"middle"} justify="start">
          <SubmitButton loading={isLoading} />
        </Row>
      </Form>
    </>
  );
};

export default CreateEmployee;
