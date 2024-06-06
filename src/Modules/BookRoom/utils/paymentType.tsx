// <div>
//   <Card style={{ marginBottom: "20px" }}>
//     <div className="flex justify-start  gap-4 border-b-2 border-[#01adad] mb-7 ">
//       <span
//         className={
//           payment
//             ? "border-b-4 border-b-[#01adad] py-2 text-[#2d9292] font-semibold"
//             : "py-2 font-semibold text-slate-400"
//         }
//         onClick={() => {
//           setPayment(true);
//           form.resetFields([
//             "discount_amount_partial",
//             "tax_amount_partial",
//             "paid_amount_partial",
//             "payment_type_partial",
//             "ac_tr_ac_id_partial",
//             setBookList([
//               // {
//               //   tax_amount_full,
//               //   paid_amount_full,
//               //   payment_type_full,
//               //   ac_tr_ac_id_full,
//               // },
//             ]),
//           ]);
//         }}
//       >
//         Full Payment
//       </span>
//       <span
//         className={
//           payment
//             ? "py-2 font-semibold text-slate-400"
//             : "border-b-4 border-b-[#01adad] py-2 text-[#2d9292] font-semibold"
//         }
//         onClick={() => {
//           setPayment(false);
//           form.resetFields([
//             "discount_amount_full",
//             "tax_amount_full",
//             "paid_amount_full",
//             "payment_type_full",
//             "ac_tr_ac_id_full",
//           ]);
//           setBookList([]);
//         }}
//       >
//         Partial Payment
//       </span>
//     </div>

//     {payment ? (
//       <>
//         <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Discount Amount</span>}
//               name="discount_amount_full"
//               style={{ width: "100%" }}
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Please enter discount amount in TK!",
//               //   },
//               // ]}
//             >
//               <InputNumber
//                 formatter={(value) =>
//                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 }
//                 parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
//                 placeholder="Enter discount amount in"
//                 style={{ width: "100%" }}
//                 onChange={(value) =>
//                   handleFilterChange(
//                     { discount_amount_full: value },
//                     form.getFieldsValue()
//                   )
//                 }
//               />
//             </Form.Item>
//           </Col>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Tax Amount</span>}
//               name="tax_amount_full"
//               style={{ width: "100%" }}
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Please enter tax amount in TK!",
//               //   },
//               // ]}
//             >
//               <InputNumber
//                 formatter={(value) =>
//                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 }
//                 parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
//                 placeholder="Enter tax amount in"
//                 style={{ width: "100%" }}
//                 onChange={(value) =>
//                   handleFilterChange(
//                     { tax_amount_full: value },
//                     form.getFieldsValue()
//                   )
//                 }
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Paid Amount</span>}
//               name="paid_amount_full"
//               style={{ width: "100%" }}
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Please enter paid amount in TK!",
//               //   },
//               // ]}
//             >
//               <InputNumber
//                 formatter={(value) =>
//                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 }
//                 parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
//                 placeholder="Enter paid ammount in"
//                 style={{ width: "100%" }}
//                 onChange={(value) =>
//                   handleFilterChange(
//                     { paid_amount_full: value },
//                     form.getFieldsValue()
//                   )
//                 }
//               />
//             </Form.Item>
//           </Col>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Payment Type</span>}
//               name="payment_type_full"
//               style={{ width: "100%" }}
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Please select payment type!",
//               //   },
//               // ]}
//             >
//               <Select
//                 // style={{ width: "400px" }}
//                 // onChange={(value) =>
//                 //   handleFilterChange(
//                 //     { room: value },
//                 //     form.getFieldsValue()
//                 //   )
//                 // }
//                 placeholder="Select payment type"
//                 options={[
//                   {
//                     value: "bank",
//                     label: "bank",
//                   },
//                   {
//                     value: "cash",
//                     label: "cash",
//                   },
//                   {
//                     value: "check",
//                     label: "check",
//                   },
//                 ]}
//                 // onChange={(value) =>
//                 //   handleFilterChange(
//                 //     { payment_type: value },
//                 //     form.getFieldsValue()
//                 //   )
//                 // }
//                 onChange={(value) => {
//                   handleFilterChange(
//                     { payment_type_full: value },
//                     form.getFieldsValue()
//                   );

