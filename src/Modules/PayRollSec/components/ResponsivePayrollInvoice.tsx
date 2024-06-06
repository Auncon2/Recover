import moment from "moment";
import { imageURL } from "../../../app/slice/baseQuery";

const ResponsivePayrollInvoice = ({ data }: any) => {
  const {
    hotel_address,
    hotel_email,
    hotel_phone,
    hotel_website,
    hotel_logo,
    hotel_name,
    employee_name,
    employee_phone,
    designation,
    voucher_no,
    salary_date,
    pay_method,
    account_name,
    base_salary,
    attendance_days,
    gross_salary,
    total_salary,
    mobile_bill,
    feed_allowance,
    perform_bonus,
    festival_bonus,
    travel_allowance,
    health_allowance,
    incentive,
    house_rent,
    deductions,
    additions,
    advance_salary,
    provident_fund,
  } = data || {};

  let totalDeduction = 0;
  if (deductions && deductions.length > 0) {
    totalDeduction = deductions.reduce(
      (acc: number, curr: any) => acc + curr.deduction_amount,
      0
    );
  }
  let totalOtherAmount = 0;
  if (additions && additions.length > 0) {
    totalOtherAmount = additions.reduce(
      (acc: number, curr: any) => acc + curr.other_amount,
      0
    );
  }
  return (
    <div>
      {/* .................................Header...................................... */}
      <div className="flex justify-between items-center">
        <div className="w-[200px] ">
          <img src={imageURL + hotel_logo} draggable="false" alt="" srcSet="" />
        </div>
        <div className="flex items-center me-3">
          <div className="w-[160px]">
            <img
              src={`../../../../public/scaner.png`}
              draggable="false"
              alt=""
              srcSet=""
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-emerald-800">{hotel_name}</h1>
            <div className="my-3">
              <p>
                <span className="font-semibold">Address :</span> {hotel_address}
              </p>
              <p>
                <span className="font-semibold">Mobile :</span> {hotel_phone}
              </p>
              <p>
                <span className="font-semibold">Email :</span> {hotel_email}
              </p>
              <p>
                <span className="font-semibold">Webite :</span> {hotel_website}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* .................................BasicPayrollInformation...................................... */}
      <div>
        <div className="flex justify-center ">
          <h1 className="border border-emerald-800 text-center my-5 w-[7rem] rounded-lg font-semibold text-base py-1">
            Payroll
          </h1>
        </div>
        <div className="flex justify-between items-center px-6 ">
          <div>
            <div className="flex py-2">
              <span className="font-semibold  w-[7rem]">Employee Name </span>
              <span className="w-[1rem] "> : </span>
              <p>{employee_name}</p>
            </div>
            <div className="flex pb-2">
              <span className="font-semibold  w-[7rem]">Designation </span>
              <span className="w-[1rem] "> : </span>
              <p>{designation}</p>
            </div>
            <div className="flex pb-2">
              <span className="font-semibold  w-[7rem]">Cell </span>
              <span className="w-[1rem] "> : </span>
              <p>{employee_phone}</p>
            </div>
          </div>
          <div className="space-y-1">
            {/* <div className="flex">
            <span className="font-semibold  w-[7rem]">Invoice Date </span>
            <span className="w-[1rem] "> : </span>
            <p>{moment(created_at).format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div> */}
            <div className="flex">
              <span className="font-semibold  w-[7rem]">Voucher No</span>
              <span className="w-[1rem] "> : </span>
              <p>{voucher_no}</p>
            </div>
          </div>
        </div>
      </div>
      {/* .................................PayrollBillingInformation...................................... */}
      <div className="px-6 pt-5 ">
        <table className="table-auto border border-collapse border-gray-500 w-full">
          <thead className="bg-[#E3E9EB]">
            <tr>
              <th className="border ps-2 py-1 text-left text-xs">
                Salary Date
              </th>
              <th className="border ps-2 py-1 text-left text-xs">Pay Method</th>
              <th className="border ps-5 py-1 text-left text-xs">
                Account Name
              </th>
              <th className="border ps-5 py-1 text-left text-xs">
                Base Salary
              </th>
              <th className="border ps-5 py-1 text-left text-xs">
                Attendance Days
              </th>
              <th className="border ps-5 py-1 text-left text-xs">
                Gross Salary
              </th>
              <th className="border ps-5 py-1 text-left text-xs">
                Total Salary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-5 py-1">{salary_date}</td>
              <td className="border px-5 py-1">{pay_method}</td>
              <td className="border px-5 py-1">{account_name}</td>
              <td className="border px-5 py-1">{base_salary}</td>
              <td className="border px-5 py-1">{attendance_days}</td>
              <td className="border px-5 py-1">{gross_salary}</td>
              <td className="border px-5 py-1">{total_salary}</td>
            </tr>
          </tbody>
        </table>

        {/* <Table
          columns={[...billingItemsListColumns]}
          dataSource={
            invoice_items && invoice_items.length > 0 ? invoice_items : []
          }
          key={"id"}
          rowKey="id"
          bordered
          size="small"
          pagination={false}
        /> */}
        <div className="float-right w-[25rem] mt-20 ">
          <div>
            <table className=" divide-y divide-gray-200 table-auto border border-collapse border-gray-500 items-left">
              <thead className="bg-[#E3E9EB]">
                <tr>
                  <th className="border ps-5 py-1 text-left text-xs">SL</th>
                  <th className="border ps-5 py-1 text-left text-xs">
                    Category
                  </th>
                  <th className="border ps-5 py-1 text-left text-xs">Amount</th>
                  <th className="border ps-5 py-1 text-left text-xs">Cut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs">1</td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    Gross Salary
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {gross_salary}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">2</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Mobile Bill{" "}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {mobile_bill}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">3</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Feed Allowance
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {feed_allowance}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">4</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Perform Bonus
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {perform_bonus}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">5</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Festival Bonus
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {festival_bonus}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">6</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Travel Allowance
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {travel_allowance}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">7</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Health Allowance
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {health_allowance}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">8</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">Incentive</td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {incentive}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">9</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    House Rent
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {house_rent}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">10</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Other Amount
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {totalOtherAmount}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>

                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">11</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Deduction Amount
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {totalDeduction}
                  </td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">12</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Advance Salary
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {advance_salary}
                  </td>
                </tr>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs ">13</td>
                  <td className="border py-2 ps-4 pe-10 text-xs ">
                    Provident Fund
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {provident_fund}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    Net Total (Amount - Cut):
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs">
                    {total_salary}
                  </td>
                  <td className="border py-2 ps-4 pe-10 text-xs"></td>
                </tr>
              </tbody>
            </table>

            {/* <table className="table-auto border border-collapse border-gray-500 items-left">
            <tbody>
              <tr>
                <td className="border py-2 ps-4 pe-10 ">Sub Total</td>
                <td className="border py-2 ps-4 pe-10">{sub_total}</td>
              </tr>
              <tr>
                <td className="border py-2 ps-4 pe-10 ">Discount Amount</td>
                <td className="border py-2 ps-4 pe-10">{discount_amount}</td>
              </tr>

              <tr>
                <td className="border py-2 ps-4 pe-10 ">Tax Amount </td>
                <td className="border py-2 ps-4 pe-10">{tax_amount}</td>
              </tr>
              <tr>
                <td className="border py-2 ps-4 pe-10 ">Grand Total </td>
                <td className="border py-2 ps-4 pe-10">{grand_total}</td>
              </tr>
              <tr>
                <td className="border py-2 ps-4 pe-10 ">Paid </td>
                <td className="border py-2 ps-4 pe-10">{grand_total - due}</td>
              </tr>
              <tr>
                <td className="border py-2 ps-4 pe-10 text-red-400 font-semibold ">
                  Due{" "}
                </td>
                <td className="border py-2 ps-4 pe-10">{due}</td>
              </tr>
            </tbody>
          </table> */}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 mb-5 px-6 w-full">
        <div className="flex justify-between items-center ">
          <div>
            <h1 className="border-dashed  border-slate-400 border-t-2">
              client
            </h1>
          </div>
          <div>
            <p className="text-xs">{moment().format("YYYY-MM-DD HH:mm:ss")}</p>
          </div>
          <div>
            <h1 className="border-dashed  border-slate-400 border-t-2">
              Authority
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsivePayrollInvoice;
