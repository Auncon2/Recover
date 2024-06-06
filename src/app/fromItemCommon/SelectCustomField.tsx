/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
import {
  useGetCommonAccountQuery,
  useGetCommonInvoiceItemQuery,
  useGetCommonInvoiceQuery,
  useGetCommonMemberQuery,
  useGetCommonMemberforNoticeQuery,
  useGetCommonPermissionQuery,
  useGetCommonRoleQuery,
} from "./CommonEndPoint";
import { commonProps, privateProps } from "./CommonTypes";
import { useGetPermissionGrouplistQuery } from "../../Modules/Administration/Permissions/api/PermissionGroupEndPoint";
import { useGetRolelistQuery } from "../../Modules/Administration/Role/api/RoleEndPoint";
// import { useGetExpenseHeadlistQuery } from '../../Modules/Expense/api/ExpenseEndPoint';

/* SelectMember */
export const SelectMember = ({ name, label, required }: commonProps) => {
  const { data: member } = useGetCommonMemberQuery();
  const selectMember = member?.data;
  const memberChildren: React.ReactNode[] = [];
  if (selectMember) {
    for (let i = 0; i < selectMember.length; i++) {
      memberChildren.push(
        <Select.Option
          title="Select Member"
          key={selectMember[i].userMemberId + " " + selectMember[i].name}
          value={selectMember[i].userMemberId}
        >
          {selectMember[i].companyName}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={"Select Member"}
        showSearch
        allowClear
        style={{ padding: "0", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {memberChildren}
      </Select>
    </Form.Item>
  );
};

/* PaymentType */

export const SelectSmsType = ({
  name,
  label,
  required,
  disabled,
  onChange,
}: commonProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `${label} is required` }]}
    >
      <Select
        onChange={onChange}
        disabled={disabled}
        placeholder="Select Type"
        showSearch
      >
        {/* <Select.Option key={1} value='all'>
          {'All'}
        </Select.Option> */}
        <Select.Option key={1} value="active">
          {"Active"}
        </Select.Option>
        <Select.Option key={2} value="applying">
          {"Applying"}
        </Select.Option>
      </Select>
    </Form.Item>
  );
};
export const SelectPaymentType = ({
  name,
  label,
  required,
  disabled,
  onChange,
}: commonProps) => {
  // ================= transaction

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `${label} is required` }]}
    >
      <Select
        onChange={onChange}
        disabled={disabled}
        placeholder="Select status"
        showSearch
      >
        <Select.Option key={1} value="paid">
          {"Paid"}
        </Select.Option>
        <Select.Option key={2} value="unpaid">
          {"Unpaid"}
        </Select.Option>
      </Select>
    </Form.Item>
  );
};

