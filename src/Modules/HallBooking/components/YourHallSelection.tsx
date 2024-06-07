import { Card, Divider } from "antd";
import dayjs from "dayjs";

const YourHallSelection = ({
  total,
  totalV2,
  start_date,
  end_time,
  differenceInHours,
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
            <span className="">{totalV2?.name ? totalV2?.name : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className=" font-bold">E-mail</span>
            <span className="font-bold"></span>
            <span className=" ">{totalV2?.email ? totalV2?.email : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Phone</span>
            <span className="font-bold"></span>
            <span className=" ">{totalV2?.phone ? totalV2?.phone : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Booking Date</span>
            <span className="font-bold"></span>
            <span className="">
              {totalV2?.booking_date
                ? dayjs(totalV2?.booking_date).format("DD-MM-YYYY")
                : "-"}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Event Date</span>
            <span className="font-bold"></span>
            <span className="">
              <span className="">
                {totalV2?.event_date
                  ? dayjs(totalV2?.event_date).format("DD-MM-YYYY")
                  : "-"}
              </span>
            </span>
          </div>

          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Discount Amount</span>
            <span className="font-bold"></span>
            <span className="">
              {totalV2?.discount ? totalV2?.discount : 0}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-base font-bold">Tax Amount</span>
            <span className="font-bold"></span>
            <span className=" ">{totalV2?.tax ? totalV2?.tax : 0}</span>
          </div>
          {/* <div className="flex justify-between items-baseline">
                <span className=" font-bold">Paid Amount</span>
                <span className="font-bold"></span>
                <span className=" ">
                {totalV2?.tax ? totalV2?.tax : 0}
                </span>
              </div> */}
          {/* <div className="flex justify-between items-baseline">
            <span className=" font-bold">Payment Type</span>
            <span className="font-bold"></span>
            <span className=" ">
              {bookList?.payment_type ? bookList?.payment_type : "-"}
            </span>
          </div> */}

          <div className="flex justify-between items-baseline">
            <span className=" font-bold">Total no of guests</span>
            <span className="font-bold"></span>
            <span className="">
              {total?.totalCapacity ? total?.totalCapacity : 0}
            </span>
          </div>
        </div>
        <Divider />
        <div className="mt-10">
          <div className="flex justify-center text-base font-bold mb-5">
            {total?.allSelectedHalls && total?.allSelectedHalls.length <= 1 ? (
              <span>Selected Hall</span>
            ) : (
              <span>List Of Selected Halls</span>
            )}
          </div>

          {total?.allSelectedHalls?.map((value: any, index: number) => (
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

          <div className="flex justify-between mt-2">
            <span className="font-semibold">Total no. of Halls</span>

            <span>
              {total?.allSelectedHalls ? total?.allSelectedHalls.length : 0}
            </span>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span className="font-semibold">Total Hall Capacity</span>
            <span>
              {total?.totalCapacity ? total?.totalCapacity : 0}
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
              {total?.totalSelectedRoomCharge
                ? total?.totalSelectedRoomCharge.toLocaleString()
                : 0}
            </span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-b">
            <span className="font-semibold">Extra Charge</span>
            <span>
              +
              {totalV2?.extraCharge
                ? totalV2?.extraCharge?.toLocaleString()
                : 0}
            </span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-b">
            <span className="font-semibold">Tax Amount</span>
            <span>+ {totalV2?.tax ? totalV2?.tax?.toLocaleString() : 0}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2">
            <span className="font-semibold">Discount Amount</span>
            <span>
              - {totalV2?.discount ? totalV2?.discount?.toLocaleString() : 0}
            </span>
          </div>
          <div className="flex justify-between font-semibold mt-2 ">
            <span className="font-semibold">Total Cost </span>
            <span>
              {total?.totalHallCharge
                ? total?.totalHallCharge?.toLocaleString()
                : 0}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default YourHallSelection;