//                   setFilter({
//                     ac_type: value,
//                   });

//                   // onStatusFilter;
//                 }}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Account Name</span>}
//               name="ac_tr_ac_id_full"
//               style={{ width: "100%" }}
//             >
//               <Select
//                 // style={{ width: "400px" }}

//                 placeholder="Select account name"
//                 options={bankList}
//                 onChange={(value) =>
//                   handleFilterChange(
//                     { ac_tr_ac_id_full: value },
//                     form.getFieldsValue()
//                   )
//                 }
//                 disabled={!form.getFieldValue("payment_type_full")}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//       </>
//     ) : (
//       <>
//         <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Discount Amount</span>}
//               name="discount_amount_partial"
//               style={{ width: "100%" }}
//             >
//               <InputNumber
//                 formatter={(value) =>
//                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 }
//                 parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
//                 placeholder="Enter discount amount in "
//                 style={{ width: "100%" }}
//                 onChange={(value) =>
//                   handleFilterChange(
//                     { discount_amount_partial: value },
//                     form.getFieldsValue()
//                   )
//                 }
//               />
//             </Form.Item>
//           </Col>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Tax Amount</span>}
//               name="tax_amount_partial"
//               style={{ width: "100%" }}
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Please enter tax amount in TK!",
//               //   },
//               // ]}
//             >
//               <InputNumber
//                 formatter={(value) =>
//                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 }
//                 parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
//                 placeholder="Enter tax amount in "
//                 style={{ width: "100%" }}
//                 onChange={(value) =>
//                   handleFilterChange(
//                     { tax_amount_partial: value },
//                     form.getFieldsValue()
//                   )
//                 }
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Paid Amount</span>}
//               name="paid_amount_partial"
//               style={{ width: "100%" }}
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Please enter paid amount in TK!",
//               //   },
//               // ]}
//             >
//               <InputNumber
//                 formatter={(value) =>
//                   `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 }
//                 parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
//                 placeholder="Enter paid ammount in "
//                 style={{ width: "100%" }}
//                 onChange={(value) =>
//                   handleFilterChange(
//                     { paid_amount_partial: value },
//                     form.getFieldsValue()
//                   )
//                 }
//               />
//             </Form.Item>
//           </Col>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Payment Type</span>}
//               name="payment_type_partial"
//               style={{ width: "100%" }}
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Please select payment type!",
//               //   },
//               // ]}
//             >
//               <Select
//                 // style={{ width: "400px" }}
//                 // onChange={(value) =>
//                 //   handleFilterChange(
//                 //     { room: value },
//                 //     form.getFieldsValue()
//                 //   )
//                 // }
//                 placeholder="Select payment type"
//                 options={[
//                   {
//                     value: "bank",
//                     label: "bank",
//                   },
//                   {
//                     value: "cash",
//                     label: "cash",
//                   },
//                   {
//                     value: "cheque",
//                     label: "cheque",
//                   },
//                 ]}
//                 // onChange={(value) =>
//                 //   handleFilterChange(
//                 //     { payment_type: value },
//                 //     form.getFieldsValue()
//                 //   )
//                 // }
//                 onChange={(value) => {
//                   handleFilterChange(
//                     { payment_type_partial: value },
//                     form.getFieldsValue()
//                   );

//                   setFilter({
//                     ac_type: value,
//                   });

//                   // onStatusFilter;
//                 }}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row align={"middle"} justify={"start"} gutter={[15, 15]}>
//           <Col xs={24} sm={12} md={12} lg={12}>
//             <Form.Item
//               label={<span className="font-semibold">Account Name</span>}
//               name="ac_tr_ac_id_partial"
//               style={{ width: "100%" }}
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: "Please select account name!",
//               //   },
//               // ]}
//             >
//               <Select
//                 // style={{ width: "400px" }}

//                 placeholder="Select account name"
//                 options={bankList}
//                 onChange={(value) =>
//                   handleFilterChange(
//                     { ac_tr_ac_id_partial: value },
//                     form.getFieldsValue()
//                   )
//                 }
//                 disabled={!form.getFieldValue("payment_type_partial")}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//       </>
//     )}
//   </Card>
// </div>
