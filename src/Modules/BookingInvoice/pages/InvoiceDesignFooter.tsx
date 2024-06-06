import moment from "moment";

const InvoiceDesignFooter = () => {
  return (
    <div>
      {/* <div className="w-[8rem] ml-auto ">
        <img src={`../../../../public/signature.png`} alt="" />
      </div> */}
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="border-dashed  border-slate-400 border-t-2">client</h1>
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
  );
};

export default InvoiceDesignFooter;
