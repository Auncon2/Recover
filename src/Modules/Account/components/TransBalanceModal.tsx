import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import {
  useGetAccountListQuery,
  useTransferBalanceMutation,
} from "../api/AccountEndPoint";
import { TbTransfer } from "react-icons/tb";

const TransBalanceModal = ({
  setIsModalOpen,
  isModalOpen,
  accountData,
}: any) => {
  const [form] = useForm();
  // const { data: user } = useGetMeQuery();
  // const userId = user?.data?.id;
  const [filter, _setFilter] = useState<any>({
    // admin_id: userId,
    status: 1,
  });
  const [accountList, setAccountList] = useState<any>([]);

  const { data: accountlistData } = useGetAccountListQuery(filter);
  const [transferBalance, { isSuccess, isLoading }] =
    useTransferBalanceMutation();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(["to_account", "pay_amount"]);
  };
  useEffect(() => {
    if (accountData) {
      form.setFieldValue("name", accountData?.name);
    }
  }, [accountData]);

  useEffect(() => {
    if (accountlistData && accountlistData.data) {
      const BankType = accountlistData?.data
        .filter((value) => value.id !== accountData?.id) // Filter out items with matching id
        .map((value, index) => ({
          value: value.id,
          label: value.name,
          id: value.id,
          key: `room_${value.name}_${index}`,
        }));
      setAccountList(BankType);
    }
  }, [accountlistData, accountData?.id]);

  const onFinish = (values: any) => {
    if (Number(values.pay_amount) <= Number(accountData?.available_balance)) {
      const Transfer = {
        transfer_type: "by_account",
        from_account: Number(accountData?.id),
        pay_amount: Number(values.pay_amount),
        to_account: Number(values.to_account),
      };
      transferBalance(Transfer);
    } else {
      message.error(
        `The amount you want to transfer can not exceed Available Balance (${accountData?.available_balance})`
      );
    }
  };
  useEffect(() => {
    if (isSuccess) {
      handleCancel();

      // form.resetFields(["to_account", "pay_amount"]);
    }
  }, [isSuccess]);
  const onSearch = (_value: string) => {};

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="upate Account "
        form={form}
        // initialValues={{ remember: true }}
        initialValues={{}}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <div className="text-center text-lg font-semibold mb-5">
          <span>Make Balance Transfer</span>
        </div>

        {/* current account name */}
        <Form.Item
          label="Current Account"
          name="name"
          style={{ width: "100%" }}
        >
          <Input
            type="text"
            placeholder="Enter Account Name"
            style={{ width: "100%" }}
            readOnly
          />
        </Form.Item>
        {/* Enter Amount */}
        <Form.Item
          label="Enter Amount"
          name="pay_amount"
          style={{ width: "100%" }}
          rules={[{ required: true }]}
        >
          <InputNumber
            placeholder="Enter Amount"
            min={0}
            // max={accountData?.available_balance}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* status */}
        <Form.Item
          label="Select Account You Want To Transfer "
          name="to_account"
        >
          <Select
            placeholder="Select Account Name"
            options={accountList}
            showSearch
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={filterOption}
          />
        </Form.Item>
        <Row justify="center">
          <Form.Item>
            <Button
              icon={<TbTransfer size={18} />}
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
              loading={isLoading}
            >
              Transfer
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default TransBalanceModal;
