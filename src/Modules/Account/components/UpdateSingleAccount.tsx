import { Button, Form, Input, Modal, Row, Select } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useUpdateAccountMutation } from "../api/AccountEndPoint";

interface IUpdateAccount {
  name: string;
  ac_type: string;
  bank: string;
  branch: string;
  account_number: string;
  details: string;
  status: string;
}

const UpdateSingleAccount = ({
  setIsModalOpen,
  isModalOpen,
  updateData,
}: any) => {
  const [form] = useForm();
  const { id, name, ac_type, bank, branch, account_number, details, status } =
    updateData || {};
  const [updateAccount] = useUpdateAccountMutation();
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [accountType, setAccountType] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (updateData) {
      form.setFieldValue("name", name || "");
      form.setFieldValue("ac_type", ac_type || "");
      form.setFieldValue("bank", bank || "");
      form.setFieldValue("branch", branch || "");
      form.setFieldValue("account_number", account_number || "");
      form.setFieldValue("details", details || "");
      // form.setFieldValue("status", status === 1 ? "Active" : "Deactive");
      form.setFieldValue("status", String(status));
    }
  }, [
    ac_type,
    account_number,
    bank,
    branch,
    details,
    form,
    name,
    status,
    updateData,
  ]);
  const ACCOUNT_TYPE = useWatch("ac_type", form);
  const onSubmit: SubmitHandler<IUpdateAccount> = async (data) => {
    console.log("data", data);
    // const { ac_type, bank, branch } = data;
    // if (ac_type === "cash") {
    //   console.log("saas", data);
    // }
    if (accountType != "cash") {
      await updateAccount({ id, data });
      setIsModalOpen(false);
    } else if (accountType === "cash") {
      const UpdateAccount = {
        ac_type: data.ac_type,
        account_number: "",
        bank: "",
        branch: "",
        details: data.details,
        name: data.name,
        status: data.status,
      };
      await updateAccount({ id, data: UpdateAccount });
      setIsModalOpen(false);
    }
  };

  const handleAccountTypeChange = (value: string) => {
    setAccountType(value);
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
          name="upate Account "
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
        >
          <div className="text-center text-lg font-semibold mb-5">
            <span>Update Account</span>
          </div>
          {/* name */}
          <Form.Item label="Account Name" name="name">
            <Input type="text" placeholder="Enter Account Name" />
          </Form.Item>
          {/* acc Type */}
          <Form.Item label="Account Type" name="ac_type">
            <Select
              style={{ width: "100%" }}
              onChange={handleAccountTypeChange}
              placeholder="Enter Account Type"
            >
              <Select.Option value="bank">Bank</Select.Option>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="cheque">Cheque</Select.Option>
              <Select.Option value="mobile-banking">
                Mobile Banking
              </Select.Option>
            </Select>
          </Form.Item>

          {/* bank */}
          {ACCOUNT_TYPE !== "cash" && (
            <Form.Item
              label="Bank name"
              name="bank"
              rules={[{ required: true, message: "Enter Bank Name!" }]}
            >
              <Input type="text" placeholder="Enter Bank Name" />
            </Form.Item>
          )}
          {/* branch */}
          {ACCOUNT_TYPE !== "cash" && (
            <Form.Item
              label="Branch name"
              name="branch"
              rules={[{ required: true, message: "Enter Branch Name!" }]}
            >
              <Input type="text" placeholder="Enter branch Name" />
            </Form.Item>
          )}

          {/* account_number */}
          {ACCOUNT_TYPE !== "cash" && (
            <Form.Item
              label="Account Number"
              name="account_number"
              rules={[{ required: true, message: "Enter Account Number!" }]}
            >
              <Input type="text" placeholder="Enter Account Number" />
            </Form.Item>
          )}
          {/* status */}
          <Form.Item name="status" label="Status">
            <Select
              style={{ width: "100%" }}
              placeholder="Select Status"
              options={[
                { value: "1", label: "Active" },
                { value: "0", label: "Deactive" },
              ]}
            ></Select>
          </Form.Item>
          {/* Details */}
          <Form.Item name="details" label="Details">
            <Input type="text" placeholder="Details" />
          </Form.Item>
          <Row justify="center">
            <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
              <Button
                // icon={<FaArrowLeft />}
                htmlType="submit"
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Update
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateSingleAccount;
