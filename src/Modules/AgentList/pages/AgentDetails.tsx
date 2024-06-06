import { useParams } from "react-router-dom";
import {
  useGetAgentDetailsQuery,
  useGetAgentPropertiesQuery,
  useUpdateAgentMutation,
} from "../api/AgentListEndPoints";
import { IViewAgentDetails, IViewAgentProperties } from "../types/AgentList";
import { Card, Col, Row, Space, Table, Tooltip, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

const agentPropertiesColumns: ColumnsType<IViewAgentProperties> = [
  {
    title: "Property Name",
    dataIndex: "propertyname",
    key: "propertyname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Approval Status",
    dataIndex: "approvalstatus",
    key: "approvalstatus",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => <a>{text}</a>,
  },
];

const AgentDetails = () => {
  const { id } = useParams();
  const { data: agentDetails } = useGetAgentDetailsQuery<
    IViewAgentDetails | any
  >(Number(id));

  const { data } = useGetAgentPropertiesQuery<IViewAgentProperties[] | any>(
    Number(id)
  );
  const [updateAgent] = useUpdateAgentMutation();
  // console.log("agentDetails", agentDetails);

  const {
    address,
    contactnumber,
    email,
    firstname,
    is_verified,
    lastname,
    profileimageurl,
    username,
    licensenumber,
    specializations,
    userrole,
    usertype,
    yearsofexperience,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = agentDetails?.data[0] || {};

  const handleDecline = () => {
    updateAgent({ id: Number(id), data: { status: false } });
  };
  const handleApprove = () => {
    updateAgent({ id: Number(id), data: { status: true } });
  };

  return (
    <div>
      <div className=" lg:flex lg:justify-between lg:items-center">
        <div className="space-y-1 ">
          <div className="flex space-x-5">
            <div className="font-semibold space-y-3">
              <h1>First Name</h1>
              <h1>Last Name</h1>
              <h1>User Name</h1>
              <h1>User Role</h1>
              <h1>User Type</h1>
              <h1>Email</h1>
              <h1>Address</h1>
              <h1>Contact Number</h1>
              <h1>License Number</h1>
              <h1>Specializations</h1>
              <h1>Years of Experience</h1>
              <h1>Verified</h1>
            </div>
            <div className="space-y-3">
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{firstname}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{lastname}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{username}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{userrole}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{usertype}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{email}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{address}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{contactnumber}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{licensenumber}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{specializations}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{yearsofexperience}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>
                  {is_verified ? (
                    <button
                      onClick={() => handleDecline()}
                      className="border px-4 py-1 rounded bg-red-500 text-white"
                    >
                      Decline
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove()}
                      className="border px-4 py-1 rounded bg-green-500 text-white"
                    >
                      Approve
                    </button>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="avatar lg:mx-20">
          <div className="w-[15rem] rounded-full">
            <img
              src={`http://192.168.0.244:5000/auth/${profileimageurl}`}
              alt={username}
              className=" border-2 rounded-lg w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Typography.Title level={5} className="underline">
              Properties List
            </Typography.Title>
            {/* <Card
              style={{
                boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
                marginBottom: "1rem",
              }}
            >
              <Row align={"middle"} justify={"space-between"} gutter={[5, 16]}>
                <Col xs={24} sm={12} md={12} lg={6}>
                  <Search
                    placeholder="Search by Company"
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            </Card> */}

            <Card
              style={{
                boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
                marginBottom: "1rem",
              }}
            >
              <div>
                <Table
                  columns={[
                    ...agentPropertiesColumns,
                    {
                      title: "View",
                      key: "action",
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      render: (record: any) => (
                        <Space size="middle">
                          <Link to={`/propertyList/${record.propertyid}`}>
                            <Tooltip title="View">
                              <EditOutlined
                                style={{
                                  cursor: "pointer",
                                  paddingRight: "20px",
                                }}
                              />
                            </Tooltip>
                          </Link>

                          {/* More actions can be added here */}
                        </Space>
                      ),
                    },
                  ]}
                  dataSource={
                    data?.data && data.data.length > 0 ? data.data : []
                  }
                  key={data?.data?.propertyid}
                  scroll={{ x: true }}
                  pagination={{ showSizeChanger: true }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AgentDetails;
