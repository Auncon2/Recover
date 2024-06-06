/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row, Table, Typography } from "antd";
import { roleColumn } from "../utils/RoleColoumn";
import { useGetRolelistQuery } from "../api/RoleEndPoint";

import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import CreateRoleSec from "../components/CreateRoleSec";
import { CommonAllFormItemSettings } from "../../../../common/style/Style";

const Rolelist = () => {
  const { isLoading, data: roleData } = useGetRolelistQuery();
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Create Role",
        // content: <CreateRole />,
        content: <CreateRoleSec />,
        show: true,
        width: 720,
      })
    );
  };
  return (
    <>
      <Row
        gutter={[12, 16]}
        justify={"space-between"}
        align={"middle"}
        style={{ marginBottom: "10px" }}
      >
        <Col xs={24} sm={24} md={5} lg={5}>
          <Typography.Title level={5} style={CommonAllFormItemSettings as any}>
            Role List
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
            + Create Role
          </Button>
        </Col>
      </Row>

      <Table
        bordered={true}
        size="small"
        rowKey={"id"}
        columns={roleColumn}
        dataSource={
          roleData?.data && roleData?.data?.length > 0 ? roleData?.data : []
        }
        scroll={{ x: true }}
        loading={isLoading}
        pagination={{ size: "default" }}
      />
    </>
  );
};

export default Rolelist;
