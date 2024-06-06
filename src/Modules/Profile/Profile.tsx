/*
Profile page
@Author MD Mamun Miah <mamunahmed.m360ict@gmail.com>
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowLeftOutlined,
  EditOutlined,
  LockOutlined,
  LogoutOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Tag,
  theme,
} from "antd";
import { useAppDispatch } from "../../app/store/store";
import useIsMobile from "../../components/utils/useIsMobile";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../app/api/userApi/userApi";
import { setLogout } from "../../app/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { SubmitHandler } from "react-hook-form";
import UploadImageInputs from "../../components/UploadImageInputs";

import { setCommonModal } from "../../app/slice/modalSlice";
import UpdatePassword from "./UpdatePassword";
import { api } from "../../app/api/userApi/api";
// import dayjs from "dayjs";

const { useToken } = theme;

interface IUpdateProfile {
  name: string;
  logo: File;
  city: string;
  country: string;
  address: string;
  phone: string;
  map_url: string;
  website: string;
  description: string;
  zip_code: string;
  postal_code: string;
  photo: File;
  remove_photo: File;
}

const Profile = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const [form] = useForm();
  const { data } = useGetMeQuery();
  const profileInfo = data?.data;
  const [edit, setEdit] = useState(false);
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  // const handlePreview = async (file: UploadFile) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj as RcFile);
  //   }
  //   setPreviewImage(file.url || (file.preview as string));
  //   setPreviewOpen(true);
  //   setPreviewImage(
  //     file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
  //   );
  // };

  useEffect(() => {
    if (profileInfo) {
      form.setFieldValue("name", profileInfo?.name || "");
      form.setFieldValue("phone", profileInfo?.phone || "");
    }
  }, [form, profileInfo]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e?.fileList;
  };

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: "Change password",
        content: <UpdatePassword />,
        show: true,
      })
    );
  };

  // const normFile = (e: any) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e?.fileList;
  // };

  // const onSubmit: SubmitHandler<IUpdateProfile> = async (data) => {
  //   // const formData = new FormData();

  //   // for (const key in data) {
  //   //   if (data.hasOwnProperty(key)) {
  //   //     const value = data.userField[key];
  //   //     formData.append(key, value);
  //   //     console.log("Key: ", key);
  //   //   }

  //   console.log("data", data);

  //   await updateProfile({ data });
  // };
  const onSubmit: SubmitHandler<IUpdateProfile | any> = async (data) => {
    const formData = new FormData();
    console.log("change password", data);

    for (const key in data) {
      if (data[key]) {
        if (key === "avatar") {
          if (data?.avatar?.fileList[0]?.originFileObj) {
            formData.append(key, data?.avatar?.fileList[0]?.originFileObj);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    const res = await updateProfile({ data: formData });
    if (res) {
      setEdit(false);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(api.util.resetApiState());
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <Card
      style={{
        boxShadow: "0 0 20px 3px rgba(150,190,238,.15)",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: `${isMobile?.isMobile ? "" : "1rem"}`,
      }}
      extra={
        <Row gutter={[6, 6]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Button
              icon={!edit ? <EditOutlined /> : <ArrowLeftOutlined />}
              style={{
                margin: "15px 10px 10px 0",
                background: "#01adad",
                borderRadius: "50px",
                width: "100%",
                color: "white",
              }}
              onClick={() => setEdit(!edit)}
            >
              {!edit ? "Edit" : "Back"}
            </Button>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Button
              icon={<LockOutlined />}
              onClick={showModal}
              style={{
                margin: "15px 10px 10px 0",
                background: "#01adad",
                borderRadius: "50px",
                width: "100%",
                color: "white",
              }}
            >
              Change Password
            </Button>
          </Col>
        </Row>
      }
      title={
        <div
          style={{ display: "block", overflow: "hidden", alignItems: "center" }}
        >
          <ArrowLeftOutlined
            onMouseOver={(e: any) => {
              e.target.style.color = "#0958d9";
              e.target.style.cursor = "pointer";
            }}
            onMouseOut={(e: any) => {
              e.target.style.color = "";
            }}
            onClick={() => {
              window.history.back();
            }}
          />{" "}
          <span style={{ paddingLeft: "10px" }}>Profile </span>
        </div>
      }
    >
      {edit ? (
        <Row>
          <Col
            xs={24}
            md={10}
            lg={6}
            style={{
              textAlign: "center",
              alignSelf: "center",
            }}
          ></Col>
          <Col xs={24} md={14} lg={24}>
            <Form
              name="profileUpdate"
              form={form}
              onFinish={onSubmit}
              layout="vertical"
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* name */}
                <Form.Item label="Name" name="name">
                  <Input type="text" placeholder="Enter Name" />
                </Form.Item>

                {/* phone */}
                <Form.Item label="Phone" name="phone">
                  <Input type="number" placeholder="Enter Your Phone" />
                </Form.Item>

                {/* logo */}
                <Form.Item name={"avatar"} getValueFromEvent={normFile}>
                  <UploadImageInputs
                    name="avatar"
                    label="Profile ImageUrl"
                    uploadButtonText="Upload Your Image"
                    updateImgUrl={profileInfo?.avatar}
                  />
                </Form.Item>
              </div>

              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button
                  // className="text-bold bg-green-500 hover:bg-blue-700 text-white w-36"
                  icon={<SendOutlined />}
                  style={{
                    marginTop: "5px",
                    background: "#01adad",
                    borderRadius: "50px",
                    width: "130px",
                    color: "white",
                  }}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            {/* <Descriptions items={items} column={1} /> */}
          </Col>
          <Divider />
          <Col
            xs={24}
            style={{
              textAlign: "end",
            }}
          >
            <Button
              icon={<LogoutOutlined />}
              onClick={() => handleLogout()}
              style={{
                marginTop: "5px",
                background: "#ff4d4d",
                borderRadius: "50px",
                width: "130px",
                color: "white",
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
      ) : (
        <>
          <Row gutter={[12, 16]}>
            <Col
              xs={24}
              md={10}
              lg={6}
              style={{
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              <Avatar
                size={{ xs: 60, sm: 80, md: 100, lg: 120, xl: 160, xxl: 180 }}
                style={{ border: `2px solid ${token.colorPrimary}` }}
                src={
                  profileInfo
                    ? `https://m360ict.s3.ap-south-1.amazonaws.com/reservation-storage/${profileInfo?.avatar}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESsbHud2lNujq_rY8N1ydbOJGqUZ3lppfxg&usqp=CAU"
                }
              />
            </Col>
            <Col xs={24} md={24} lg={14} xl={18} xxl={18}>
              <div className="flex space-x-5 mt-10">
                <div className="uppercase font-semibold space-y-3 text-xs md:text-sm">
                  <p>Name</p>
                  <p>Email</p>
                  <p>Phone</p>
                  <p>Role Name</p>
                  <p>Status</p>
                </div>
                <div className="space-y-3 text-xs md:text-sm">
                  <div className="flex  items-center font-bold space-x-2">
                    <span>:</span>
                    <p>{profileInfo?.name ? profileInfo?.name : "N/A"}</p>
                  </div>
                  <div className="flex items-center font-bold space-x-2">
                    <span>:</span>
                    <p>{profileInfo?.email ? profileInfo?.email : "N/A"}</p>
                  </div>
                  <div className="flex items-center font-bold space-x-2">
                    <span>:</span>
                    <p>{profileInfo?.phone ? profileInfo?.phone : "N/A"}</p>
                  </div>
                  <div className="flex items-center font-bold space-x-2">
                    <span>:</span>
                    <p>
                      {profileInfo?.role_name ? profileInfo?.role_name : "N/A"}
                    </p>
                  </div>

                  <div className="flex items-center font-bold space-x-2">
                    <span>:</span>
                    <Tag color={profileInfo?.status === 1 ? "green" : "red"}>
                      {profileInfo?.status === 1 ? "ACTIVE" : "INACTIVE"}
                    </Tag>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Divider />
          <Col
            xs={24}
            style={{
              textAlign: isMobile?.isMobile ? "center" : "end",
            }}
          >
            <Button
              icon={<LogoutOutlined />}
              onClick={() => handleLogout()}
              style={{
                marginTop: "5px",

                borderRadius: "50px",
                width: "130px",
                color: "#ff4d4d",
                border: "1px solid #ff4d4d",
              }}
            >
              Logout
            </Button>
          </Col>
        </>
      )}
    </Card>
  );
};

export default Profile;
