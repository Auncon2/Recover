import moment from "moment";
import { imageURL } from "../../app/slice/baseQuery";
import { useGetSingleHotelQuery } from "../../Modules/Settings/api/SettingsEndPoints";

const InvoiceForPrint = ({ data, cashiercomponentRef, copy }: any) => {
  const {
    // hotel_address,
    // hotel_email,
    // hotel_phone,
    // hotel_website,
    // hotel_logo,
    invoice_no,
    user_name,
    created_at,
    invoice_items,
    sub_total,
    discount_amount,
    due,
    tax_amount,
    grand_total,
  } = data?.data || {};
  const { data: hotelProfile } = useGetSingleHotelQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <div className=" hidden">
      <div
        style={{
          width: "9in",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
          border: "1px solid lightgray",
          height: "11.69in",
          color: "black",
        }}
      >
        <div
          // className="border mx-auto relative"
          // style={{ width: "794px", height: "1123px" }}
          ref={cashiercomponentRef}
          style={{
            padding: "0.2in",
            width: "8.27in",
            minHeight: "11.69in",
            position: "relative",
            color: "black",
          }}
        >
          <div>
            {/* ...........................Invoice Header......................................... */}
            <div className="flex justify-between items-center">
              <div className="w-[200px] ">
                <img
                  src={imageURL + hotelProfile?.data?.logo}
                  draggable="false"
                  alt=""
                  srcSet=""
                />
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
                  <h1 className="text-xl font-bold text-emerald-800">
                    Reservation
                  </h1>
                  <div className="my-3">
                    <p>
                      <span className="font-semibold">Address :</span>{" "}
                      {hotelProfile?.data?.address}
                    </p>
                    <p>
                      <span className="font-semibold">Mobile :</span>{" "}
                      {hotelProfile?.data?.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Email :</span>{" "}
                      {hotelProfile?.data?.email}
                    </p>
                    <p>
                      <span className="font-semibold">Webite :</span>{" "}
                      {hotelProfile?.data?.website}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* ........................Basic Invoice Information........................................... */}
            <div>
              <div className="flex justify-center ">
                <h1 className="border border-emerald-800 text-center my-5  rounded-lg font-semibold text-base p-1">
                  Invoice ({copy})
                </h1>
              </div>
              <div className="flex justify-between items-center px-6 py-4">
                <div>
                  <h1 className="text-base font-semibold">Invoice To :</h1>
                  <div className="flex py-2">
                    <span className="font-semibold  w-[7rem]">
                      Customer Name{" "}
                    </span>
                    <span className="w-[1rem] "> : </span>
                    <p>{user_name}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex">
                    <span className="font-semibold  w-[7rem]">
                      Invoice Date{" "}
                    </span>
                    <span className="w-[1rem] "> : </span>
                    <p>
                      {moment(created_at).format("MMMM Do YYYY, h:mm:ss a")}
                    </p>
                  </div>
                  <div className="flex">
                    <span className="font-semibold  w-[7rem]">Invoice No </span>
                    <span className="w-[1rem] "> : </span>
                    <p>{invoice_no}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* ..........................Invoice billing information........................................... */}
            <div className="px-6">
              <h1 className="text-base font-semibold mb-5">
                Billing Information :
              </h1>

              <table className="table-auto border border-collapse border-gray-500 w-full">
                <thead className="bg-[#E3E9EB]">
                  <tr>
                    <th className="border ps-5 py-1 text-left">
                      {invoice_items?.[0]?.invoice_item_id
                        ? "Item ID"
                        : invoice_items?.[0]?.room_id
                        ? "Room ID"
                        : "Hall ID"}
                    </th>
                    <th className="border ps-5 py-1 text-left">
                      {invoice_items?.[0]?.invoice_item_id
                        ? "Item Name"
                        : invoice_items?.[0]?.room_id
                        ? "Room Name"
                        : "Hall Name"}
                    </th>
                    <th className="border ps-5 py-1 text-left">Quantity</th>
                    <th className="border ps-5 py-1 text-left">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice_items?.map((item: any) => (
                    <tr
                      // key={item.invoice_item_id}
                      key={
                        item.invoice_item_id
                          ? item.invoice_item_id
                          : item.room_id
                          ? item.room_id
                          : item.hall_id
                      }
                    >
                      <td className="border px-5 py-1">
                        {item.invoice_item_id
                          ? item.invoice_item_id
                          : item.room_id
                          ? item.room_id
                          : item.hall_id}
                      </td>
                      <td className="border px-5 py-1">
                        {item.invoice_item_name
                          ? item.invoice_item_name
                          : item.name}
                      </td>
                      <td className="border px-5 py-1">{item.quantity}</td>
                      <td className="border px-5 py-1">{item.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center my-5 ">
                <div className="mx-auto">
                  <div>
                    {parseFloat(due) > 0 ? (
                      <div className="border-4 p-2 border-red-200 -rotate-45">
                        <h1 className="border-4 border-red-200 p-5 text-5xl font-bold text-red-400 ">
                          Due
                        </h1>
                      </div>
                    ) : (
                      <div className="border-4 p-2 border-green-200 -rotate-45">
                        <h1 className="border-4 border-green-200 p-5 text-5xl font-bold text-green-500">
                          Paid
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <table className="table-auto border border-collapse border-gray-500 ">
                    <tbody>
                      <tr>
                        <td className="border py-2 ps-4 pe-10 ">Sub Total</td>
                        <td className="border py-2 ps-4 pe-10">{sub_total}</td>
                      </tr>

                      <tr>
                        <td className="border py-2 ps-4 pe-10 ">Tax Amount </td>
                        <td className="border py-2 ps-4 pe-10">{tax_amount}</td>
                      </tr>
                      <tr>
                        <td className="border py-2 ps-4 pe-10 ">
                          Extra Amount{" "}
                        </td>
                        <td className="border py-2 ps-4 pe-10">
                          {Number(grand_total) -
                          (Number(sub_total) +
                            Number(tax_amount) -
                            Number(discount_amount))
                            ? Number(grand_total) -
                              (Number(sub_total) +
                                Number(tax_amount) -
                                Number(discount_amount))
                            : "0.00"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border py-2 ps-4 pe-10 ">
                          Discount Amount
                        </td>
                        <td className="border py-2 ps-4 pe-10">
                          {discount_amount}
                        </td>
                      </tr>
                      <tr>
                        <td className="border py-2 ps-4 pe-10 ">
                          Grand Total{" "}
                        </td>
                        <td className="border py-2 ps-4 pe-10">
                          {grand_total}
                        </td>
                      </tr>
                      <tr>
                        <td className="border py-2 ps-4 pe-10 ">Paid </td>
                        <td className="border py-2 ps-4 pe-10">
                          {grand_total - due}
                        </td>
                      </tr>
                      <tr>
                        <td className="border py-2 ps-4 pe-10 text-red-400 font-semibold ">
                          Due{" "}
                        </td>
                        <td className="border py-2 ps-4 pe-10">{due}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* ..............................Invoice Footer...................................................... */}
          <div className="absolute bottom-0 mb-5 px-6 w-full">
            <div>
              <div className="flex justify-between items-center ">
                <div>
                  <h1 className="border-dashed  border-slate-400 border-t-2">
                    client
                  </h1>
                </div>
                <div>
                  <p className="text-xs">
                    {moment().format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                </div>
                <div>
                  <h1 className="border-dashed  border-slate-400 border-t-2">
                    Authority
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForPrint;
