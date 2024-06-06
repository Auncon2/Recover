/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row, Table, Typography } from "antd";

import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { permissionGroupColumn } from "../utils/PermissionGroupColoumn";
import { useGetPermissionGrouplistQuery } from "../api/PermissionGroupEndPoint";
import CreatePermissionGroup from "../components/CreatePermissionGroup";

const PermissionGrouplist = () => {
  const { isLoading, data: permissionGroupData } =
    useGetPermissionGrouplistQuery();
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Create Permission Group",
        content: <CreatePermissionGroup />,
        show: true,
        width: 720,
      })
    );
  };
  return (
    <>
      <div>
        <Row align={"middle"} justify={"space-between"}>
          <Typography.Title level={5}>Permission Group List</Typography.Title>
        </Row>
        <Card
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
        >
          <Row align={"middle"} justify={"space-between"} gutter={[5, 16]}>
            <Col xs={24} sm={24} md={5} lg={5}>
              {/* <Search placeholder='Search Receipt' style={{ width: '95%' }} /> */}
            </Col>
            <Col xs={24} sm={24} md={2} lg={2}>
              <Button onClick={showModal}>+ Create</Button>
            </Col>
          </Row>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
        >
          <div>
            <Table
              rowKey={"id"}
              columns={permissionGroupColumn}
              dataSource={
                permissionGroupData?.data &&
                permissionGroupData?.data?.length > 0
                  ? permissionGroupData?.data
                  : []
              }
              scroll={{ x: true }}
              loading={isLoading}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default PermissionGrouplist;
