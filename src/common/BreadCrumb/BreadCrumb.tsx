import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb: React.FC = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((item) => item);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return (
    <Breadcrumb
      style={{ padding: "0.5rem" }}
      items={[
        {
          title: (
            <Link to="/">
              <HomeOutlined />
            </Link>
          ),
        },
        ...pathnames.map((item, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          if (isLast) {
            return {
              title: capitalize(item),
            };
          }
          return {
            title: <Link to={`${routeTo}`}>{capitalize(item)}</Link>,
          };
        }),
      ]}
    />
  );
};

export default BreadCrumb;
