import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Tag,
} from "antd";
import type { DescriptionsProps } from "antd";
import { Table } from "antd";
import type { TableProps } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetEmployeeDetailsQuery } from "../api/EmployeeEndPoint";
import { IViewSingleEmployee } from "../types/EmployeeTypes";
import dayjs from "dayjs";
import { imageURL } from "../../../app/slice/baseQuery";
import {
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

import useIsMobile from "../../../components/utils/useIsMobile";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";

import UpdateEmployee from "./UpdateEmployee";

const SingleEmployeeProfile = () => {
  // const themeGlobal = useAppSelector(globalTheme);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { id } = useParams();
  const { data: singleEmployee } = useGetEmployeeDetailsQuery(Number(id));

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Update Employee",
        content: <UpdateEmployee singleEmployee={singleEmployee} />,
        show: true,
        width: 500,
      })
    );
  };
  const columns: TableProps<IViewSingleEmployee>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile_no",
      key: "mobile_no",
    },
  ];

  const items1: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Category",

      children: (
        <>
          {singleEmployee?.data?.category === "hotel" ? (
            <Tag
              bordered={false}
              color="cyan"
              style={{ width: "90px", textAlign: "center" }}
            >
              Hotel
            </Tag>
          ) : singleEmployee?.data?.category === "restaurant" ? (
            <Tag
              bordered={false}
              color="magenta"
              style={{ width: "90px", textAlign: "center" }}
            >
              Restaurant
            </Tag>
          ) : (
            <Tag
              bordered={false}
              color="purple"
              style={{ width: "90px", textAlign: "center" }}
            >
              Management
            </Tag>
          )}
        </>
      ),
    },
    ...(singleEmployee?.data?.category === "restaurant"
      ? [
          {
            key: "2",
            label: "Restaurant",
            children: <>{singleEmployee?.data?.res_name}</>,
          },
        ]
      : []),
    {
      key: "3",
      label: "Address",

      children: <>{singleEmployee?.data?.address}</>,
    },
    {
      key: "4",
      label: "Blood Group",
      children: (
        <span className="uppercase">{singleEmployee?.data?.blood_group}</span>
      ),
    },
    {
      key: "5",
      label: "Salary",
      children: <>{singleEmployee?.data?.salary}</>,
    },
    {
      key: "6",
      label: "Status",
      children: (
        <Tag
          color={singleEmployee?.data?.status === 1 ? "green" : "red"}
          style={{ width: "90px", textAlign: "center" }}
        >
          {singleEmployee?.data?.status === 1 ? "Available" : "Unavailable"}
        </Tag>
      ),
    },
    {
      key: "7",
      label: "Date of Birth",

      children: (
        <>
          {singleEmployee?.data?.birth_date
            ? dayjs(singleEmployee?.data?.birth_date).format("DD-MM-YYYY")
            : "N/A"}
        </>
      ),
    },
    {
      key: "8",
      label: "Appointment Date",
      children: (
        <>
          {singleEmployee?.data?.appointment_date
            ? dayjs(singleEmployee?.data?.appointment_date).format("DD-MM-YYYY")
            : "N/A"}
        </>
      ),
    },
    {
      key: "9",
      label: "Joining Date",
      children: (
        <>
          {singleEmployee?.data?.joining_date
            ? dayjs(singleEmployee?.data?.joining_date).format("DD-MM-YYYY")
            : "N/A"}
        </>
      ),
    },
    {
      key: "10",
      label: "Created By",
      children: <>{singleEmployee?.data?.created_by}</>,
    },
  ];
  return (
    <>
      <Breadcrumb
        className="my-5"
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
            href: "/setting/employee",
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>Employee</span>
              </>
            ),
          },

          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  Employee Details
                </span>
              </div>
            ),
          },
        ]}
      />

      <hr className="my-5 borde0 border-[#20a09e]" />
      <Card>
        <Row
          gutter={[12, 16]}
          justify={"space-between"}
          style={{ marginBottom: "10px" }}
        >
          <Col xs={24} sm={24} md={12} lg={10} xl={7} xxl={4}>
            <Link to={`/setting/employee`} className=" hover:text-white">
              <Button
                icon={<FaArrowLeft />}
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Return to Create Employee
              </Button>
            </Link>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10} xl={4} xxl={3}>
            <Button
              icon={<CiEdit color="white" size="15" />}
              onClick={showModal}
              // onClick={() => {
              //   showModal(singleEmployee);
              // }}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Update
            </Button>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={14}>
            <Row gutter={[12, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row justify={"center"}>
                  <Avatar
                    size={isMobile?.isMobile ? 150 : 250}
                    icon={
                      singleEmployee?.data?.photo ? (
                        <img
                          src={imageURL + singleEmployee?.data?.photo}
                          alt={`${singleEmployee?.data?.photo}'s Photo`}
                        />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                </Row>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Table
                  bordered={true}
                  size="small"
                  columns={columns}
                  dataSource={[singleEmployee?.data] as any}
                  pagination={false}
                  style={{ width: "100%" }}
                  scroll={{ x: true }}
                />
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Descriptions size="small" bordered items={items1} column={1} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default SingleEmployeeProfile;
