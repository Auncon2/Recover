import { Card, Col, Form, Input, Row } from "antd";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import SubmitButton from "../../../../components/SubmitButton/SubmitButton";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { ICreatePermissionGroup } from "../types/PermissionGroupTypes";
import { useCreatePermissionGroupMutation } from "../api/PermissionGroupEndPoint";

const CreatePermissionGroup = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createPermissionGroup, { isLoading, isSuccess }] =
    useCreatePermissionGroupMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    }
  }, [dispatch, form, isSuccess]);
  const onFinish = (values: ICreatePermissionGroup) => {
    createPermissionGroup(values);
  };
  return (
    <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card
          style={{
            boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
            marginBottom: "1rem",
          }}
        >
          <Form
            hideRequiredMark
            layout="vertical"
            onFinish={onFinish}
            form={form}
          >
            {" "}
            <Row align={"middle"} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item name="name" label="Permission Group Name">
                  <Input placeholder="Permission Group Name" type="text" />
                </Form.Item>
              </Col>
            </Row>
            <SubmitButton loading={isLoading} />
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreatePermissionGroup;
