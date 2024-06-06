import { useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Descriptions,
  Drawer,
  Image,
  Result,
  Table,
  Tag,
} from "antd";
import type { DescriptionsProps } from "antd";
import { Carousel } from "antd";
import { useParams } from "react-router-dom";
import { useGetHotelRoomDetailsQuery } from "../api/HotelRoomEndPoints";
import { imageURL } from "./../../../app/slice/baseQuery";
import RoomUpdateModal from "../components/RoomUpdateModal";
import { ISingleRoom, IbookingData } from "./../Types/HotelRoomTypes";
import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { GoDotFill } from "react-icons/go";
import { TableProps } from "antd/lib";
import { BsInfoCircleFill } from "react-icons/bs";
import { CommonHeaderStyles } from "../../../common/style/Style";

const SinglePageroomDetail = () => {
  const { id } = useParams();
  const { data: singleHotelRoomDetails } = useGetHotelRoomDetailsQuery(
    Number(id)
  );
  const [open, setOpen] = useState(false);
  console.log("singleHotelRoomDetails", singleHotelRoomDetails?.data);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
      children: room_id ? room_id : "N/A",
    },
    {
      key: "2",
      label: <span className="font-semibold">Room Number</span>,
      children: room_number ? room_number : "N/A",
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

  const columns: TableProps<IbookingData>["columns"] = [
    {
      title: "Booking No",
      dataIndex: "booking_no",
      key: "booking_no",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Guest Name",
      dataIndex: "name",
      key: "name",
      render: (text, photo) => (
        <div className="flex justify-start">
          <div className="flex items-center gap-3">
            {photo?.photo ? (
              <img
                src={`${imageURL}${photo?.photo}`}
                alt="guest_logo"
                width={25}
                height={25}
                className="rounded-full"
              />
            ) : (
              <Avatar size={25} icon={<UserOutlined />} />
            )}
            <span>{text}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (text) => <a>{text}</a>,
    },
  ];

  return (
    <>
      <Breadcrumb
        className="mt-5 mb-[40px]"
        separator=">"
        items={[
          {
            href: "/",
            title: (
              <>
                <HomeOutlined className=" me-1" />
                <span>Dashboard</span>
              </>
            ),
          },
          {
            href: "/hotel/room-list",
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>Room List</span>
              </>
            ),
          },
          {
            href: "",
            title: <span className="text-[#119B9D]">Room Details</span>,
          },
        ]}
      />
      <div className="flex justify-between mb-5 mx-5">
        <div
          className="text-xl md:text-lg font-bold text-[#01adad]"
          style={{ textTransform: "uppercase" }}
        >
          Room Details
        </div>

        <Button
          icon={<EditOutlined />}
          onClick={showDrawer}
          style={{
            backgroundColor: "#01adad",
            color: "white",
            borderRadius: "50px",
            width: "130px",
          }}
        >
          Update
        </Button>
      </div>

      {/* <Card className="shadow-md rounded mt-5 mx-5 px-3 py-3 "> */}
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <Descriptions
          size="small"
          bordered
          items={items_one}
          column={1}
          className="w-full"
        />

        {room_images && room_images.length > 0 ? (
          <div className="flex flex-col gap-5 mt-3 ">
            <div className="flex items-center gap-3">
              {/* <FaArrowAltCircleLeft
                type="primary"
                shape="circle"
                icon="left"
                size="40px"
                color="#8f6456"
                onClick={handlePrev}
                className="hover:cursor-pointer"
              /> */}
              <Badge.Ribbon text={room_type} placement="start" className="mt-2">
                <Carousel
                  autoplay={true}
                  effect="fade"
                  ref={carouselRef}
                  className="bg-slate-100 w-[250px] md:w-[300px] h-[200px] object-cover object-center overflow-hidden rounded"
                >
                  {room_images?.map((img: any, index: number) => (
                    <Image
                      key={index}
                      src={imageURL + img?.photo}
                      alt={img?.id}
                      width={"auto"}
                      height={"auto"}
                      className="object-cover object-center"
                    />
                  ))}
                </Carousel>
              </Badge.Ribbon>

              {/* <FaArrowAltCircleRight
                type="primary"
                shape="circle"
                icon="right"
                size="40px"
                color="#8f6456"
                onClick={handleNext}
                className="hover:cursor-pointer"
              /> */}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-4 xl:grid-cols-5 gap-5 mx-auto -ml-1 xl:-ml-0">
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
        ) : (
          <Result
            title="There is no room pictures!"
            icon={
              <div className="flex justify-center">
                <BsInfoCircleFill color="01adad" size={80} />
              </div>
            }
            extra={
              <Button
                type="primary"
                key="console"
                style={{ borderRadius: "50px" }}
                onClick={showDrawer}
              >
                Upload Pictures
              </Button>
            }
          />
        )}
      </div>

      {/* </Card> */}

      <div className="flex justify-center mt-16">
        <div className="grid w-full">
          <span
            // className="text-lg font-semibold  text-[#01adad] mb-4 ml-2"
            // style={{ textTransform: "uppercase" }}
            style={CommonHeaderStyles as any}
          >
            Booking History
          </span>
          <Table
            size="small"
            columns={columns}
            dataSource={singleHotelRoomDetails?.data?.bookingData as any}
            bordered={true}
            // pagination={false}
          />
        </div>
      </div>

      <Drawer
        title="Update Hotel Room Information"
        width={720}
        onClose={onClose}
        open={open}
      >
        <RoomUpdateModal
          onClose={onClose}
          singleHotelRoomDetails={singleHotelRoomDetails?.data}
        />
      </Drawer>
    </>
  );
};

export default SinglePageroomDetail;
