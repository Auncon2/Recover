/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Tag, Tree } from "antd";

import { Form } from "antd";

import { useGetPermissionlistQuery } from "../../Permissions/api/PermissionGroupEndPoint";
import { useDispatch } from "react-redux";
import { useCreateRoleAndPermissionMutation } from "../api/RoleEndPoint";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { FormCommonInput } from "../../../../common/Input/FromInput";
const CreateRoleSec = () => {
  const [form] = Form.useForm();
  const { data: permissionData } = useGetPermissionlistQuery();
  const dispatch = useDispatch();

  const [createRolendPermission, { isLoading, isSuccess }] =
    useCreateRoleAndPermissionMutation();

  //   const [updateRolendPermission] = useUpdateRoleAndPermissionMutation();

  console.log("permissionData", permissionData?.data);

  //   const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(["0-0-0"]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  console.log("checkedKeys", checkedKeys);
  //   const formattedCheckedKeys = checkedKeys?.map((key: any) => {
  //     // Split the key to extract h_permission_id and permission_type
  //     const [h_permission_id, permission_type] = key.split("_");

  //     // Return an object with the extracted values
  //     return {
  //       h_permission_id: parseInt(h_permission_id), // Assuming h_permission_id is supposed to be a number
  //       permission_type: permission_type || "defaultPermissionType", // Default value if permission_type is not available
  //     };
  //   });

  //   console.log(formattedCheckedKeys);

  //   const formattedCheckedKeys = checkedKeys
  //     ?.map((key: any) => {
  //       // Split the key to extract h_permission_id and permission_type
  //       const [h_permission_id, permission_type] = key.split("_");

  //       // Check if permission_type is available
  //       if (permission_type) {
  //         // Return an object with the extracted values
  //         return {
  //           h_permission_id: parseInt(h_permission_id), // Assuming h_permission_id is supposed to be a number
  //           permission_type: permission_type,
  //         };
  //       } else {
  //         // Return null for objects where permission_type is not available
  //         return null;
  //       }
  //     })
  //     .filter((obj) => obj !== null); // Filter out null objects

  //   console.log("formattedCheckedKeys", formattedCheckedKeys);

  const treeData = permissionData?.data?.map((group: any, index: number) => ({
    title: (
      <div className="flex items-baseline gap-2 font-semibold">
        <span className="border rounded-full px-2">{index + 1}</span>
        <span>{group.permissionGroupName}</span>
      </div>
    ),
    key: `${group.permission_group_id}`,

    children:
      group?.permissions?.map((permission: any) => ({
        title: permission.permission_name,
        key: `${permission.h_permission_id}`,
        children:
          [
            // { title: "Read", key: "read" },
            // { title: "Write", key: "write" },
            // { title: "Update", key: "update" },
            // { title: "Delete", key: "delete" },
            {
              title: <Tag color="blue">Read</Tag>,
              key: `${permission.h_permission_id}_read`,
            },
            {
              title: <Tag color="cyan">Write</Tag>,
              key: `${permission.h_permission_id}_write`,
            },
            {
              title: <Tag color="green">Update</Tag>,
              key: `${permission.h_permission_id}_update`,
            },
            {
              title: <Tag color="red">Delete</Tag>,
              key: `${permission.h_permission_id}_delete`,
            },
          ] || [],
      })) || [],
  }));
  const onCheck = (checkedKeysValue: React.Key[]) => {
    // console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], _info: any) => {
    // console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  const onFinish = (values: any) => {
    console.log("values", values);
    const formattedCheckedKeys = checkedKeys
      ?.map((key: any) => {
        // Split the key to extract h_permission_id and permission_type
        const [h_permission_id, permission_type] = key.split("_");

        // Check if permission_type is available
        if (permission_type) {
          // Return an object with the extracted values
          return {
            h_permission_id: parseInt(h_permission_id), // Assuming h_permission_id is supposed to be a number
            permission_type: permission_type,
          };
        } else {
          // Return null for objects where permission_type is not available
          return null;
        }
      })
      .filter((obj) => obj !== null); // Filter out null objects

    console.log("formattedCheckedKeys", formattedCheckedKeys);
    const formData = {
      role_name: values.role_name,
      permissions: formattedCheckedKeys,
    };
    createRolendPermission(formData);
    console.log(formData);
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    }
  }, [isLoading]);
  return (
    <>
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <FormCommonInput
          size={24}
          name="role_name"
          placeholder="Role name"
          label="Role name"
          rules={[{ required: true }]}
        />
        <Form.Item
          label="Select Role Permissions"
          name="role"
          // rules={[
          //   {
          //     required: true,
          //     message: "Select Role Permissions!",
          //   },
          // ]}
        >
          <Tree
            checkable
            onCheck={onCheck as any}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 18 }} className="ml-1">
          <Button
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "150px",
            }}
            // type="primary"
            htmlType="submit"
            // loading={isLoading}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateRoleSec;
