import { Button, Col, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useUpdateRestaurantMutation } from "../api/CreateRestaurentEndPoints";

interface IUpdateRestaurant {
  name: string;
  status: string;
}

const UpdateRestaurantModal = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { name, res_id, res_status } = updateData || {};
  const [updateRestaurant] = useUpdateRestaurantMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("status", String(res_status));
      form.setFieldValue("name", name);
    }
  }, [form, res_status, name, updateData]);
  console.log("res_id", res_id);
  const onSubmit: SubmitHandler<IUpdateRestaurant> = async (data) => {
    await updateRestaurant({
      id: res_id,
      data: { name: data?.name, status: data?.status },
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="upate Restaurant Status"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          {/* Name */}
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Form.Item
              name="name"
              label="Restaurant Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Restaurant Name",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter Your Restaurant Name" />
            </Form.Item>
          </Col>
          <Form.Item
            label="Update Restaurant Status title"
            name="status"
            rules={[
              { required: true, message: "Please input Restaurant Status !" },
            ]}
          >
            <Select
              placeholder="Enter Restaurant Status"
              options={[
                { label: "Active", value: "1" },
                { label: "Deactive", value: "0" },
              ]}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            {/* <Button
              className="text-bold bg-green-500 hover:bg-blue-700 text-white w-36"
              htmlType="submit"
            >
              Submit
            </Button> */}
            <Button
              // icon={<FaArrowLeft />}
              htmlType="submit"
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                // width: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateRestaurantModal;
