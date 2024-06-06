/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Tag, Tree, message } from "antd";

import { Form } from "antd";
import {
  useGetSingleRoleQuery,
  useUpdateRoleAndPermissionMutation,
} from "../api/RoleEndPoint";

import { useGetPermissionlistQuery } from "../../Permissions/api/PermissionGroupEndPoint";
import { FormCommonInput } from "../../../../common/Input/FromInput";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { useDispatch } from "react-redux";

// import { setLogout } from "../../../../app/features/userSlice";
// import { useNavigate } from "react-router-dom";

const UpdateRoleSec = ({ id }: { id: Number | undefined }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { data: permissionData } = useGetPermissionlistQuery();

  const { data: singleRole } = useGetSingleRoleQuery(Number(id));
  const [updateRolendPermission, { isSuccess, isLoading }] =
    useUpdateRoleAndPermissionMutation();

  // console.log("singleRole", singleRole?.data);

  const preSelected = singleRole?.data?.permission.map((group: any) => ({
    title: group.permission_group_name,
    key: `${group.permission_group_id}`,

    children:
      group?.subModules?.map((permission: any) => ({
        // title: permission.permission_name,
        key: `${permission.h_permission_id}`,

        children:
          permission?.permission_type?.map((item: any) => ({
            // title: item,
            key: `${permission.h_permission_id}_${item}`,
          })) || [],
      })) || [],
  }));
  console.log("preSelected", preSelected);

  // Extract keys from preSelected array
  // const initialCheckedKeys = preSelected?.flatMap((item) => [
  //   item.key,
  //   ...(item.children ? item.children.map((child: any) => child.key) : []),
  // ]);

  const initialCheckedKeys = preSelected?.flatMap((item) => [
    // item.key,
    ...(item.children
      ? item.children.flatMap((child: any) =>
          child.children ? child.children.map((key: any) => key.key) : []
        )
      : []),
  ]);

  const PrevformattedCheckedKeys = initialCheckedKeys
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
    .filter((obj) => obj !== null);

  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(
    initialCheckedKeys || []
  );

  // const [checkedKeys, setCheckedKeys] = useState<React.Key[]>();

  // const [checkedDeleteKeys, setCheckedDeleteKeys] = useState<React.Key[]>();
  const [submitKeys, setSubmitKeys] = useState<any[]>([]);
  const [submitFilteredKeys, setSubmitFilteredKeys] = useState<any[]>([]);
  const [submitDeleteKeys, setSubmitDeleteKeys] = useState<any[]>([]);

  const [_selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  // const [_selectedDeleteKeys, setDeleteSelectedKeys] = useState<React.Key[]>(
  //   []
  // );

  const [compareDeleteKeys, setcompareDeleteKeys] = useState<any[]>([]);

  useEffect(() => {
    if (PrevformattedCheckedKeys) {
      setcompareDeleteKeys(PrevformattedCheckedKeys);
    }
  }, [singleRole?.data?.permission.length]);
  // console.log("initialCheckedKeys", initialCheckedKeys);
  // console.log("checkedKeys", checkedKeys);
  // console.log("PrevformattedCheckedKeys", PrevformattedCheckedKeys);
  // console.log("compareDeleteKeys", compareDeleteKeys);

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

  console.log("submitKeys", submitKeys);
  console.log("submitDeleteKeys", submitDeleteKeys);
  useEffect(() => {
    if (formattedCheckedKeys) {
      setSubmitKeys(formattedCheckedKeys);
    }
  }, [checkedKeys]);

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

  useEffect(() => {
    // Compare previous submitKeys with the current one to find removed values
    const removedKeys = compareDeleteKeys?.filter(
      (prevKey) =>
        !submitKeys.some(
          (currentKey) =>
            prevKey.h_permission_id === currentKey.h_permission_id &&
            prevKey.permission_type === currentKey.permission_type
        )
    );

    // Update state with removed keys
    setSubmitDeleteKeys(removedKeys);
  }, [submitKeys]);

  useEffect(() => {
    if (singleRole) {
      form.setFieldValue("role_name", singleRole?.data?.role_name);
    }
  }, [singleRole]);

  // Get the permission IDs and types from singleRole data
  const permissionIds = singleRole?.data?.permission.flatMap((group: any) =>
    group.subModules.flatMap((permission: any) => ({
      id: permission.h_permission_id,
      types: permission.permission_type,
    }))
  );
  console.log("permissionIds", permissionIds);
  // Filter out objects from submitKeys that match singleRole permissions
  const filteredSubmitKeys = submitKeys.filter(
    (submitKey) =>
      !permissionIds?.some(
        (permission) =>
          submitKey.h_permission_id === permission.id &&
          permission.types.includes(submitKey.permission_type)
      )
  );

  // Store the filtered submitKeys in state
  //   setSubmitKeys(filteredSubmitKeys);
  console.log("filteredSubmitKeys", filteredSubmitKeys);
  useEffect(() => {
    if (filteredSubmitKeys) {
      setSubmitFilteredKeys(filteredSubmitKeys);
    }
  }, [submitKeys]);
  console.log("submitFilteredKeys", submitFilteredKeys);

  const onFinish = (values: any) => {
    const ID = Number(singleRole?.data?.role_id);

    if (
      submitFilteredKeys &&
      submitFilteredKeys.length > 0 &&
      submitDeleteKeys.length <= 0
    ) {
      const updateRoles = {
        role_name: values.role_name,
        added: submitFilteredKeys,
      };
      console.log("updateRoles", updateRoles);
      updateRolendPermission({
        id: ID,
        data: updateRoles,
      });
    } else if (
      submitDeleteKeys &&
      submitDeleteKeys.length > 0 &&
      submitFilteredKeys.length <= 0
    ) {
      const DeleteRoles = {
        role_name: values.role_name,
        deleted: submitDeleteKeys,
      };
      console.log("DeleteRoles", DeleteRoles);
      updateRolendPermission({ id: ID, data: DeleteRoles });
    } else if (
      submitFilteredKeys &&
      submitFilteredKeys.length > 0 &&
      submitDeleteKeys &&
      submitDeleteKeys.length > 0
    ) {
      const UpdateDeleteRoles = {
        role_name: values.role_name,
        added: submitFilteredKeys,
        deleted: submitDeleteKeys,
      };
      console.log("UpdateDeleteRoles", UpdateDeleteRoles);
      updateRolendPermission({ id: ID, data: UpdateDeleteRoles });
    } else {
      message.success("Up to date");
    }
  };
  useEffect(() => {
    if (isSuccess === true) {
      // const navigate = useNavigate();
      // form.resetFields(["deletee"]);
      //
      // setCheckedKeys([]);
      dispatch(setCommonModal());

      setSubmitDeleteKeys([]);
      // dispatch(setLogout());
      // localStorage.removeItem("token");
      // navigate(`/login`);
      // console.log("logout done");
    }
  }, [form, isSuccess]);
  console.log("isSuccess", isSuccess);
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
        <Form.Item name="addd" label="Update Role Permissions">
          <Tree
            checkable
            onCheck={onCheck as any}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            // selectedKeys={selectedKeys}
            treeData={treeData}
          />
        </Form.Item>
        {/* <Form.Item
          name="deletee"
          label={
            <span
              className="
        text-red-500"
            >
              Delete Role Permissions
            </span>
          }
        >
          <Tree
            checkable
            onCheck={onCheckDelete as any}
            // checkedKeys={checkedDeleteKeys}
            onSelect={onSelectDelete}
            // selectedKeys={selectedDeleteKeys}
            treeData={deletTreeData}
          />
        </Form.Item> */}
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
            loading={isLoading}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateRoleSec;
