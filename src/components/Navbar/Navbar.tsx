import { Button, theme, Popover, Avatar, Divider } from "antd";
import { Header } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { globalTheme, setTheme } from "../../app/slice/themeSlice";

import {
  FullscreenOutlined,
  LeftOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/store";
import { setLogout } from "../../app/features/userSlice";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useEffect, useState } from "react";

import { useGetMeQuery } from "../../app/api/userApi/userApi";
import { LuLayoutDashboard } from "react-icons/lu";
import dayjs from "dayjs";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { api } from "../../app/api/userApi/api";
// const { useToken } = theme;
// import useIsMobile from "../utils/useIsMobile";
// import Notifications from "../Notification/Notification";

const NavBar = ({ collapsed, setCollapsed }: any) => {
  const [dateTime, setDateTime] = useState(dayjs().format("ddd, MMM, DD"));
  const [time, setTime] = useState(dayjs().format("h:mm A"));
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(dayjs().format("ddd, MMM, DD "));
      setTime(dayjs().format("h:mm A"));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);
  const { data } = useGetMeQuery();
  const profileInfo = data?.data;
  const dispatch = useAppDispatch();
  // const isMobile = useIsMobile();
  // const { token } = useToken();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const themeGlobal = useSelector(globalTheme);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleDarkTheme = () => {
    dispatch(setTheme(theme.darkAlgorithm));
  };
  const handleLightTheme = () => {
    dispatch(setTheme(theme.defaultAlgorithm));
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(api.util.resetApiState());
    dispatch(setLogout());

    navigate("/login");
  };

  //   for full screen
  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const enterFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  const content = (
    <div className="grid">
      <div className="grid gap-1 justify-center ">
        <div className="flex justify-center">
          <Avatar
            size={40}
            // style={{ border: `2px solid ${token.colorPrimary}` }}

            src={
              profileInfo
                ? `https://m360ict.s3.ap-south-1.amazonaws.com/reservation-storage/${profileInfo?.avatar}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESsbHud2lNujq_rY8N1ydbOJGqUZ3lppfxg&usqp=CAU"
            }
          />
        </div>

        <span className="text-xs font-semibold">{profileInfo?.name}</span>
      </div>
      <Divider />
      <Link
        to="/setting/profile"
        className="flex items-center gap-1 mt-[-10px]"
      >
        {/* <Button
          color="primary"
          icon={<UserOutlined />}
          style={{
            backgroundColor: "#04d8d8",
            color: "white",
          }}
        >
          Profile
        </Button> */}
        <UserOutlined />
        <span>Profile</span>
      </Link>
      <Link to="" className="flex items-center gap-1 mt-[10px]">
        <LuLayoutDashboard />
        <span>Dashboard</span>
      </Link>
      <Link to="/setting/profile" className="flex items-center gap-1 mt-[10px]">
        <LockOutlined />
        <span>Change Password</span>
      </Link>
      <Divider />

      <Link to="/login" className="mt-[-10px]">
        <Button
          // style={{ marginTop: "10px" }}
          style={{
            marginTop: "10px",
            backgroundColor:
              themeGlobal.theme === theme.defaultAlgorithm ? "#e3e6ed" : "",
            // color: "black",
            width: "230px",
          }}
          // color="primary"
          icon={<LogoutOutlined />}
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </Link>
    </div>
  );

  return (
    <Header
      style={{
        width: `100%`,
        zIndex: 9999,
        marginBottom: "20px",
        background: colorBgContainer,

        backgroundColor:
          themeGlobal.theme === theme.defaultAlgorithm ? "white" : "",

        color: "white",
        top: 0,
        // ......................................................
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 50,
        maxWidth: "100%",
      }}
    >
      {/* <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 50,
          maxWidth: "100%",
        }}
      > */}
      <div className="hidden lg:block">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Button
          type="primary"
          style={{ border: "none", backgroundColor: "#01adad" }}
          onClick={() => navigate(-1)}
          shape="circle"
          size="small"
          icon={<LeftOutlined />}
        />
        <Button
          style={{
            border: "none",
            marginLeft: "10px",
            backgroundColor: "#01adad",
          }}
          onClick={() => navigate(1)}
          shape="circle"
          size="small"
          icon={<RightOutlined />}
          type="primary"
        />
      </div>
      {/* <GlobalClock /> */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 20,
          paddingBottom: "8px",
        }}
      >
        <div className="hidden md:block">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 5,
            }}
          >
            <Button
              icon={<IoCalendarOutline />}
              style={{
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {dateTime}
            </Button>
            <Button
              icon={<IoIosTimer />}
              style={{
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {time}
            </Button>
          </div>
        </div>

        <Button
          icon={<FullscreenOutlined style={{ color: "white" }} />}
          // type="dashed"
          type="default"
          onClick={handleFullscreenToggle}
          style={{ borderRadius: "50%", backgroundColor: "#01adad" }}
        />
        <div>
          {themeGlobal.theme === theme.defaultAlgorithm ? (
            <Button
              onClick={() => {
                handleDarkTheme();
              }}
              icon={<BsFillMoonStarsFill style={{ color: "white" }} />}
              // type="dashed"
              type="default"
              style={{ borderRadius: "50%", backgroundColor: "#01adad" }}
            />
          ) : (
            <Button
              onClick={() => {
                handleLightTheme();
              }}
              icon={<BsFillSunFill style={{ color: "white" }} />}
              // type="dashed"
              type="default"
              style={{ borderRadius: "50%", backgroundColor: "#01adad" }}
            />
          )}
        </div>
        {/* <Notifications /> */}

        <Popover content={content}>
          <Button
            icon={<UserOutlined style={{ color: "white" }} />}
            // type="primary"
            style={{ borderRadius: "50%", backgroundColor: "#01adad" }}
          />
        </Popover>
      </div>
      {/* </div> */}
    </Header>
  );
};

export default NavBar;
