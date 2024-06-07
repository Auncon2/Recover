import { Card, Divider } from "antd";

import dayjs from "dayjs";

const YourSelection = ({ total, totalV2, numberOfNights }: any) => {
  return (
    <>
      <Card
        title={
          <span className="text-base text-emerald-800 font-bold">
            Your Selection
          </span>
        }
        className="w-[500px] 2xl:w-[700px] mb-[500px] mt-[50px] overflow-hidden hidden xl:block text-xs xl:text-base"
      >
        <div className="flex justify-between text-sm 2xl:text-base">
          <span className="text-emerald-600 font-bold">Check-In</span>
          <span className="text-emerald-600 font-bold">------------</span>
          <span className="text-emerald-600 font-bold text-sm 2xl:text-base">
            Check-Out
          </span>
        </div>

        <div className="flex justify-between text-sm 2xl:text-base">
          <span className="text-base">
            {totalV2?.check_in_time &&
              dayjs(totalV2?.check_in_time).format("DD-MM-YYYY (hh:mm a)")}
          </span>
          <span className="text-sm 2xl:text-base">
            {totalV2?.check_out_time &&
              dayjs(totalV2?.check_out_time).format("DD-MM-YYYY (hh:mm a)")}
          </span>
        </div>

        <div className="grid gap-5 mt-5 text-sm 2xl:text-base">
          <div className="flex justify-between items-baseline ">
            <span className="font-bold">Guest Name</span>
            <span className="font-bold"></span>

            <span>{totalV2?.name ? totalV2?.name : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline ">
            <span className=" font-bold">E-mail</span>
            <span className="font-bold"></span>

            <span>{totalV2?.email ? totalV2?.email : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline ">
            <span className=" font-bold  ">Phone No.</span>
            <span className="font-bold"></span>
            <span>{totalV2?.phone ? totalV2?.phone : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline ">
            <span className=" font-bold  ">NID No.</span>

            <span>{totalV2?.nid ? totalV2?.nid : "-"}</span>
          </div>
          <div className="flex justify-between items-baseline text-sm 2xl:text-base">
            <span className=" font-bold">Passport No. / Iqama No.</span>

            <span>{totalV2?.passport ? totalV2?.passport : "-"}</span>
          </div>

          <div className="flex justify-between items-baseline text-sm 2xl:text-base">
            <span className=" font-bold text-sm 2xl:text-base">
              Total no of guests
            </span>
            <span className="font-bold"></span>
            <span className="">
              <span>
                {totalV2?.inputOccupancy ? totalV2?.inputOccupancy : "-"}
              </span>
            </span>
          </div>
        </div>
        <Divider />
        <div className="mt-10">
          <div className="flex justify-center text-base font-bold mb-5">
            {total?.allSelectedRooms && total?.allSelectedRooms.length <= 1 ? (
              <span>Selected Room</span>
            ) : (
              <span>List Of Selected Rooms</span>
            )}
          </div>

          {total?.allSelectedRooms &&
            total?.allSelectedRooms?.map((value: any, index: number) => (
              <div
                className="grid gap-5 mt-5 border-b-2 border-dotted border-slate-300 pb-4"
                key={index}
              >
                <div className="flex flex-col gap-1">
                  {/* <span className="text-base font-bold">{index + 1} Room</span> */}
                  <div className="flex gap-2 items-baseline text-sm 2xl:text-base">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold ">
                        {index + 1} &#41;
                      </span>
                      <span className="text-base font-bold">
                        {value?.room_type && value?.room_type}
                      </span>
                    </div>

                    <span className="font-bold">-</span>
                    <span className="text-base font-bold text-slate-500">
                      &#40;{value?.room_number}&#41;
                    </span>
                  </div>
                  <span className="text-slate-600 font-semibold ml-3 text-sm 2xl:text-base">
                    {value?.bed_type}
                  </span>
                  <span className="text-slate-600 font-semibold ml-3 text-sm 2xl:text-base">
                    Max {value?.adult} Adluts | {value?.child} child Per Room
                  </span>
                  <span className="text-slate-600 font-semibold ml-3 text-sm 2xl:text-base">
                    {value?.rate_per_night
                      ? `Rate per night : ${value?.rate_per_night}`
                      : ""}
                  </span>
                  <span className="text-slate-600 font-semibold ml-3 text-sm 2xl:text-base">
                    {value?.discout_amount
                      ? `Room discount : ${value?.discout_amount}`
                      : ""}
                  </span>
                </div>
              </div>
            ))}

          <div className="grid gap-2 mt-5 border-b-2 border-slate-400 pb-2 text-sm 2xl:text-base">
            <div className="flex justify-between font-semibold text-blue-600">
              <span className="font-semibold">Total no. of Adult</span>
              <span>{total?.totalAdults}</span>
            </div>
            <div className="flex justify-between font-semibold text-yellow-600">
              <span className="font-semibold">Total no. of Child</span>
              <span>+ {total?.totalChildren}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-fuchsia-500 mt-2 text-sm 2xl:text-base">
            <span className="font-semibold text-sm 2xl:text-base">
              Total no. of Room Capacity
            </span>
            <span>{total?.totalOccupancy}</span>
          </div>
          <div className="flex justify-between mt-2 text-sm 2xl:text-base">
            <span className="font-semibold">Total no. of Rooms</span>

            <span>
              {total?.allSelectedRooms ? total?.allSelectedRooms.length : 0}
            </span>
          </div>

          <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
            <span className="font-semibold">Payment Mode</span>
            {totalV2?.modeOfPayment === 0 ||
            totalV2?.modeOfPayment === 2 ||
            totalV2?.modeOfPayment === 1 ? (
              <>
                {totalV2?.modeOfPayment === 0 && <span>Partial Payment</span>}
                {totalV2?.modeOfPayment === 2 && <span>Full Payment</span>}
                {totalV2?.modeOfPayment === 1 && <span>No Payment</span>}
              </>
            ) : (
              "Select Payment Mode"
            )}
          </div>

          {(totalV2?.check_in_time &&
            totalV2?.check_out_time &&
            totalV2?.modeOfPayment === 0) ||
          totalV2?.modeOfPayment === 2 ||
          totalV2?.modeOfPayment === 1 ? (
            <>
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
                <span className="font-semibold">Extra Charge</span>
                <span>+{totalV2?.extraCharge ? totalV2?.extraCharge : 0}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
                <span className="font-semibold">Tax Amount</span>
                <span>+{totalV2?.tax ? totalV2?.tax : 0}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
                <span className="font-semibold">Discount Amount</span>

                <span>+{totalV2?.discount ? totalV2?.discount : 0}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 border-b-2 pb-2 text-sm 2xl:text-base">
                <span className="font-semibold">
                  Total Cost
                  {numberOfNights === 1 || numberOfNights === 0
                    ? ` for 1 day`
                    : ` for ${numberOfNights} days`}
                </span>
                <span>
                  +{total?.totalRoomCharge ? total?.totalRoomCharge : 0}
                </span>
              </div>
            </>
          ) : (
            <div className="font-semibold mt-2 text-sm 2xl:text-base">
              Select <strong> Check in & Check out date and time </strong> and
              select
              <strong> Mode of Payment</strong> to see total cost
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default YourSelection;
