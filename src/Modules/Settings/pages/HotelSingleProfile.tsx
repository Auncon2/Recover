import {
  Breadcrumb,
  Button,
  Card,
  Descriptions,
  Drawer,
  Image,
  Tag,
  Typography,
} from "antd";

import type { DescriptionsProps } from "antd";
import { useRef, useState } from "react";

import { Carousel } from "antd";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useGetSingleHotelQuery } from "../api/SettingsEndPoints";
import { imageURL } from "./../../../app/slice/baseQuery";
// import HotelSingleProfileUpdate from "../components/HotelSingleProfileUpdate";
import dayjs from "dayjs";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { FaHotel } from "react-icons/fa6";
import HotelSingleProfileUpdate from "../components/HotelSingleProfileUpdate";
import { CommonHeaderStyles } from "../../../common/style/Style";
const { Paragraph } = Typography;

const HotelSingleProfile = () => {
  const { data } = useGetSingleHotelQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [open, setOpen] = useState(false);

  const getStatusColor = (value: string) => {
    switch (value) {
      case "active":
        return "green";
      case "pending":
        return "orange";
      case "deactive":
        return "volcano";
      default:
        return "default-color"; // You can specify a default color if needed
    }
  };

  const getStatusText = (value: string) => {
    switch (value) {
      case "active":
        return "Active";
      case "pending":
        return "Pending";
      case "deactive":
        return "Deactive";
      default:
        return "N/A";
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // const [selectedImage, setSelectedImage] = useState(images[0]);
  const [_selectedImage, setSelectedImage] = useState(data?.data?.hotel_images);
  // const carouselRef = useRef<Carousel>(null);
  const carouselRef = useRef<any>(null);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
      // setSelectedImage(images[index]);
      setSelectedImage(data?.data?.hotel_images);
    }
  };
  const items: DescriptionsProps["items"] = [
    // {
    //   key: "name",
    //   label: <span className="font-bold text-black ">Hotel Name</span>,
    //   children: <span>{data?.data?.name}</span>,
    // },
    {
      key: "city",
      label: <span className="font-bold  ">City</span>,
      children: <span>{data?.data?.city}</span>,
    },
    {
      key: "country",
      label: <span className="font-bold  ">Country</span>,
      children: <span>{data?.data?.country}</span>,
    },
    {
      key: "address",
      label: <span className="font-bold  ">Address</span>,
      children: <span>{data?.data?.address}</span>,
    },
    {
      key: "founded_year",
      label: <span className="font-bold  ">Founded year</span>,
      children: (
        <span>{dayjs(data?.data?.founded_year).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      key: "email",
      label: <span className="font-bold ">E-mail</span>,
      children: (
        <a href={`mailto:${imageURL + data?.data?.email}`}>
          <Paragraph copyable>{data?.data?.email}</Paragraph>
        </a>
      ),
    },
    {
      key: "phone",
      label: <span className="font-bold ">Phone</span>,
      children: <span>{data?.data?.phone}</span>,
    },
    {
      key: "map_url",
      label: <span className="font-bold  ">Map URL</span>,
      children: (
        <a href={imageURL + data?.data?.map_url}>
          <Paragraph copyable>{data?.data?.map_url}</Paragraph>
        </a>
      ),
    },
    {
      key: "website",
      label: <span className="font-bold">Website</span>,
      children: (
        <a href={imageURL + data?.data?.website}>
          <Paragraph copyable>{data?.data?.website}</Paragraph>
        </a>
      ),
    },

    {
      key: "zip_code",
      label: <span className="font-bold">Zip Code</span>,
      children: <span>{data?.data?.zip_code}</span>,
    },
    {
      key: "postal_code",
      label: <span className="font-bold ">Postal Code</span>,
      children: <span>{data?.data?.postal_code}</span>,
    },
    {
      key: "group",
      label: <span className="font-bold ">Group</span>,
      children: <span>{data?.data?.group}</span>,
    },
    {
      key: "status",
      label: <span className="font-bold ">Status</span>,
      children: (
        <Tag color={getStatusColor(data?.data?.status ?? "")}>
          {getStatusText(data?.data?.status ?? "")}
        </Tag>
      ),
    },
    {
      key: "description",
      label: <span className="font-bold ">Description</span>,
      children: <span>{data?.data?.description}</span>,
    },
    {
      key: "hotel_amnities",
      label: <span className="font-bold ">Hotel Amnities</span>,
      children: (
        <div className="grid grid-cols-2 gap-5">
          {data?.data?.hotel_amnities?.map((item, index) => (
            <span key={index} className="flex gap-3">
              <span>&bull;</span>
              <span>{item.name}</span>
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    // <div className="flex justify-center">
    <>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: "40px" }}
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "/",
            title: (
              <>
                <span>Dashboard</span>
              </>
            ),
          },
          {
            href: "",
            title: (
              <>
                <span>Settings</span>
              </>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex gap-1 items-center text-[#01ADAD]">
                <FaHotel size="11" />
                <span>Hotel Details</span>
              </div>
            ),
          },
        ]}
      />
      <div className="flex flex-col lg:flex-row justify-between mx-2 ">
        <span style={CommonHeaderStyles as any}>Hotel Details</span>
        <Button
          icon={<EditOutlined />}
          onClick={showDrawer}
          style={{
            backgroundColor: "#1B9FA2",
            color: "white",
            borderRadius: "50px",
            width: "150px",
          }}
        >
          Update
        </Button>
      </div>

      <Card>
        <div className="flex flex-col xl:flex-row justify-evenly items-center gap-8 ">
          <Descriptions
            size="small"
            title={
              <div className="flex items-center gap-2">
                <img
                  src={`${imageURL}${data?.data?.logo}`}
                  alt="hotel_logo"
                  width={30}
                />
                <span className="text-xl">{data?.data?.name}</span>
              </div>
            }
            layout="horizontal"
            column={1}
            bordered
            // layout="vertical"
            // column={3}
            items={items}
            className="w-full pr-3"
          />

          <div className="flex flex-col gap-4  px-2 py-12 ">
            <div className="flex items-center gap-3 h-full">
              <FaArrowAltCircleLeft
                type="primary"
                size="40px"
                color="#8f6456"
                onClick={handlePrev}
                className="hidden md:block hover:cursor-pointer"
              />
              <Carousel
                autoplay={true}
                effect="fade"
                ref={carouselRef}
                className="bg-slate-100 w-[220px] md:w-[300px] h-[200px] object-cover object-center overflow-hidden rounded"
              >
                {data?.data?.hotel_images?.map((img, index) => (
                  <Image
                    key={index}
                    src={`${imageURL}${img.photo}`}
                    alt={`Image ${index + 1}`}
                    width={"auto"}
                    height={"auto"}
                    className="object-cover object-center"
                  />
                ))}
              </Carousel>
              <FaArrowAltCircleRight
                type="primary"
                size="40px"
                color="#8f6456"
                onClick={handleNext}
                className="hidden md:block  hover:cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-5 mx-auto">
              {data?.data?.hotel_images?.map((img, index) => (
                <img
                  key={index}
                  // src={img.photo}
                  src={`${imageURL + img.photo}`}
                  alt={`Image ${index + 1}`}
                  className="object-cover object-center w-[60px] h-[50px]  hover:cursor-pointer"
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Drawer
        title="Update Hotel Profile"
        width={720}
        onClose={onClose}
        open={open}
      >
        <HotelSingleProfileUpdate onClose={onClose} />
      </Drawer>
    </>
  );
};

export default HotelSingleProfile;
