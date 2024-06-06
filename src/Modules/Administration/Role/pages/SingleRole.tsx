import { Typography, Row, Col, Card, Space, Tag, Button } from "antd";
import { useGetSingleRoleQuery } from "../api/RoleEndPoint";

// import { useDispatch } from "react-redux";
// import { setCommonModal } from "../../../../app/slice/modalSlice";

import { useParams } from "react-router-dom";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { useDispatch } from "react-redux";

import UpdateRoleSec from "../components/UpdateRoleSec";
import { useGetMeQuery } from "../../../../app/api/userApi/userApi";
import { CommonAllFormItemSettings } from "../../../../common/style/Style";

const SingleRole = () => {
  const { id } = useParams();
  console.log("Single role id", id);
  const { data: singleRole } = useGetSingleRoleQuery(Number(id));
  const dispatch = useDispatch();
  const { data } = useGetMeQuery();
  const profileInfo = data?.data;
  console.log("profileInfo", profileInfo);
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Update Role",
        // content: <UpdateRole id={Number(id)} />,
        content: <UpdateRoleSec id={Number(id)} />,

        show: true,
        width: 720,
      })
    );
  };

  const getStatusColor = (value: string) => {
    // console.log("getCheckIn_outColor", value);

    switch (value) {
      case "read":
        return "blue";
      case "write":
        return "cyan";
      case "update":
        return "green";
      case "delete":
        return "red";
      default:
        return ""; // You can specify a default color if needed
    }
  };

  const getStatusText = (value: string) => {
    // console.log("getCheckIn_out_text", value);
    switch (value) {
      case "read":
        return "Read";
      case "write":
        return "Write";
      case "update":
        return "Update";
      case "delete":
        return "Delete";
      default:
        return "N/A";
    }
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xl={24} lg={24} xs={24}>
          <Card style={{ marginBottom: "10px" }}>
            <Row justify={"space-between"} align={"middle"}>
              <Col xs={24} sm={24} md={5} lg={5}>
                <Typography.Title
                  level={5}
                  style={CommonAllFormItemSettings as any}
                >
                  Single Role List
                </Typography.Title>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={4}>
                <Button
                  onClick={showModal}
                  style={{
                    backgroundColor: "#01adad",
                    color: "white",
                    borderRadius: "50px",
                    width: "100%",
                  }}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Card>
          <Card bordered={false} style={{ height: "100%" }}>
            <Space
              direction="vertical"
              style={{ width: "100%", height: "100%" }}
            >
              <Space
                direction="vertical"
                // style={{ textAlign: "center", width: "100%" }}
                style={{ width: "100%" }}
              >
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                  Role Name:{" "}
                  {singleRole?.data?.role_name.toUpperCase() || "N/A"}
                </Typography.Title>

                {/* <Typography.Title level={4}>Permissions:</Typography.Title> */}
                {singleRole?.data?.permission.map(
                  (permission, index: number) => (
                    <Card
                      className="border flex justify-center"
                      key={permission.permission_group_id}
                    >
                      <div>
                        <div className="flex items-center gap-1 text-lg">
                          <Typography.Text strong>
                            {index + 1} &#41; Permission Group Name :
                          </Typography.Text>
                          <Typography.Text strong>
                            {permission.permission_group_name.toUpperCase() ||
                              "N/A"}
                          </Typography.Text>
                        </div>
                        <br />
                        {/* <Typography.Text>Submodules:</Typography.Text> */}
                        <br />
                        {permission?.subModules?.map(
                          (submodule, index: number) => (
                            <div
                              key={submodule.h_permission_id}
                              className="mb-4 ml-5"
                            >
                              <div className="flex items-baseline gap-2">
                                <span>{index + 1} &#46;</span>
                                <div className="flex items-center gap-1">
                                  <Typography.Text strong>
                                    Submodule Name (permission name) :
                                  </Typography.Text>
                                  <Typography.Text strong>
                                    {submodule.permission_name.toUpperCase() ||
                                      "N/A"}
                                  </Typography.Text>
                                </div>
                              </div>

                              <div className="ml-5">
                                <Typography.Text>Operations:</Typography.Text>
                                <br />
                                <div>
                                  {submodule.permission_type.map(
                                    (operation) => (
                                      // <Tag color="geekblue" key={operation}>
                                      //   {operation}
                                      // </Tag>
                                      <Tag
                                        color={getStatusColor(operation ?? "")}
                                        key={operation}
                                      >
                                        {getStatusText(operation ?? "")}
                                      </Tag>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </Card>
                  )
                )}
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleRole;
