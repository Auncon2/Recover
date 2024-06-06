import { Card, Modal, Tag } from "antd";
import { useState } from "react";

import { FaMoneyBillWave } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

import SingleRoomsModal from "./SingleRoomsModal";

const RoomBookingDetails = ({ roomHistoryList, updatedBookingRooms }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedUpdatedRoomId, setSelectedUpdatedRoomId] = useState<
    string | null
  >(null);

  const showModal = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };
  const showUpdatedModal = (roomId: string) => {
    setSelectedUpdatedRoomId(roomId);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setSelectedRoomId(null);
    setSelectedUpdatedRoomId(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedRoomId(null);
    setSelectedUpdatedRoomId(null);
    setIsModalOpen(false);
  };
  return (
    <div>
      {roomHistoryList.length > 0 ? (
        <>
          {roomHistoryList?.map((value: any, index: number) => (
            <Card
              className="w-[330px] h-[150px] grid gap-5 ml-1 pb-4 mt-[29px] hover:cursor-pointer"
              key={index}
              onClick={() => showModal(value?.id)}
            >
              <div className="flex flex-col gap-1">
                {/* <Link to={`/room_detail/${value.id}`} target="_blank"> */}
                <div className="flex gap-2 items-baseline text-base font-bold">
                  <span>{value?.room_type}</span>
                  <span>-</span>
                  <span>{value?.bed_type.slice(0, 15)}</span>
                </div>
                {/* </Link> */}
                {/* <Link to={`/room_detail/${value.id}`} target="_blank"> */}
                <div className="flex gap-2 items-center text-base font-bold">
                  <span>
                    <MdPeopleAlt />
                  </span>
                  <span className="font-semibold">
                    Max {value?.adult} Adluts | {value?.child} child Per Room
                  </span>
                </div>
                {/* </Link> */}
                {/* <Link to={`/room_detail/${value.id}`} target="_blank"> */}
                <div className="flex items-center gap-2 text-base font-bold">
                  <span>
                    <FaMoneyBillWave />
                  </span>
                  <span>Rate Per Night</span>
                  <span className="font-bold">-</span>
                  <span className=" text-slate-500">
                    {value?.rate_per_night?.toLocaleString()}
                  </span>
                  {/* <span className="text-slate-600 text-sm font-semibold ">
                                    {value.discout_amount
                                      ? `Room discount : ${value.discout_amount}`
                                      : ""}
                                  </span> */}
                </div>
                {/* </Link> */}
                <div className="flex gap-2 text-base font-bold">
                  <span>
                    {value?.refundable === 1 ? (
                      <Tag color="green">Refundable</Tag>
                    ) : (
                      <Tag color="red">Non-refundable</Tag>
                    )}
                  </span>
                  {/* <span className="font-bold">
                                        {value.availability === 1 ? (
                                          <Tag color="green">
                                            Room Available
                                          </Tag>
                                        ) : (
                                          <Tag color="red">
                                            Room Unavailable
                                          </Tag>
                                        )}
                                      </span> */}
                </div>
              </div>
            </Card>
          ))}
        </>
      ) : (
        <>
          {updatedBookingRooms?.map((value: any, index: number) => (
            <Card
              className="w-[330px] h-[150px] grid gap-5 ml-1 pb-4 mt-[29px] hover:cursor-pointer"
              key={index}
              onClick={() => showUpdatedModal(value.id)}
            >
              <div className="flex flex-col gap-1">
                {/* <Link to={`/room_detail/${value.id}`} target="_blank"> */}
                <div className="flex gap-2 items-baseline text-base font-bold">
                  <span>{value?.room_type}</span>
                  <span>-</span>
                  <span>{value?.bed_type.slice(0, 15)}</span>
                </div>
                {/* </Link> */}
                {/* <Link to={`/room_detail/${value.id}`} target="_blank"> */}
                <div className="flex gap-2 items-center text-base font-bold">
                  <span>
                    <MdPeopleAlt />
                  </span>
                  <span className="font-semibold">
                    Max {value?.adult} Adluts | {value?.child} child Per Room
                  </span>
                </div>
                {/* </Link> */}
                {/* <Link to={`/room_detail/${value.id}`} target="_blank"> */}
                <div className="flex items-center gap-2 text-base font-bold">
                  <span>
                    <FaMoneyBillWave />
                  </span>
                  <span>Rate Per Night</span>
                  <span className="font-bold">-</span>
                  <span className=" text-slate-500">
                    {value?.rate_per_night.toLocaleString()}
                  </span>
                  {/* <span className="text-slate-600 text-sm font-semibold ">
                                    {value.discout_amount
                                      ? `Room discount : ${value.discout_amount}`
                                      : ""}
                                  </span> */}
                </div>
                {/* </Link> */}
                <div className="flex gap-2 text-base font-bold">
                  <span>
                    {value?.refundable === 1 ? (
                      <Tag color="green">Refundable</Tag>
                    ) : (
                      <Tag color="red">Non-refundable</Tag>
                    )}
                  </span>
                  {/* <span className="font-bold">
                                        {value.availability === 1 ? (
                                          <Tag color="green">
                                            Room Available
                                          </Tag>
                                        ) : (
                                          <Tag color="red">
                                            Room Unavailable
                                          </Tag>
                                        )}
                                      </span> */}
                </div>
              </div>
            </Card>
          ))}
        </>
      )}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        style={{
          height: "700px",
          overflow: "auto",
          borderRadius: "10px 10px 10px 10px",
        }}
        footer={null}
      >
        <SingleRoomsModal
          id={
            roomHistoryList.length > 0 ? selectedRoomId : selectedUpdatedRoomId
          }
        />
      </Modal>
    </div>
  );
};

export default RoomBookingDetails;
