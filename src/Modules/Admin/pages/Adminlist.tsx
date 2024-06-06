/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row, Table, Typography } from "antd";
import { useState } from "react";

import { useDispatch } from "react-redux";
// import CreateAdmin from "../components/CreateAdmin";
import { adminListColumn } from "../utils/AdminColoumn";
import { useGetAdminListQuery } from "../api/AdminEndPoint";
import CreateAdmin from "../components/CreateAdmin";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { CommonAllFormItemSettings } from "../../../common/style/Style";

const AdminList = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<any>({
    limit: 10,
    skip: 0,
  });
  const { isLoading, data: adminData } = useGetAdminListQuery(
    { ...filter },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Create Admin",
        content: <CreateAdmin />,
        show: true,
        width: 720,
      })
    );
  };

  return (
    <>
      <Row
        justify={"space-between"}
        align={"middle"}
        style={{ marginBottom: "10px" }}
      >
        <Col xs={24} sm={24} md={5} lg={5}>
          <Typography.Title level={5} style={CommonAllFormItemSettings as any}>
            Admin List
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
            Create Admin
          </Button>
        </Col>
      </Row>

      <Table
        size="small"
        bordered={true}
        rowKey={"id"}
        columns={adminListColumn}
        dataSource={
          adminData?.data?.length ? [...adminData.data].reverse() : []
        }
        scroll={{ x: true }}
        loading={isLoading}
        onChange={(pagination) => {
          setFilter({
            ...filter,
            skip: ((pagination.current || 1) - 1) * (pagination.pageSize || 10),
            limit: pagination.pageSize!,
          });
        }}
        pagination={{
          size: "default",
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "30", "50", "100"],
          total: adminData?.total,
          showTotal: (total) => `Total ${total} `,
        }}
      />
    </>
  );
};

export default AdminList;
