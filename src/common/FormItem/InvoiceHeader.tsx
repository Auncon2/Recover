/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Typography } from "antd";
import TOAB_LOGO from "../../assets/logo.png";
import { imageURL } from "../../app/slice/baseQuery";
// import dayjs from "dayjs";

// export const officeInfo = {
//   name: 'Tour Operators Association of Bangladesh (TOAB)',
//   address1:
//     '2nd FLOOR, Azam Khan Business Center, 105/E West Agargaon, Kamal Soroni Rd, Dhaka 1207',
//   address2:
//     '2nd FLOOR, Azam Khan Business Center, 105/E West Agargaon, Kamal Soroni Rd, Dhaka 1207',
//   modile: '01933-331522',
// };

export const GetInfo = () => {
  return {
    logoProp: {
      height: 80,
      padding: 10,
      borderRadius: 12,
    },
  };
};

export const ReceiptHeader = () => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ flex: 1 }}>
        <img style={GetInfo().logoProp} src={TOAB_LOGO} alt={"TOAB_LOGO"} />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* <QRCode
            size={110}
            color='black'
            iconSize={25}
            bordered={false}
            // icon={orgInfo?.org_logo || '/m360Ict_Logo.png'}
            value={`
Name: ${'BAB'}
Address: ${''}
Mobile No: ${''}
`}
          /> */}
          <div style={{ marginLeft: "15px" }}>
            <Typography.Title
              style={{
                display: "block",
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: "14px",
              }}
            >
              {"Tour Operators Association of Bangladesh (TOAB)"}
            </Typography.Title>

            <Typography.Text
              style={{
                display: "block",
                fontSize: "12px",
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
            >
              {" "}
              <strong> Address :</strong>
              {
                "2nd FLOOR, Azam Khan Business Center, 105/E West Agargaon, Kamal Soroni Rd, Dhaka 1207"
              }
            </Typography.Text>
            <Typography.Text
              style={{
                display: "block",
                fontSize: "12px",
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
            >
              <strong> Mobile :</strong> {"01933-331522"}
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InvoiceHeader = ({
  phone,
  address,
  website,
  logo,
  name,
}: // createdDate,
any) => {
  return (
    <Row
      style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        borderBottom: "2px solid 	#DCDCDC",
      }}
      justify={"space-between"}
      align="middle"
    >
      <Col style={{ display: "flex", alignItems: "center", maxWidth: "30%" }}>
        <img
          src={imageURL + logo}
          alt={"RESERVATION_LOGO"}
          style={GetInfo().logoProp}
          width={200}
        />
      </Col>

      <Col
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "50%",
        }}
      >
        <div className="info">
          <Typography.Title level={3} style={{ color: "black" }}>
            {name}
          </Typography.Title>

          <Typography.Text
            style={{
              display: "block",
              fontSize: "14px",
              fontFamily: "'Source Sans Pro', sans-serif",
              color: "black",
            }}
          >
            <div
              className="w-[4rem]"
              style={{ display: "inline-block", marginRight: "5px" }}
            >
              <strong>Address</strong>
            </div>
            : {address ? address : "N/A"}
          </Typography.Text>

          <Typography.Text
            style={{
              display: "block",
              fontSize: "14px",
              fontFamily: "'Source Sans Pro', sans-serif",
              color: "black",
            }}
          >
            <div
              className="w-[4rem]"
              style={{
                display: "inline-block",
                marginRight: "5px",
                color: "black",
              }}
            >
              <strong>Mobile</strong>
            </div>
            : {phone ? phone : "N/A"}
            <br />
            <div
              className="w-[4rem]"
              style={{
                display: "inline-block",
                marginRight: "5px",
                color: "black",
              }}
            >
              <strong> Website</strong>
            </div>
            : {website ? website : "N/A"}
            <br />
            {/* <div
              className="w-[4rem]"
              style={{ display: "inline-block", marginRight: "5px" }}
            >
              <strong>Date </strong>
            </div>
            : {dayjs(createdDate).format("YYYY-MM-DD")} */}
            <br />
          </Typography.Text>
          <Typography.Text
            style={{
              display: "block",
              fontSize: "14px",
              fontFamily: "'Source Sans Pro', sans-serif",
              color: "black",
            }}
          ></Typography.Text>
        </div>
      </Col>
    </Row>
  );
};

export const ResponsiveInvoiceHeader = ({
  phone,
  address,
  website,
  logo,
  name,
}: any) => {
  return (
    <Row
      style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        borderBottom: "2px solid 	#DCDCDC",
      }}
      justify={"space-between"}
      align="middle"
    >
      <Col
        xs={24}
        md={24}
        lg={8}
        style={
          {
            // display: "flex",
            // alignItems: "center",
            // maxWidth: "30%",
          }
        }
      >
        <img
          src={imageURL + logo}
          alt={"RESERVATION_LOGO"}
          style={GetInfo().logoProp}
        />
      </Col>

      <Col
        xs={24}
        md={24}
        lg={9}
        style={
          {
            // display: "flex",
            // alignItems: "center",
            // maxWidth: "50%",
          }
        }
      >
        <div className="info">
          <Typography.Title level={3} style={{ color: "black" }}>
            {name}
          </Typography.Title>

          <Typography.Text
            style={{
              display: "block",
              fontSize: "14px",
              fontFamily: "'Source Sans Pro', sans-serif",
              color: "black",
            }}
          >
            <div
              className="w-[4rem]"
              style={{ display: "inline-block", marginRight: "5px" }}
            >
              <strong>Address</strong>
            </div>
            : {address ? address : "N/A"}
          </Typography.Text>

          <Typography.Text
            style={{
              display: "block",
              fontSize: "14px",
              fontFamily: "'Source Sans Pro', sans-serif",
              color: "black",
            }}
          >
            <div
              className="w-[4rem]"
              style={{
                display: "inline-block",
                marginRight: "5px",
                color: "black",
              }}
            >
              <strong>Mobile</strong>
            </div>
            : {phone ? phone : "N/A"}
            <br />
            <div
              className="w-[4rem]"
              style={{
                display: "inline-block",
                marginRight: "5px",
                color: "black",
              }}
            >
              <strong> Website</strong>
            </div>
            : {website ? website : "N/A"}
            <br />
            {/* <div
              className="w-[4rem]"
              style={{ display: "inline-block", marginRight: "5px" }}
            >
              <strong>Date </strong>
            </div>
            : {dayjs(createdDate).format("YYYY-MM-DD")} */}
            <br />
          </Typography.Text>
          <Typography.Text
            style={{
              display: "block",
              fontSize: "14px",
              fontFamily: "'Source Sans Pro', sans-serif",
              color: "black",
            }}
          ></Typography.Text>
        </div>
      </Col>
    </Row>
  );
};
