import { useParams } from "react-router-dom";
import { useGetCustomerDetailsQuery } from "../api/CustomerEndPoints";
import {
  Avatar,
  Breadcrumb,
  Descriptions,
  DescriptionsProps,
  Image,
  Tag,
} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { CiCircleList } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { imageURL } from "../../../app/slice/baseQuery";

const CustomerDetails = () => {
  const { id } = useParams();
  const { data } = useGetCustomerDetailsQuery(Number(id));

  const getHistoryStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "orange";
      case "blocked":
        return "red";
      default:
        return "default-color"; // You can specify a default color if needed
    }
  };

  const getHistoryStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "inactive":
        return "Inactive";
      case "blocked":
        return "blocked";
      default:
        return "Unknown Status";
    }
  };
  // eslint-disable-next-line no-unsafe-optional-chaining
  const {
    address,
    city,
    country,
    // phone,
    postal_code,
    status,
    // email,
    // name,
    zip_code,
    nid_no,
    last_balance,
    passport_no,
    user_type,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = data?.data || {};

  const items_one: DescriptionsProps["items"] = [
    // {
    //   key: "1",
    //   label: <span className="font-semibold"> Name</span>,
    //   children: <span>{name ? name : "N/A"}</span>,
    // },
    // {
    //   key: "2",
    //   label: <span className="font-semibold"> Email</span>,
    //   children: <span>{email ? email : "N/A"}</span>,
    // },
    // {
    //   key: "3",
    //   label: <span className="font-semibold">Phone</span>,
    //   children: <span>{phone ? phone : "N/A"}</span>,
    // },
    {
      key: "4",
      label: <span className="font-semibold">Country</span>,
      children: <span>{country ? country : "N/A"}</span>,
    },
    {
      key: "5",
      label: <span className="font-semibold">City</span>,
      children: <span>{city ? city : "N/A"}</span>,
    },
    {
      key: "46",
      label: <span className="font-semibold">Last Balance</span>,
      children: <span>{last_balance ? last_balance : "N/A"}</span>,
    },
    {
      key: "45",
      label: <span className="font-semibold">Nid No</span>,
      children: <span>{nid_no ? nid_no : "N/A"}</span>,
    },
    {
      key: "55",
      label: (
        <span className="font-semibold">Passport Number / Iqama Number</span>
      ),
      children: <span>{passport_no ? passport_no : "N/A"}</span>,
    },
    {
      key: "6",
      label: <span className="font-semibold">Address</span>,
      children: <span>{address ? address : "N/A"}</span>,
    },
    {
      key: "7",
      label: <span className="font-semibold">Zip Code</span>,
      children: <span>{zip_code ? zip_code : "N/A"}</span>,
    },
    {
      key: "8",
      label: <span className="font-semibold">Postal Code</span>,
      children: <span>{postal_code ? postal_code : "N/A"}</span>,
    },
    {
      key: "9",
      label: <span className="font-semibold">Status </span>,
      // children: <span>{status ? status : "N/A"}</span>,
      children: (
        <Tag color={getHistoryStatusColor(status ?? "")}>
          {getHistoryStatusText(status ?? "")}
        </Tag>
      ),
    },
    {
      key: "10",
      label: <span className="font-semibold">User Type </span>,
      // children: <span>{status ? status : "N/A"}</span>,
      children: (
        <>
          {user_type && user_type.length > 0 && (
            <div className="grid gap-1">
              {user_type.map((item: any) => (
                <span key={item.id}>
                  <span className="dot">&#8226; </span>
                  {item.user_type.toUpperCase()}
                  {/* {index !== user_type.length - 1 && ","} */}
                </span>
              ))}
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb
        style={{ marginTop: "10px", marginBottom: "40px" }}
        separator=">"
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
            href: "/guest/guest-list",
            title: (
              <div className="flex gap-1 items-center">
                <CiCircleList size="15" />
                <span>Guest List</span>
              </div>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex gap-1 items-center text-[#20a09e] font-semibold">
                <CgProfile size="15" color="#20a09e" />
                <span>Guest's Info</span>
              </div>
            ),
          },
        ]}
      />
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-6">
        {data?.data?.photo ? (
          <Image
            width={220}
            height={200}
            style={{
              borderRadius: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={`${imageURL}${data?.data?.photo}`}
            alt="employee_logo"
          />
        ) : (
          <Avatar size={200} icon={<UserOutlined />} />
        )}

        <div className="flex flex-col gap-2 ">
          <span className="text-3xl md:text-5xl text-[#01adad]">
            {data?.data?.name.toUpperCase()}
          </span>
          <span className="text-base text-[#01adad]">{data?.data?.email}</span>
          <span className="text-[#01adad]">
            {data?.data?.phone
              ? data?.data?.phone
              : "Phone number is not available"}
          </span>
        </div>
      </div>

      <Descriptions size="small" bordered items={items_one} column={1} />
    </>
  );
};

export default CustomerDetails;
