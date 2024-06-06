/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Row, Col, Card, Typography } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

// import { FormInput } from "../../../../common/Input/FromInput";
// import { SelectPermissionGroup } from "../../../../app/fromItemCommon/SelectCustomField";
import SubmitButton from "../../../../components/SubmitButton/SubmitButton";
import { useCreatePermissionMutation } from "../api/PermissionGroupEndPoint";
import { useEffect } from "react";
import FormInput from "../../../../common/Input/FromInput";
import { SelectPermissionGroup } from "../../../../app/fromItemCommon/SelectCustomField";

// import BackButton from "../../../../common/Button/BackButton";

const CreatePermission = () => {
  const [form] = Form.useForm();
  const [createPermission, { isLoading, isSuccess }] =
    useCreatePermissionMutation();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isLoading, isSuccess]);
  const onFinish = (values: any) => {
    const postData = {
      permissionGroupId: values.permissionGroupId,
      name: values.name.map((item: any) => item.name),
    };
    createPermission(postData);
    form.resetFields();
  };

  return (
    <>
      {/* <BackButton /> */}
      <Card
        style={{
          boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
          marginBottom: "1rem",
        }}
      >
        <Row
          align={"middle"}
          justify={"space-between"}
          style={{ marginBottom: "1rem" }}
        >
          <Typography.Title level={5}>Create Permission</Typography.Title>
        </Row>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Card
            className="border"
            style={{ marginBottom: "1rem", marginTop: "1rem" }}
          >
            <Row align={"middle"} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={8} lg={8}>
                <SelectPermissionGroup
                  required
                  name="permissionGroupId"
                  label="Permission Group"
                />
              </Col>
            </Row>
          </Card>

          <Card
            className="border"
            style={{ marginBottom: "1rem", marginTop: "1rem" }}
          >
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.List name="name" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} style={{ display: "flex" }}>
                        <FormInput
                          required
                          label="Name"
                          name={[field.name, "name"]}
                          placeholder="Name"
                        />

                        {index === 0 ? (
                          <Button
                            // type="primary"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: "8px", marginTop: "25px" }}
                          ></Button>
                        ) : (
                          <Button
                            style={{
                              background: "red",
                              color: "#fff",
                              marginLeft: "8px",
                              marginTop: "25px",
                            }}
                            onClick={() => remove(field.name)}
                            icon={<MinusOutlined />}
                          ></Button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </Form.List>
            </Col>
          </Card>
          <SubmitButton />
        </Form>
      </Card>
    </>
  );
};

export default CreatePermission;
