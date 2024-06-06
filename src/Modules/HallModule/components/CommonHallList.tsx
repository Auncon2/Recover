import { Card, Tag, Tooltip } from "antd";
import dayjs from "dayjs";

import { Link } from "react-router-dom";

const CommonHallList = ({ data, filterValue }: any) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4 mt-4 text-xs lg:text-base">
        {data?.data.map((item: any, index: number) => (
          <Card
            style={
              // item?.available_status === 0
              //   ? { backgroundColor: "#4a4747", color: "white" }
              //   : {
              //       backgroundColor: "#076262",
              //       color: "white",
              //     }
              item?.available_status === 0
                ? item?.check_in_out_status === "checked-in"
                  ? {
                      backgroundImage:
                        "linear-gradient(#800033,#b30047,#e6005c)", //red for checked-in
                      color: "white",
                    }
                  : item?.no_payment === 1 || item?.partial_payment === 1
                  ? {
                      // backgroundColor: "#4a4747",
                      backgroundImage:
                        "linear-gradient(#808000,#999900,#b3b300,#b3b300)", //yellow for no or partial payment
                      color: "white",
                    }
                  : {
                      backgroundImage:
                        "linear-gradient(#000099,#0000ff,#3333ff)", //blue for full payment
                      color: "white",
                    }
                : {
                    backgroundImage:
                      "linear-gradient(#00997a,#00b38f,#00cca3,#00e6b8)", // green for when room is available
                    // backgroundImage:
                    //   "linear-gradient(#003C43,#135D66,#41918c)",
                    // backgroundColor: "#076262",
                    color: "white",
                  }
            }
            key={index}
          >
            <div className="grid gap-3 text-xs lg:text-base xl:text-xs ">
              <div className="flex justify-between">
                <span>Hall Name</span>
                <span>{item?.hall_name || "N/A"}</span>
              </div>

              <Tag
                color={
                  // item?.available_status === 0
                  //   ? "#7e7d7d"
                  //   : "rgb(33 117 117)"
                  item?.available_status === 0
                    ? item?.check_in_out_status === "checked-in"
                      ? "#800033" //          red checked in
                      : item?.no_payment === 1 || item?.partial_payment === 1
                      ? "#4d4d00" //         yellow for booked and partially paid/unpaid
                      : "#001f4d" //    blue for bookedand fullypaid
                    : "rgb(33 117 117)" //green for available
                }
                style={{
                  // marginRight: "-10px",
                  textAlign:
                    item?.check_in_out_status === "checked-in" ||
                    item?.available_status !== 0
                      ? "center"
                      : "left",
                  width: "100%",
                  padding: "2px",
                  paddingLeft: "10px",
                }}
              >
                {/* {item?.available_status === 0 ? "Unavailable" : "Available"} */}
                {item?.available_status === 0 ? (
                  item?.check_in_out_status === "checked-in" ? (
                    "Checked In"
                  ) : item?.no_payment === 1 || item?.partial_payment === 1 ? (
                    <span>
                      {/* This is a booked <br></br> */}
                      {item?.partial_payment === 1 && "Partially paid"}
                      {item?.no_payment === 1 && "Unpaid"}
                    </span>
                  ) : (
                    <span>
                      This is a booked <br></br>and fullypaid
                    </span>
                  )
                ) : (
                  "Available"
                )}
              </Tag>

              <div className="flex justify-between">
                <Link
                  to={`/hall-details/${item?.hall_id}`}
                  className={
                    item?.available_status === 0
                      ? "flex text-center text-orange-200 font-bold underline"
                      : "flex text-center text-white font-bold underline"
                  }
                  // target="_blank"
                >
                  <span className="hidden xl:block">More Details...</span>
                  <span className="block xl:hidden">Details...</span>
                </Link>
                {item?.available_status === 1 ? (
                  <Link
                    to={`/create-hall-booking/${item?.hall_id}/${filterValue?.event_date}/${filterValue?.start_time}/${filterValue?.end_time}`}
                    className="flex text-center text-white font-bold"
                  >
                    <span>Book Now</span>
                  </Link>
                ) : (
                  <Tooltip
                    placement="top"
                    title={
                      <div className="grid gap-2 text-xs lg:text-base xl:text-xs">
                        <div className="flex justify-between">
                          <span>Guest Name</span>
                          <span>
                            {item?.guest_name ? item?.guest_name : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guest Email</span>
                          <span>
                            {item?.guest_email ? item?.guest_email : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guest Phone</span>
                          <span>
                            {item?.guest_phone ? item?.guest_phone : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Start Time</span>

                          <span>
                            {item?.start_time
                              ? dayjs(item?.start_time, "HH:mm:ss").format(
                                  "hh:mm A"
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>End Time</span>
                          <span>
                            {item?.end_time
                              ? dayjs(item?.end_time, "HH:mm:ss").format(
                                  "hh:mm A"
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Event Date</span>
                          <span>
                            {item?.end_time
                              ? dayjs(item?.event_date).format("DD-MM-YYYY")
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Grand Total</span>
                          <span>
                            {item?.grand_total ? item?.grand_total : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Due Amount</span>
                          <span>
                            {item?.due_amount ? item?.due_amount : "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guest Last Balance</span>
                          <span>
                            {item?.user_last_balance
                              ? item?.user_last_balance
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    }
                  >
                    <span>Guest Info</span>
                  </Tooltip>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CommonHallList;
