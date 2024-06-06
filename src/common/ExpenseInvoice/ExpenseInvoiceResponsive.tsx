import { ConfigProvider, Row, Typography } from "antd";
import { useGetSingleHotelQuery } from "../../Modules/Settings/api/SettingsEndPoints";
import { ResponsiveInvoiceHeader } from "../FormItem/InvoiceHeader";

const ExpenseInvoiceResponsive = ({ data }: any) => {
  const {
    ac_type,
    account_name,
    bank_name,
    // branch,

    expense_details,
    expense_items,
    expense_name,
    voucher_no,
    // remaining_balance,
    total_cost,
  } = data || {};
  const { data: hotel_info } = useGetSingleHotelQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <ConfigProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          //   style={{
          //     width: "9in",
          //     display: "flex",
          //     justifyContent: "center",
          //     backgroundColor: "white",
          //     border: "1px solid lightgray",
          //   }}
          className="w-[2in] md:w-[5in] lg:w-[7in] xl:w-[9in] flex justify-center bg-white border border-lightgray"
        >
          <div
            // style={{
            //   padding: "0.5in",
            //   width: "8.27in",
            //   minHeight: "11.69in",
            //   position: "relative",
            // }}
            className="p-[0.5in] w-[8.27in] min-h-[11.69in] relative"
          >
            <div style={{ margin: "5px 0px", padding: "5px 0px" }}>
              <ResponsiveInvoiceHeader
                createdDate={hotel_info?.data.founded_year}
                phone={hotel_info?.data.phone}
                address={hotel_info?.data.address}
                website={hotel_info?.data.website}
                logo={hotel_info?.data.logo}
                name={hotel_info?.data.name}
              />
              <div className="my-4" />
              <div className="space-y-1 ">
                <div style={{ textAlign: "left", color: "black" }}>
                  <Typography.Text strong className="text-black">
                    <div
                      className="w-[8rem] "
                      style={{ display: "inline-block", marginRight: "5px" }}
                    >
                      Voucher No.
                    </div>
                    : {voucher_no}
                  </Typography.Text>
                  <br />
                </div>
                <div style={{ textAlign: "left" }}>
                  <Typography.Text strong className="text-black">
                    <div
                      className="w-[8rem]"
                      style={{ display: "inline-block", marginRight: "5px" }}
                    >
                      Pay Type
                    </div>
                    : {ac_type}
                  </Typography.Text>
                  <br />
                </div>
                <div style={{ textAlign: "left" }}>
                  <Typography.Text strong className="text-black">
                    <div
                      className="w-[8rem]"
                      style={{ display: "inline-block", marginRight: "5px" }}
                    >
                      Bank Name
                    </div>
                    : {bank_name}
                  </Typography.Text>
                  <br />
                </div>
                <div style={{ textAlign: "left" }}>
                  <Typography.Text strong className="text-black">
                    <div
                      className="w-[8rem]"
                      style={{ display: "inline-block", marginRight: "5px" }}
                    >
                      Account Name
                    </div>
                    : {account_name}
                  </Typography.Text>
                  <br />
                </div>
              </div>

              {expense_details && (
                <div className="mt-10">
                  <Typography.Text
                    strong
                    style={{ marginTop: "5px" }}
                    className="text-black"
                  >
                    Note : {expense_details}
                  </Typography.Text>
                </div>
              )}

              <Row justify="center" style={{ margin: "20px 0px" }}>
                <Typography.Title
                  underline
                  level={3}
                  style={{ color: "black" }}
                >
                  Expense
                </Typography.Title>
              </Row>
              <div className="text-black">
                <table className="table-auto border border-collapse  w-full">
                  <thead className="bg-[#E3E9EB] text-Black">
                    <tr>
                      <th className="border ps-5 py-1 text-left">SL</th>
                      <th className="border ps-5 py-1 text-left">
                        Expense Name
                      </th>
                      <th className="border ps-5 py-1 text-left">
                        Expense Head
                      </th>

                      <th className="border ps-5 py-1 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expense_items?.map((item: any, index: number) => (
                      <tr key={item.id}>
                        <td className="border px-5 py-1">{index + 1}</td>
                        <td className="border px-5 py-1">
                          {expense_name ? expense_name : "N/A"}
                        </td>
                        <td className="border px-5 py-1">
                          {item?.expense_head}
                        </td>

                        <td className="border px-5 py-1">{item?.amount}</td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan={3} className="border pe-14 py-1 text-right ">
                        Total
                      </td>
                      <td className="border px-5 py-1  "> {total_cost}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  position: "absolute", // Position these divs absolutely within the parent container
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1rem 0", // Add some margin for separation
                }}
              >
                <div>
                  <div
                    style={{
                      background: "black",
                      marginLeft: "20px",
                      width: "127px",
                      height: "1px",
                      color: "black",
                    }}
                  />
                  <Typography.Text
                    style={{ marginLeft: "20px", color: "black" }}
                    strong
                  >
                    Customer Signature
                  </Typography.Text>
                </div>
                <div className="text-black">
                  <strong>This is software generated</strong>
                </div>
                <div>
                  <div
                    style={{
                      background: "black",
                      marginRight: "20px",
                      width: "113px",
                      height: "1px",
                      color: "black",
                    }}
                  />
                  <Typography.Text
                    style={{ marginRight: "20px", color: "black" }}
                    strong
                  >
                    Authority Signature
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ExpenseInvoiceResponsive;
