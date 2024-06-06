/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row, Table, Tag, Typography } from "antd";
import { useGetPermissionlistQuery } from "../api/PermissionGroupEndPoint";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
// import { INewPermission } from '../types/PermissionGroupTypes';
// import { EditOutlined } from '@ant-design/icons';
// import { useState } from 'react';
// import UpdatePermissions from './UpdatePermissions';

const Permissionlist = () => {
  const { isLoading, data: permissionData } = useGetPermissionlistQuery();

  // const [editModalVisible, setEditModalVisible] = useState(false);
  // const [selectedPermission, setSelectedPermission] = useState<any | null>(
  //   null
  // );

  // const handleEditClick = (permission: any) => {
  //   setSelectedPermission(permission);
  //   console.log(
  //     `Opening modal for permissionGroupId: ${permission.permissionGroupId}`
  //   );
  //   setEditModalVisible(true);
  // };

  // const handleEditModalOk = () => {
  //   // Handle save action here
  //   setEditModalVisible(false);
  // };

  // const handleEditModalCancel = () => {
  //   setEditModalVisible(false);
  // };

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  const permissionlistColumn2: ColumnsType<any> = [
    {
      title: "Permission Group Name",
      dataIndex: "permissionGroupName",
      key: "permissionGroupName",
    },
    {
      title: "Permission Name",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) => (
        <ul>
          {permissions.map((permission: any) => (
            <Tag key={permission.permission_id} color={getRandomColor()}>
              {permission.permission_name}
            </Tag>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <>
      <div>
        <Row align={"middle"} justify={"space-between"}>
          <Typography.Title level={5}>Permission List</Typography.Title>
        </Row>
        <Card
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
        >
          <Row align={"middle"} justify={"space-between"} gutter={[5, 16]}>
            <Col xs={24} sm={24} md={5} lg={5}></Col>
            <Col xs={24} sm={24} md={3} lg={3}>
              <Link to="/admin/create-permission">
                {" "}
                <Button>Create Permission</Button>
              </Link>
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
              rowKey={"permissionGroupId"}
              bordered
              columns={permissionlistColumn2}
              dataSource={
                permissionData?.data && permissionData?.data?.length > 0
                  ? permissionData?.data
                  : []
              }
              scroll={{ x: true }}
              loading={isLoading}
            />
          </div>
        </Card>
      </div>
      {/* {selectedPermission && ( // Render the modal only if a permission is selected
        <UpdatePermissions
          open={editModalVisible}
          onOk={handleEditModalOk}
          onCancel={handleEditModalCancel}
          permissionGroupId={selectedPermission.permissionGroupId} // Pass the permissionGroupId
          permissionGroupName={selectedPermission.permissionGroupName} // Pass the permissionGroupId
        />
      )} */}
    </>
  );
};

export default Permissionlist;
