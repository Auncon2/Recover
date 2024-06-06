import { App } from "antd";
import { RouterProvider } from "react-router";
import { routers } from "./router";
import { ConfigProvider, theme } from "antd";
import { useAppSelector } from "./app/store/store";
import { globalTheme } from "./app/slice/themeSlice";
import CommonModal from "./common/Modal/CommonModal";
import { useRef } from "react";

function MyApp() {
  const themeApp = useAppSelector(globalTheme);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  return (
    <ConfigProvider
      theme={{
        algorithm: themeApp.theme,
        token: {
          // colorPrimary: "#b3836f",
          colorPrimary: "#01adad",
          colorBgContainer:
            themeApp.theme === theme.defaultAlgorithm ? "#ffffff" : "#0d1117",
        },
      }}
      getPopupContainer={() => modalContainerRef.current as HTMLElement}
    >
      <App>
        <div ref={modalContainerRef}>
          <RouterProvider router={routers} />
          <CommonModal />
        </div>
      </App>
    </ConfigProvider>
  );
}
export default MyApp;
