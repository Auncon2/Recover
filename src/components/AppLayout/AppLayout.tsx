/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Grid, Layout, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, Outlet, useLocation } from "react-router-dom";
import { menuItems } from "./AppLayoutData";
import { Footer } from "antd/es/layout/layout";

import useIsMobile from "../utils/useIsMobile";
import NavBar from "../Navbar/Navbar";
import { useAppSelector } from "../../app/store/store";
import { globalTheme } from "../../app/slice/themeSlice";

import { useGetMeQuery } from "../../app/api/userApi/userApi";
import "../../auth/pages/LoginDesign.css";
import { useGetSingleHotelQuery } from "../../Modules/Settings/api/SettingsEndPoints";
import { imageURL } from "../../app/slice/baseQuery";
// import { BiSolidDiamond } from "react-icons/bi";

const { Content } = Layout;
const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: hotelDetails } = useGetSingleHotelQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // {},
  // {
  //   refetchOnMountOrArgChange: true,
  // }
  // const { user } = useSelector(selectUser);
  const { data } = useGetMeQuery();

  const user = data?.data;
  // console.log("user", user);
  const [currentSelection, setCurrentSelection] = useState<string>("");
  const [sidebarWidth, setSidebarWidth] = useState(250); // Initial width
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);

  const location = useLocation();
  const isMobile = useIsMobile();
  // console.log(isMobile);
  const themeGlobal = useAppSelector(globalTheme);
  const handleResizeStart = (e: any) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleResizeDrag = (e: any) => {
      const newWidth = sidebarWidth + (e.clientX - startX);
      setSidebarWidth(newWidth);
    };

    const handleResizeEnd = () => {
      document.removeEventListener("mousemove", handleResizeDrag);
      document.removeEventListener("mouseup", handleResizeEnd);
    };

    document.addEventListener("mousemove", handleResizeDrag);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  // useEffect(() => {
  //   const index = location.pathname.indexOf(
  //     "/",
  //     location.pathname.indexOf("/", location.pathname.indexOf("/") + 1) + 1
  //   );
  //   const result =
  //     index !== -1 ? location.pathname.substring(0, index) : location.pathname;
  //   console.log("result", result);
  //   setCurrentSelection(result);
  //   const modulePath = location.pathname.split("/")[1];
  //   console.log("modulePath", modulePath);
  //   setOpenKeys([modulePath]);
  // }, [location]);

  const rootSubmenuKeys = menuItems(user).map((item: any) => item?.key);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleClick: MenuProps["onClick"] = (e) => {
    setCurrentSelection(e.key);
  };
  interface DataObject {
    children?: DataObject[] | null;
    icon: string;
    key: string;
    label: any;
  }
  function findObjectWithKey(
    data: DataObject[],
    path: {
      pathname: string;
      state?: string;
    },
    parentIndices: string[] = []
  ): string[] | null {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === null) {
        continue;
      }
      const object = data[i];

      if (object.key === path.pathname || object.key === path?.state) {
        return [...parentIndices, object.key];
      }
      if (object.children && Array.isArray(object.children)) {
        const childIndices = findObjectWithKey(object.children, path, [
          ...parentIndices,
          object.key,
        ]);
        if (childIndices) {
          return childIndices;
        }
      }
    }
    return null;
  }

  useEffect(() => {
    const indices = findObjectWithKey(menuItems(user) as DataObject[], {
      pathname: location.pathname,
      state: location.state,
    });
    if (indices) {
      setOpenKeys(indices);
      setCurrentSelection(indices[indices.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const { useBreakpoint } = Grid;
  const grid = useBreakpoint();
  useEffect(() => {
    if (grid.xs) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [grid.xs]);
  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className={
        themeGlobal.theme === theme.defaultAlgorithm ? "sidebar-arrow" : ""
      }
    >
      <Layout hasSider>
        <Sider
          theme="light"
          // collapsible
          collapsed={collapsed}
          breakpoint="sm"
          style={{
            overflow: "auto",

            height: "100vh",
            position: "sticky",

            left: 0,
            top: 0,
            bottom: 0,
            userSelect: "none",
            transition: "all 0s",
            zIndex: 1,
            backgroundColor:
              themeGlobal.theme === theme.defaultAlgorithm ? "#41918c" : "",
          }}
          width={sidebarWidth}
        >
          <div className="resize-handle" onMouseDown={handleResizeStart} />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
              backgroundColor:
                themeGlobal.theme === theme.defaultAlgorithm ? "#003C43" : "",
            }}
          >
            <Link to="/">
              <img
                src={
                  hotelDetails?.data?.logo && hotelDetails?.data?.logo
                    ? `${imageURL}${hotelDetails?.data?.logo}`
                    : "/logo/reservationlogo.png"
                }
                alt="brand logo"
                width={"120"}
                height={"auto"}
              />
            </Link>
          </div>
          {/* <div style={{ overflow: "auto", height: "680px" }}> */}
          <Menu
            theme={collapsed ? "dark" : "light"}
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={["/dashboard"]}
            items={menuItems(user)}
            selectedKeys={[currentSelection]}
            onClick={handleClick}
            style={{
              backgroundImage:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? "linear-gradient(#003C43,#135D66,#41918c)"
                  : "",

              color: "white",
            }}
          />
          {/* </div> */}
          {collapsed ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "18px",
                margin: "20px",

                border: "1px solid white",
                borderRadius: "15px",
                // backgroundImage:
                //   themeGlobal.theme === theme.defaultAlgorithm
                //     ? `url("/bg/help (3).svg")`
                //     : `url("/bg/help (1).svg")`,
                gap: "18px",
              }}
            >
              {/* <a href="https://www.m360ict.com/" target="_blank">
                <Button
                  style={{ background: "white", border: "white" }}
                  icon={<BiSolidDiamond size={20} color="black" />}
                />
              </a> */}

              <div style={{ width: "100%" }}>
                <div style={{ display: "grid", gap: "5px" }}>
                  <p
                    style={{
                      color: "white",
                      fontWeight: 700,
                      lineHeight: 1,

                      fontSize: "16px",
                    }}
                  >
                    Hello, {data?.data?.name}
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    Need help?
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontWeight: 600,
                      lineHeight: 1,
                      fontSize: 11,
                    }}
                  >
                    Please click below for help
                  </p>
                </div>
                <a href="https://www.m360ict.com/" target="_blank">
                  <Button
                    size="small"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      width: "100%",
                      borderRadius: "8px",
                      marginTop: "12px",

                      background: "white",
                      // background: "#f7bb00",
                      color: "#41918c",
                      // color: "white",
                    }}
                  >
                    CLICK HERE
                  </Button>
                </a>
              </div>
            </div>
          )}
        </Sider>

        <Layout
          // style={isMobile ? { marginLeft: 70 } : { marginLeft: true ? 220 : 0 }}
          style={
            isMobile?.isMobile
              ? { marginLeft: 0 }
              : { marginLeft: true ? 0 : 0 }
          }
        >
          <Content
            style={{
              padding: 22,
              // paddingTop: "80px",
              paddingTop: "10px",

              backgroundColor:
                themeGlobal.theme === theme.defaultAlgorithm ? "#f9f9f7" : "",

              backgroundImage:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? `url('/bg/Animated Shape (3).svg')`
                  : `url('/bg/Animated Shape (4).svg')`,

              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <NavBar setCollapsed={setCollapsed} collapsed={collapsed} />
            <Outlet />
            {/* <SupportMessage /> */}
          </Content>
          <Footer
            style={{
              textAlign: "center",
              padding: 8,
              margin: 0,
              fontSize: 13,
              // color: "#343a40",

              color:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? "#000000"
                  : "#f9f9f7",
            }}
          >
            <strong>
              Copyright ©{" "}
              <span className="text-blue-400">{new Date().getFullYear()}</span>.
              All Rights Reserved. Design & Developed By
              <a
                href="https://www.m360ict.com/"
                target="_blank"
                className="ml-1 text-blue-400"
              >
                M360ICT
              </a>
            </strong>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
