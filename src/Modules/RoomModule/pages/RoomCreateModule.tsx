import { Breadcrumb, Button, Card, Col, Row } from "antd";
import RoomCreateForm from "../components/RoomCreateForm";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const RoomCreateModule = () => {
  // const themeGlobal = useAppSelector(globalTheme);
  return (
    <>
      <div className="mt-5 mb-11">
        <Breadcrumb
          separator=">"
          items={[
            {
              href: "/",
              title: (
                <>
                  <HomeOutlined className=" me-1" />
                  <span>Dashboard</span>
                </>
              ),
            },
            {
              href: "",
              title: (
                <>
                  {/* <UserOutlined /> */}
                  <span>Room</span>
                </>
              ),
            },
            {
              title: <span className="text-[#1B9FA2]">Create Room</span>,
            },
          ]}
        />
      </div>
      {/* <Card
        style={{
          boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
          marginBottom: "1rem",
          backgroundImage:
            themeGlobal.theme === theme.defaultAlgorithm
              ? `url('/bg/svg (3).png')`
              : `url('/bg/svg (4).png')`,

          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      > */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mb-5 md:gap-0">
        <span
          className="text-xl md:text-lg font-bold text-[#01adad]"
          style={{ textTransform: "uppercase" }}
        >
          Create Room
        </span>
        <Link to={`/hotel/room-list`}>
          <Button
            icon={<FaArrowLeftLong />}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "190px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Go to Room List
          </Button>
        </Link>
      </div>
      {/* </Card> */}

      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* <Typography.Title level={5}>Create Room</Typography.Title> */}
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <RoomCreateForm />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RoomCreateModule;
