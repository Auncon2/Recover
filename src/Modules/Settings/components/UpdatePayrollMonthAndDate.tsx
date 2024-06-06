import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

import { useUpdatePayRollMonthAndSalaryTypesMutation } from "../api/PayRollMonthAndSalaryEndPoints";

interface IupdateDepartmentTypes {
  hours: number;

  month_name: string;
}
const UpdatePayrollMonthAndDate = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, month_name, hours } = updateData || {};

  const [updateBedTypes] = useUpdatePayRollMonthAndSalaryTypesMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("name", month_name);
      form.setFieldValue("hours", hours);
    }
  }, [form, month_name, updateData]);

  const onSubmit: SubmitHandler<IupdateDepartmentTypes> = async (data) => {
    await updateBedTypes({ id, data });
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        // title="Upadte Payroll Month & Hours"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="upate Department Types"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="Update Payroll Month" name="name">
            <Input type="text" placeholder="Enter Department Types " />
          </Form.Item>
          <Form.Item label="Update Total Hours Per Month" name="hours">
            <InputNumber
              min={0}
              placeholder="Enter Department Types "
              style={{ width: "100%" }}
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
    </>
  );
};

export default UpdatePayrollMonthAndDate;
