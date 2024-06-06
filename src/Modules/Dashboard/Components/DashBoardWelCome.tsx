import { Button, Card, Col, Row } from "antd";
import { motion } from "framer-motion";
import { useGetMeQuery } from "../../../app/api/userApi/userApi";
import { useGetSingleHotelQuery } from "../../Settings/api/SettingsEndPoints";

import "../DashboardCSS.css";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const DashBoardWelCome = () => {
  const { data: HotelsDetails } = useGetSingleHotelQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // {},
  // {
  //   refetchOnMountOrArgChange: true,
  // }

  const { data } = useGetMeQuery();
  const profileInfo = data?.data;

  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   if (HotelsDetails?.data?.hotel_images) {
  //     const photoArray = HotelsDetails?.data?.hotel_images.map(
  //       (image) => image.photo
  //     );
  //     console.log("photoArray", photoArray);
  //     setImages(photoArray as any);
  //   }
  // }, [HotelsDetails?.data?.hotel_images]);

  // ..........image .animation............
  // const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   // Generate a unique index based on the current timestamp
  //   const newIndex = Math.floor(Date.now() / 1000) % images.length;
  //   console.log("newIndex", newIndex);
  //   setIndex(newIndex);
  // }, [images.length]);

  return (
    <>
      <Row gutter={[12, 16]}>
        <Col xs={24} md={24} lg={24} xl={24} xxl={16}>
          {/* .............................left side........................................................................... */}
          <motion.div
            className="flex justify-center items-center bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden shadow-lg "
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              style={{ width: "100%", height: "100%" }}
              className="hidden md:block"
            >
              <div className="flex justify-between items-center w-full">
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center "
                >
                  <div className="flex flex-col font-semibold ml-5 gap-2">
                    <span className="text-6xl text-teal-600 -ml-2 font-sans merriweather-light">
                      Hello, {profileInfo?.name}
                    </span>

                    <span className="text-teal-500 text-lg mt-1 font-semibold font-sans merriweather-light ">
                      Welcome to the {HotelsDetails?.data?.name} family!
                    </span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 5,
                        marginTop: "10px",
                      }}
                    >
                      <Link to={`hotel/room-list`}>
                        <Button
                          style={{
                            borderRadius: "50px",
                            display: "flex",
                            alignItems: "center",
                            borderColor: "#0f9b9d",
                            color: "#0f9b9d",
                            fontWeight: "bold",
                          }}
                        >
                          Make Room Booking
                        </Button>
                      </Link>
                      <Link to={`hall/hall-list`}>
                        <Button
                          style={{
                            borderRadius: "50px",
                            display: "flex",
                            alignItems: "center",
                            borderColor: "#0f9b9d",
                            color: "#0f9b9d",
                            fontWeight: "bold",
                          }}
                        >
                          Make Hall Booking
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <img
                    src="/bg/welcome4.png"
                    alt="login"
                    // width={"auto"}
                    // height={"auto"}
                    className="bg-cover bg-center bg-no-repeat hidden lg:block w-[290px] 2xl:w-[392px] h-full"
                  />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </Col>
        {/* ........................right side card............................................ */}
        <Col xs={24} md={24} lg={24} xl={8} xxl={8}>
          <div className="hidden 2xl:block w-full h-full">
            <motion.div
              className="relative  bg-black flex items-center justify-center  w-full h-full text-white font-bold bg-cover bg-center bg-no-repeat rounded-md overflow-hidden shadow-lg "
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                backgroundImage: `url("/bg/fixedpic2.jpg")`,
                opacity: 0.2,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center items-center p-7"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <div className="flex flex-col ml-2">
                      <p className="text-white backdrop-blur-0 text-2xl">
                        {HotelsDetails?.data?.name}
                      </p>
                      <p className="text-white backdrop-blur-0 ">
                        {HotelsDetails?.data?.email ? (
                          HotelsDetails?.data?.email
                        ) : (
                          <Link to={"/setting/hotel_profile"}>
                            Update Hotel E-mail
                          </Link>
                        )}
                      </p>
                      <p className="text-white backdrop-blur-0 ">
                        {HotelsDetails?.data?.address ? (
                          HotelsDetails?.data?.address
                        ) : (
                          <Link to={"/setting/hotel_profile"}>
                            Update Hotel Address
                          </Link>
                        )}
                      </p>
                      <p className="text-white backdrop-blur-0 ">
                        {HotelsDetails?.data?.city &&
                        HotelsDetails?.data?.country ? (
                          `${HotelsDetails?.data?.city}, ${HotelsDetails?.data?.country}`
                        ) : (
                          <Link to={"/setting/hotel_profile"}>
                            Update City, Country
                          </Link>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col text-white px-4 py-2 backdrop-blur-3xl rounded-md border">
                      <p className=" text-sm">{dayjs().format("D")}</p>
                      <p className="text-base">{dayjs().format("MMM")}</p>
                    </div>
                  </div>
                  <p className="text-xs xl:text-sm font-normal backdrop-blur-3xl px-3 py-2 rounded-md borber ">
                    {HotelsDetails?.data?.description ? (
                      HotelsDetails?.data?.description.slice(0, 400)
                    ) : (
                      <p>
                        we provide the best service to all our customers. you
                        will have the best experience here. our website provides
                        a user-friendly platform for easy booking with a clean
                        interface.
                        <Link to={"/setting/hotel_profile"}>
                          Update Hotel Description
                        </Link>
                      </p>
                    )}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashBoardWelCome;