/* Account */
export const SelectAccount = ({
  name,
  label,
  required,
  accountSelectID,
}: commonProps) => {
  const { data: account } = useGetCommonAccountQuery();
  const selectAccount = account?.data;
  const accountChildren: React.ReactNode[] = [];
  if (selectAccount) {
    for (let i = 0; i < selectAccount.length; i++) {
      accountChildren.push(
        <Select.Option
          title="Select Account"
          key={selectAccount[i].id + " " + selectAccount[i].name}
          value={selectAccount[i].id}
        >
          {selectAccount[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
        {
          validator: (_rule, value) => {
            if (accountSelectID && value === accountSelectID) {
              return Promise.reject(
                "The 'From Account' and 'To Account' cannot be the same."
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Select
        placeholder={"Select Account"}
        showSearch
        allowClear
        style={{ padding: "0", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {accountChildren}
      </Select>
    </Form.Item>
  );
};

/* SelectInvoice */
export const SelectInvoiceItem = ({
  name,
  label,
  required,
  onSelectInvoiceHead,
}: privateProps) => {
  const { data: invoiceHead } = useGetCommonInvoiceItemQuery();
  const selectInvoiceHead = invoiceHead?.data;
  const invoiceChildren: React.ReactNode[] = [];
  const handleInvoiceSelect = (value: string) => {
    const selectedInvoice = selectInvoiceHead?.find(
      (invoice: any) => invoice.id === value
    );
    if (selectedInvoice) {
      onSelectInvoiceHead(selectedInvoice.amount);
    }
  };
  if (selectInvoiceHead) {
    for (let i = 0; i < selectInvoiceHead.length; i++) {
      invoiceChildren.push(
        <Select.Option
          title="Select Invoice Head"
          key={
            selectInvoiceHead[i].id +
            " " +
            selectInvoiceHead[i].name +
            "" +
            selectInvoiceHead[i].amount
          }
          value={selectInvoiceHead[i].id}
        >
          {selectInvoiceHead[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={"Select Invoice Head"}
        showSearch
        allowClear
        style={{ padding: "-8px", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        onChange={handleInvoiceSelect}
      >
        {invoiceChildren}
      </Select>
    </Form.Item>
  );
};

/* SelectInvoice */
export const SelectInvoice = ({ name, label, required }: commonProps) => {
  const { data: invoice } = useGetCommonInvoiceQuery();
  const selectInvoice = invoice?.data;
  const invoiceChildren: React.ReactNode[] = [];
  if (selectInvoice) {
    for (let i = 0; i < selectInvoice.length; i++) {
      invoiceChildren.push(
        <Select.Option
          title="Select Invoice"
          key={selectInvoice[i].id + " " + selectInvoice[i].name}
          value={selectInvoice[i].id}
        >
          {selectInvoice[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={"Select Invoice"}
        showSearch
        allowClear
        style={{ padding: "0", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {invoiceChildren}
      </Select>
    </Form.Item>
  );
};

export const SelectPaymentMethod = ({
  name,
  label,
  required,
  disabled,
}: commonProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `${label} is required` }]}
    >
      <Select
        disabled={disabled}
        placeholder="Select Payment Method"
        showSearch
      >
        <Select.Option key={1} value="cash">
          {"Cash"}
        </Select.Option>
        <Select.Option key={2} value="mobile_banking">
          {"Mobile Banking"}
        </Select.Option>
        <Select.Option key={3} value="cheque">
          {"Cheque"}
        </Select.Option>
        <Select.Option key={4} value="bank">
          {"Bank"}
        </Select.Option>
      </Select>
    </Form.Item>
  );
};

/* PaymentType */

export const SelectNoticeType = ({
  name,
  label,
  required,
  disabled,
  onChange,
}: commonProps) => {
  // ================= transaction

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `${label} is required` }]}
    >
      <Select
        onChange={onChange}
        disabled={disabled}
        placeholder="Select status"
        showSearch
      >
        <Select.Option key={1} value="all">
          {"All"}
        </Select.Option>
        <Select.Option key={2} value="specific">
          {"Specific"}
        </Select.Option>
      </Select>
    </Form.Item>
  );
};

/* SelectMember */
export const SelectMemberforNotice = ({
  name,
  label,
  required,
  multiple,
}: commonProps) => {
  const { data: member } = useGetCommonMemberforNoticeQuery({
    status: "active",
  });
  const selectMode = multiple ? "multiple" : undefined;
  const selectMember = member?.data;
  const memberChildren: React.ReactNode[] = [];
  if (selectMember) {
    for (let i = 0; i < selectMember.length; i++) {
      memberChildren.push(
        <Select.Option
          title="Select Member"
          key={selectMember[i].userMemberId + " " + selectMember[i].name}
          value={selectMember[i].userMemberId}
        >
          {selectMember[i].companyName}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `Member is required!`,
        },
      ]}
    >
      <Select
        mode={selectMode}
        placeholder={"Select Member"}
        showSearch
        allowClear
        style={{ padding: "0", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {memberChildren}
      </Select>
    </Form.Item>
  );
};

/*pERMISSION gROUP */

export const SelectPermissionGroup = ({
  name,
  label,
  required,
}: commonProps) => {
  const { data: permissionGroup } = useGetPermissionGrouplistQuery();
  const selectPermissionGroup = permissionGroup?.data;
  const permissionGroupChildren: React.ReactNode[] = [];
  if (selectPermissionGroup) {
    for (let i = 0; i < selectPermissionGroup.length; i++) {
      permissionGroupChildren.push(
        <Select.Option
          title="Select Permission Group"
          key={
            selectPermissionGroup[i].id + " " + selectPermissionGroup[i].name
          }
          value={selectPermissionGroup[i].id}
        >
          {selectPermissionGroup[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={"Select Permission Group"}
        showSearch
        allowClear
        style={{ padding: "0", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {permissionGroupChildren}
      </Select>
    </Form.Item>
  );
};

/* Role */
export const SelectRole = ({ name, label, required }: commonProps) => {
  const { data: role } = useGetRolelistQuery();
  const selectRole = role?.data;
  const roleChildren: React.ReactNode[] = [];
  if (selectRole) {
    for (let i = 0; i < selectRole.length; i++) {
      roleChildren.push(
        <Select.Option
          title="Select Role"
          key={selectRole[i].id + " " + selectRole[i].name}
          value={selectRole[i].id}
        >
          {selectRole[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={"Select Permission Group"}
        showSearch
        allowClear
        style={{ padding: "0", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {roleChildren}
      </Select>
    </Form.Item>
  );
};

/*Permission */
export const SelectPermission = ({ name, label, required }: commonProps) => {
  const { data: permission } = useGetCommonPermissionQuery();
  const selectPermission = permission?.data;
  const permissionChildren: React.ReactNode[] = [];
  if (selectPermission) {
    for (let i = 0; i < selectPermission.length; i++) {
      permissionChildren.push(
        <Select.Option
          title="Select Role"
          key={selectPermission[i].id + " " + selectPermission[i].name}
          value={selectPermission[i].id}
        >
          {selectPermission[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={"Select Permission"}
        showSearch
        allowClear
        style={{ padding: "0", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {permissionChildren}
      </Select>
    </Form.Item>
  );
};

export const SelectPermissionType = ({
  name,
  label,
  required,
  disabled,
}: commonProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `${label} is required` }]}
    >
      <Select
        disabled={disabled}
        placeholder="Select Permission Type"
        showSearch
      >
        <Select.Option key={1} value="read">
          {"Read"}
        </Select.Option>
        <Select.Option key={2} value="write">
          {"Write"}
        </Select.Option>
        <Select.Option key={3} value="update">
          {"update"}
        </Select.Option>
        <Select.Option key={4} value="create">
          {"Create"}
        </Select.Option>
      </Select>
    </Form.Item>
  );
};

export const SelectApplicationStatus = ({
  name,
  label,
  required,
  onChange,
}: commonProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: `${label} is required` }]}
    >
      <Select onChange={onChange} placeholder="Select Status" showSearch>
        <Select.Option key={1} value="approved">
          {"Approved"}
        </Select.Option>
        <Select.Option key={2} value="rejected">
          {"Rejected"}
        </Select.Option>
      </Select>
    </Form.Item>
  );
};

export const SelectRoleAdmin = ({ name, label, required }: commonProps) => {
  const { data: roleAd } = useGetCommonRoleQuery();
  const selectRoledAd = roleAd?.data;
  const roleAdChildren: React.ReactNode[] = [];
  if (selectRoledAd) {
    for (let i = 0; i < selectRoledAd.length; i++) {
      roleAdChildren.push(
        <Select.Option
          title="Select Role"
          key={selectRoledAd[i].id + " " + selectRoledAd[i].name}
          value={selectRoledAd[i].id}
        >
          {selectRoledAd[i].name}
        </Select.Option>
      );
    }
  }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={"Select Role"}
        showSearch
        allowClear
        style={{ padding: "0", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {roleAdChildren}
      </Select>
    </Form.Item>
  );
};

/* SelectInvoice */
export const SelectExpenseItem = ({ name, label, required }: privateProps) => {
  // const { data: invoiceHead } = useGetExpenseHeadlistQuery();
  // const selectInvoiceHead = invoiceHead?.data;
  const invoiceChildren: React.ReactNode[] = [];

  // if (selectInvoiceHead) {
  //   for (let i = 0; i < selectInvoiceHead.length; i++) {
  //     invoiceChildren.push(
  //       <Select.Option
  //         title="Select Expense Head"
  //         key={selectInvoiceHead[i].id + " " + selectInvoiceHead[i].name + ""}
  //         value={selectInvoiceHead[i].id}
  //       >
  //         {selectInvoiceHead[i].name}
  //       </Select.Option>
  //     );
  //   }
  // }

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required || false,
          message: `${label} is required!`,
        },
      ]}
    >
      <Select
        placeholder={"Select Invoice Head"}
        showSearch
        allowClear
        style={{ padding: "-8px", margin: "0", border: "0", width: "100%" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {invoiceChildren}
      </Select>
    </Form.Item>
  );
};
