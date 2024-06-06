/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
// import {
//   useGetCommonAccountQuery,
//   useGetCommonInvoiceItemQuery,
//   useGetCommonInvoiceQuery,
//   useGetCommonMemberQuery,
//   useGetCommonMemberforNoticeQuery,
// } from './CommonEndPoint';
import { commonProps } from "./CommonTypes";
import { useGetCommonPropertyQuery } from "./CommonEndPoint";

/* SelectMember */
export const SelectProperty = ({ name, label, required }: commonProps) => {
  const { data: property } = useGetCommonPropertyQuery();
  console.log(property);
  const selectProperty = property?.data;
  const propertyChildren: React.ReactNode[] = [];
  if (selectProperty) {
    for (let i = 0; i < selectProperty.length; i++) {
      propertyChildren.push(
        <Select.Option
          title="Select Property"
          key={
            selectProperty[i].propertyid + " " + selectProperty[i].propertyname
          }
          value={selectProperty[i].propertyid}
        >
          {selectProperty[i].propertyname}
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
        placeholder={"Select Property"}
        showSearch
        allowClear
        style={{ border: "0", width: "28rem" }}
        optionFilterProp="roleMobile"
        popupMatchSelectWidth={150}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {propertyChildren}
      </Select>
    </Form.Item>
  );
};

/* PaymentType */

// export const SelectPaymentType = ({
//   name,
//   label,
//   required,
//   disabled,
//   onChange,
// }: commonProps) => {
//   // ================= transaction

//   return (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[{ required: required, message: `${label} is required` }]}
//     >
//       <Select
//         onChange={onChange}
//         disabled={disabled}
//         placeholder='Select status'
//         showSearch
//       >
//         <Select.Option key={1} value='paid'>
//           {'Paid'}
//         </Select.Option>
//         <Select.Option key={2} value='unpaid'>
//           {'Unpaid'}
//         </Select.Option>
//       </Select>
//     </Form.Item>
//   );
// };

// /* Account */
// export const SelectAccount = ({ name, label, required }: commonProps) => {
//   const { data: account } = useGetCommonAccountQuery();
//   const selectAccount = account?.data;
//   const accountChildren: React.ReactNode[] = [];
//   if (selectAccount) {
//     for (let i = 0; i < selectAccount.length; i++) {
//       accountChildren.push(
//         <Select.Option
//           title='Select Account'
//           key={selectAccount[i].id + ' ' + selectAccount[i].name}
//           value={selectAccount[i].id}
//         >
//           {selectAccount[i].name}
//         </Select.Option>
//       );
//     }
//   }

//   return (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required || false,
//           message: `${label} is required!`,
//         },
//       ]}
//     >
//       <Select
//         placeholder={'Select Account'}
//         showSearch
//         allowClear
//         style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
//         optionFilterProp='roleMobile'
//         popupMatchSelectWidth={150}
//         filterOption={(input, option) =>
//           (option!.children as unknown as string)
//             .toLowerCase()
//             .includes(input.toLowerCase())
//         }
//       >
//         {accountChildren}
//       </Select>
//     </Form.Item>
//   );
// };

/* SelectInvoice */
// export const SelectInvoiceItem = ({
//   name,
//   label,
//   required,
//   onSelectInvoiceHead,
// }: privateProps) => {
//   const { data: invoiceHead } = useGetCommonInvoiceItemQuery();
//   console.log({ invoiceHead });
//   const selectInvoiceHead = invoiceHead?.data;
//   const invoiceChildren: React.ReactNode[] = [];
//   const handleInvoiceSelect = (value: string) => {
//     const selectedInvoice = selectInvoiceHead?.find(
//       (invoice: any) => invoice.id === value
//     );
//     if (selectedInvoice) {
//       onSelectInvoiceHead(selectedInvoice.amount);
//     }
//   };
//   if (selectInvoiceHead) {
//     for (let i = 0; i < selectInvoiceHead.length; i++) {
//       invoiceChildren.push(
//         <Select.Option
//           title='Select Invoice Head'
//           key={
//             selectInvoiceHead[i].id +
//             ' ' +
//             selectInvoiceHead[i].name +
//             '' +
//             selectInvoiceHead[i].amount
//           }
//           value={selectInvoiceHead[i].id}
//         >
//           {selectInvoiceHead[i].name}
//         </Select.Option>
//       );
//     }
//   }

//   return (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required || false,
//           message: `${label} is required!`,
//         },
//       ]}
//     >
//       <Select
//         placeholder={'Select Invoice Head'}
//         showSearch
//         allowClear
//         style={{ padding: '-8px', margin: '0', border: '0', width: '100%' }}
//         optionFilterProp='roleMobile'
//         popupMatchSelectWidth={150}
//         filterOption={(input, option) =>
//           (option!.children as unknown as string)
//             .toLowerCase()
//             .includes(input.toLowerCase())
//         }
//         onChange={handleInvoiceSelect}
//       >
//         {invoiceChildren}
//       </Select>
//     </Form.Item>
//   );
// };

// /* SelectInvoice */
// export const SelectInvoice = ({ name, label, required }: commonProps) => {
//   const { data: invoice } = useGetCommonInvoiceQuery();
//   const selectInvoice = invoice?.data;
//   const invoiceChildren: React.ReactNode[] = [];
//   if (selectInvoice) {
//     for (let i = 0; i < selectInvoice.length; i++) {
//       invoiceChildren.push(
//         <Select.Option
//           title='Select Invoice'
//           key={selectInvoice[i].id + ' ' + selectInvoice[i].name}
//           value={selectInvoice[i].id}
//         >
//           {selectInvoice[i].name}
//         </Select.Option>
//       );
//     }
//   }

//   return (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required || false,
//           message: `${label} is required!`,
//         },
//       ]}
//     >
//       <Select
//         placeholder={'Select Invoice'}
//         showSearch
//         allowClear
//         style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
//         optionFilterProp='roleMobile'
//         popupMatchSelectWidth={150}
//         filterOption={(input, option) =>
//           (option!.children as unknown as string)
//             .toLowerCase()
//             .includes(input.toLowerCase())
//         }
//       >
//         {invoiceChildren}
//       </Select>
//     </Form.Item>
//   );
// };

// export const SelectPaymentMethod = ({
//   name,
//   label,
//   required,
//   disabled,
// }: commonProps) => {
//   return (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[{ required: required, message: `${label} is required` }]}
//     >
//       <Select disabled={disabled} placeholder='Select Method' showSearch>
//         <Select.Option key={1} value='cash'>
//           {'Cash'}
//         </Select.Option>
//         <Select.Option key={2} value='mobile_banking'>
//           {'Mobile Banking'}
//         </Select.Option>
//         <Select.Option key={3} value='cheque'>
//           {'Cheque'}
//         </Select.Option>
//         <Select.Option key={4} value='bank'>
//           {'Bank'}
//         </Select.Option>
//       </Select>
//     </Form.Item>
//   );
// };

/* PaymentType */

// export const SelectNoticeType = ({
//   name,
//   label,
//   required,
//   disabled,
//   onChange,
// }: commonProps) => {
//   // ================= transaction

//   return (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[{ required: required, message: `${label} is required` }]}
//     >
//       <Select
//         onChange={onChange}
//         disabled={disabled}
//         placeholder='Select status'
//         showSearch
//       >
//         <Select.Option key={1} value='all'>
//           {'All'}
//         </Select.Option>
//         <Select.Option key={2} value='specific'>
//           {'Specific'}
//         </Select.Option>
//       </Select>
//     </Form.Item>
//   );
// };

// /* SelectMember */
// export const SelectMemberforNotice = ({
//   name,
//   label,
//   required,
//   multiple,
// }: commonProps) => {
//   const { data: member } = useGetCommonMemberforNoticeQuery({
//     status: 'active',
//   });
//   const selectMode = multiple ? 'multiple' : undefined;
//   const selectMember = member?.data;
//   const memberChildren: React.ReactNode[] = [];
//   if (selectMember) {
//     for (let i = 0; i < selectMember.length; i++) {
//       memberChildren.push(
//         <Select.Option
//           title='Select Member'
//           key={selectMember[i].id + ' ' + selectMember[i].name}
//           value={selectMember[i].companyId}
//         >
//           {selectMember[i].name} [{selectMember[i].companyName}]
//         </Select.Option>
//       );
//     }
//   }

//   return (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required || false,
//           message: `${label} is required!`,
//         },
//       ]}
//     >
//       <Select
//         mode={selectMode}
//         placeholder={'Select Member'}
//         showSearch
//         allowClear
//         style={{ padding: '0', margin: '0', border: '0', width: '100%' }}
//         optionFilterProp='roleMobile'
//         popupMatchSelectWidth={150}
//         filterOption={(input, option) =>
//           (option!.children as unknown as string)
//             .toLowerCase()
//             .includes(input.toLowerCase())
//         }
//       >
//         {memberChildren}
//       </Select>
//     </Form.Item>
//   );
// };
