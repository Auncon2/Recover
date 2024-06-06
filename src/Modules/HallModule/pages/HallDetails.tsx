import { useRef, useState } from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Descriptions,
  Drawer,
  Image,
  Result,
} from "antd";
import type { DescriptionsProps } from "antd";
import { Carousel } from "antd";
import { useParams } from "react-router-dom";
import { imageURL } from "./../../../app/slice/baseQuery";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { useGetHallDetailsQuery } from "../api/HallEndPoints";
import { IViewSingleHall } from "../Types/HallTypes";
import HallUpdate from "../components/HallUpdate";
import { BsInfoCircleFill } from "react-icons/bs";

const HallDetails = () => {
  const { id } = useParams();
  const { data: singleHallDetails } = useGetHallDetailsQuery(Number(id));
  const [open, setOpen] = useState(false);
  console.log("singleHallDetails", singleHallDetails);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const {
    capacity,
    hall_amenities,
    hall_images,
    hall_size,
    // hall_status,
    location,
    name,
    rate_per_hour,
  } = singleHallDetails?.data?.[0] || ({} as IViewSingleHall);

  // const getHistoryStatusColor = (status: string) => {
  //   switch (status) {
  //     case "available":
  //       return "green";
  //     case "booked":
  //       return "orange";
  //     case "maintenance":
  //       return "blue";
  //     default:
  //       return "default-color"; // You can specify a default color if needed
  //   }
  // };

  // const getHistoryStatusText = (status: string) => {
  //   switch (status) {
  //     case "available":
  //       return "Available";
  //     case "booked":
  //       return "Booked";
  //     case "maintenance":
  //       return "Maintenance";
  //     default:
  //       return "Unknown Status";
  //   }
  // };

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
      label: <span className="font-semibold">Hall Name</span>,
      children: name ? name : "N/A",
    },
    {
      key: "7",
      label: <span className="font-semibold">Hall Size</span>,
      children: hall_size ? hall_size + " sqft" : "N/A",
    },
    {
      key: "2",
      label: <span className="font-semibold">Location</span>,
      children: location ? location : "N/A",
    },
    {
      key: "3",
      label: <span className="font-semibold">Capacity</span>,
      children: capacity > 0 ? capacity + " Persons" : capacity + " Person",
    },
    // {
    //   key: "4",
    //   label: <span className="font-semibold">Hall Status</span>,
    //   // children: hall_status ? hall_status : "N/A",
    //   children: (
    //     <Tag color={getHistoryStatusColor(hall_status ?? "")}>
    //       {getHistoryStatusText(hall_status ?? "")}
    //     </Tag>
    //   ),
    // },
    {
      key: "5",
      label: <span className="font-semibold">Rate Per Hour</span>,
      children: rate_per_hour ? rate_per_hour : "N/A",
    },
    {
      key: "6",
      label: <span className="font-semibold">Hall Amenities</span>,
      children: hall_amenities
        ? hall_amenities?.map((items: any) => (
            <p key={items?.id} className="py-1">
              &#x2022; {items?.name}
            </p>
          ))
        : "N/A",
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
            href: "",
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>Hall</span>
              </>
            ),
          },
          {
            href: "/hall/hall-list",
            title: <span className="text-[#119B9D]">Hall List</span>,
          },
          {
            title: <span className="text-[#119B9D]">Hall Details</span>,
          },
        ]}
      />

      {/* <Card className="shadow-md rounded mt-5 mx-5 px-3 py-3 "> */}
      <div className="flex justify-between mb-5">
        <div
          className="text-xl md:text-lg font-bold text-[#01adad]"
          style={{ textTransform: "uppercase" }}
        >
          Hall Details
        </div>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={showDrawer}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "131px",
            }}
          >
            Update
          </Button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <Descriptions
          size="small"
          bordered
          items={items_one}
          column={1}
          className="w-full"
        />
        {hall_images && hall_images.length > 0 ? (
          <div className="flex flex-col gap-5 ">
            <Badge.Ribbon text={name} placement="start" className="mt-2">
              <Carousel
                autoplay={true}
                effect="fade"
                ref={carouselRef}
                className="bg-slate-100 w-[250px] md:w-[300px] h-[200px] overflow-hidden rounded"
              >
                {hall_images?.map((img: any, index: number) => (
                  <Image
                    key={index}
                    src={imageURL + img?.photo}
                    alt={img?.id}
                    width={500}
                    height={300}
                    className="object-cover object-center "
                  />
                ))}
              </Carousel>
            </Badge.Ribbon>

            <div className="grid grid-cols-4 md:grid-cols-4 xl:grid-cols-5 gap-5 mx-auto -ml-1 xl:-ml-0">
              {hall_images?.map((img: any, index: number) => (
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
            title="There is no Hall pictures!"
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
      <Drawer
        title="Update Hotel Hall Information"
        width={720}
        onClose={onClose}
        open={open}
      >
        <HallUpdate
          onClose={onClose}
          singleHallDetails={singleHallDetails?.data?.[0]}
        />
      </Drawer>
    </>
  );
};

export default HallDetails;
