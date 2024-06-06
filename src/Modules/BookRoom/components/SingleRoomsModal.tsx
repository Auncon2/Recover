import {
  Badge,
  Carousel,
  Descriptions,
  DescriptionsProps,
  Image,
  Tag,
} from "antd";
import { ISingleRoom } from "../../RoomModule/Types/HotelRoomTypes";
import { useGetHotelRoomDetailsQuery } from "../../RoomModule/api/HotelRoomEndPoints";
import { imageURL } from "../../../app/slice/baseQuery";

import { GoDotFill } from "react-icons/go";
import { useRef } from "react";
import { Link } from "react-router-dom";

const SingleRoomsModal = ({ id }: any) => {
  const { data: singleHotelRoomDetails } = useGetHotelRoomDetailsQuery(
    Number(id)
  );
  const {
    adult,
    room_number,
    room_id,
    room_size,
    room_type,
    bed_type,
    // availability,
    occupancy,
    rate_per_night,
    refundable,
    refundable_charge,
    refundable_time,
    discount_percent,
    child,
    room_amenities,
    aminities_charge,
    room_description,
    room_images,
    discount,
    tax_percent,
  } = (singleHotelRoomDetails?.data as ISingleRoom) || {};

  console.log(singleHotelRoomDetails);

  const carouselRef = useRef<any>(null);
  // const handlePrev = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.prev();
  //   }
  // };
  // const handleNext = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.next();
  //   }
  // };

  const handleThumbnailClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
      // setSelectedImage(images[index]);
    }
  };

  const items_one: DescriptionsProps["items"] = [
    {
      key: "1",
      label: <span className="font-semibold">Room ID</span>,
      children: room_id ? (
        <Link to={`/room_detail/${id}`}>{room_id}</Link>
      ) : (
        "N/A"
      ),
    },
    {
      key: "2",
      label: <span className="font-semibold">Room Number</span>,
      children: room_number ? (
        <Link to={`/room_detail/${id}`}>{room_number}</Link>
      ) : (
        "N/A"
      ),
    },
    {
      key: "3",
      label: <span className="font-semibold">Room Size</span>,
      children: room_size ? room_size + " sqft" : "N/A",
    },
    {
      key: "4",
      label: <span className="font-semibold">Room Type</span>,
      children: room_type ? room_type : "N/A",
    },
    {
      key: "5",
      label: <span className="font-semibold">Bed Type</span>,
      children: bed_type ? bed_type : "N/A",
    },
    // {
    //   key: "6",
    //   label: <span className="font-semibold"> Availability</span>,
    //   children: (
    //     <Tag color={availability === 0 ? "orange" : "green"}>
    //       {availability === 0 ? "Unavailable" : " Availabale"}
    //     </Tag>
    //   ),
    //   span: 2,
    // },
    {
      key: "8",
      label: <span className="font-semibold"> Rate Per Night</span>,
      children: rate_per_night ? rate_per_night : "N/A",
    },
    {
      key: "9",
      label: <span className="font-semibold">Refundable</span>,
      children: (
        <Tag color={refundable === 0 ? "orange" : "green"}>
          {refundable === 0 ? "Non-Refundable" : " Refundable"}
        </Tag>
      ),
    },
    {
      key: "10",
      label: <span className="font-semibold"> Refundable Charge</span>,
      children: refundable_charge ? refundable_charge : "N/A",
    },
    {
      key: "12",
      label: <span className="font-semibold"> Refundable Time</span>,
      children: refundable_time ? refundable_time + " Days" : "N/A",
    },
    {
      key: "7",
      label: <span className="font-semibold">Discount</span>,
      children: discount === 1 ? "Yes" : "No",
      span: 3,
    },
    {
      key: "14",
      label: <span className="font-semibold"> Discount Percent</span>,
      children: discount_percent ? discount_percent + "%" : "N/A",
    },
    {
      key: "141",
      label: <span className="font-semibold"> Tax Percent</span>,
      children: tax_percent ? tax_percent + "%" : "N/A",
    },
    {
      key: "15",
      label: <span className="font-semibold">Adult</span>,
      // children: Number(adult) > 1 ? adult + " persons" : adult + " person",
      children: Number(adult) > 1 ? adult : "N/A",
    },
    {
      key: "16",
      label: <span className="font-semibold">Child</span>,
      children: child ? child : "N/A",
    },
    {
      key: "7",
      label: <span className="font-semibold">Occupancy</span>,
      children: occupancy > 1 ? occupancy + " persons" : occupancy + " person",
      span: 3,
    },
    {
      key: "17",
      label: <span className="font-semibold"> Room Amenities</span>,
      children: room_amenities ? (
        <div>
          {room_amenities?.map((am: any) => (
            <p className="flex items-center py-1">
              <GoDotFill /> <span className="ms-2">{am?.name}</span>
            </p>
          ))}
        </div>
      ) : (
        "N/A"
      ),
    },

    {
      key: "10",
      label: <span className="font-semibold"> Amenities Charge</span>,
      children: aminities_charge ? aminities_charge : "N/A",
    },
    {
      key: "10",
      label: <span className="font-semibold">Description</span>,
      children: room_description ? room_description : "N/A",
    },
  ];

  return (
    <>
      <div className="grid gap-5 mt-5">
        <div className="flex flex-col gap-5 mt-3 w-full">
          <div className="flex items-center gap-3 w-full">
            <Badge.Ribbon text={room_type} placement="start" className="mt-2">
              <Carousel
                autoplay={true}
                effect="fade"
                ref={carouselRef}
                className="bg-slate-100 w-[650px] h-[300px] object-cover object-center overflow-hidden rounded"
              >
                {room_images?.map((img: any, index: number) => (
                  <Image
                    key={index}
                    src={imageURL + img?.photo}
                    alt={img?.id}
                    width={"650px"}
                    height={"300px"}
                    className="object-cover object-center"
                  />
                ))}
              </Carousel>
            </Badge.Ribbon>
          </div>
          <div className="grid grid-cols-8 gap-5  ">
            {room_images?.map((img: any, index: number) => (
              <img
                key={index}
                src={imageURL + img?.photo}
                alt={img?.id}
                className="object-cover object-center w-[50px] h-[50px] hover:cursor-pointer rounded"
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        <Descriptions
          // title="Room details"
          size="small"
          bordered
          items={items_one}
          column={1}
          className="w-full"
        />
      </div>
    </>
  );
};

export default SingleRoomsModal;
