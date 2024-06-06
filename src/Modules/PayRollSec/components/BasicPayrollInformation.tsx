const BasicPayrollInformation = ({ data }: any) => {
  const { employee_name, employee_phone, designation, voucher_no } =
    data?.data || {};

  return (
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
  );
};

export default BasicPayrollInformation;
