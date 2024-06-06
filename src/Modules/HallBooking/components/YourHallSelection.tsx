import { Card, Divider } from "antd";
import dayjs from "dayjs";

const YourHallSelection = ({
  start_date,
  end_time,
  bookList,
  form,
  roomHistoryList,
  sum,
  differenceInHours,
  tax_amount,
  discount_amount,
  updatedHallBooking,
  totalCapacity,
}: // roomId,
any) => {
  return (
    <>
      <Card
        title={
          <span className="text-base text-emerald-800 font-bold">
            Your Selection
          </span>
        }
        className="w-[500px] 2xl:w-[700px] mb-[500px] mt-[50px] overflow-hidden"
      >
        <div className="w-full flex justify-between items-center">
          <div className="grid justify-center">
            <span className="text-emerald-600 font-bold">Check-In</span>
            <span className="text-base">
              {start_date && dayjs(start_date).format("hh:mm a")}
            </span>
          </div>
          <span className="text-emerald-600 font-bold">------------</span>
          <div className="grid ">
            <span className="text-emerald-600 font-bold">Check-Out</span>
            <span className="text-base">
              {end_time && dayjs(end_time).format("hh:mm a")}
            </span>
          </div>
        </div>
        <div className="grid gap-5 mt-5">
          <div className="flex justify-between items-baseline">
            <span className="font-bold">Guest Name</span>
            <span className="font-bold"></span>
            <span className="">{bookList?.name ? bookList?.name : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className=" font-bold">E-mail</span>
            <span className="font-bold"></span>
            <span className=" ">{bookList?.email ? bookList?.email : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Phone</span>
            <span className="font-bold"></span>
            <span className=" ">{bookList?.phone ? bookList?.phone : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Booking Date</span>
            <span className="font-bold"></span>
            <span className="">
              {bookList?.booking_date
                ? dayjs(bookList?.booking_date).format("DD-MM-YYYY")
                : "-"}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Event Date</span>
            <span className="font-bold"></span>
            <span className="">
              <span className="">
                {bookList?.event_date
                  ? dayjs(bookList?.event_date).format("DD-MM-YYYY")
                  : "-"}
              </span>
            </span>
          </div>

          {form.getFieldValue("payment_method") === "0" ? (
            <>
              <div className="flex justify-between items-baseline">
                <span className=" font-bold">Discount Amount</span>
                <span className="font-bold"></span>
                <span className="">
                  {bookList?.discount_amount ? bookList?.discount_amount : 0}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-base font-bold">Tax Amount</span>
                <span className="font-bold"></span>
                <span className=" ">
                  {bookList?.tax_amount ? bookList?.tax_amount : 0}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className=" font-bold">Paid Amount</span>
                <span className="font-bold"></span>
                <span className=" ">
                  {bookList?.paid_amount ? bookList?.paid_amount : 0}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className=" font-bold">Payment Type</span>
                <span className="font-bold"></span>
                <span className=" ">
                  {bookList?.payment_type ? bookList?.payment_type : "-"}
                </span>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Total no of guests</span>
            <span className="font-bold"></span>
            <span className="">
              {bookList?.total_occupancy ? bookList?.total_occupancy : 0}
            </span>
          </div>
        </div>
        <Divider />
        <div className="mt-10">
          <div className="flex justify-center text-base font-bold mb-5">
            {roomHistoryList.length === 1 || roomHistoryList.length === 0 ? (
              <span>Selected Hall</span>
            ) : (
              <span>List Of Selected Halls</span>
            )}
          </div>
          {roomHistoryList.length > 0 ? (
            <>
              {roomHistoryList?.map((value: any, index: number) => (
                <div
                  className="grid gap-5 mt-5 border-b-2 border-dotted border-slate-300 pb-4"
                  key={index}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-baseline">
                      <span className="text-base font-bold">
                        {index + 1} {value.hall_name}
                      </span>
                    </div>

                    <span className="text-slate-600 font-semibold ml-3">
                      Max capacity {value.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {updatedHallBooking?.map((value: any, index: number) => (
                <div
                  className="grid gap-5 mt-5 border-b-2 border-dotted border-slate-300 pb-4"
                  key={index}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-baseline">
                      <span className="text-base font-bold">
                        {index + 1} {value.hall_name}
                      </span>
                    </div>

                    <span className="text-slate-600 font-semibold ml-3">
                      Max capacity {value.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </>
          )}
          {/* <div
            className={`flex justify-between font-semibold text-fuchsia-500 mt-2 ${
              bookList?.total_occupancy > sum?.totalGuest ? "animate-pulse" : ""
            }`}
          ></div> */}
          <div className="flex justify-between mt-2">
            <span className="font-semibold">Total no. of Halls</span>

            <span>{roomHistoryList > 0 ? roomHistoryList.length : 1}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span className="font-semibold">Total Hall Capacity</span>
            <span>
              {sum?.totalCapacity ? sum?.totalCapacity : totalCapacity}
              People
            </span>
          </div>

          <div className="flex justify-between font-semibold mt-2">
            <span className="font-semibold">Total Booking Time </span>
            <span>{differenceInHours} Hr</span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-b">
            <span className="font-semibold">Total Hall Cost </span>
            <span>
              {sum?.totalHallCost ? sum?.totalHallCost.toLocaleString() : 0}
            </span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-b">
            <span className="font-semibold">Extra Charge</span>
            <span>
              +
              {bookList?.extra_charge
                ? bookList?.extra_charge.toLocaleString()
                : 0}
            </span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-b">
            <span className="font-semibold">Tax Amount</span>
            <span>+{tax_amount ? tax_amount.toLocaleString() : 0}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2">
            <span className="font-semibold">Discount Amount</span>
            <span>
              -{discount_amount ? discount_amount.toLocaleString() : 0}
            </span>
          </div>
          <div className="flex justify-between font-semibold mt-2 ">
            <span className="font-semibold">Total Cost </span>
            <span>
              {(
                (sum?.totalPriceCost ?? 0) + (bookList?.totalPriceCost ?? 0)
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default YourHallSelection;
