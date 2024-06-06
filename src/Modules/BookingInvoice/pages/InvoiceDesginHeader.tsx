import { imageURL } from "../../../app/slice/baseQuery";

const InvoiceDesginHeader = ({ data }: any) => {
  const { hotel_address, hotel_email, hotel_phone, hotel_website, hotel_logo } =
    data?.data || {};

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="w-[200px] ">
          <img src={imageURL + hotel_logo} draggable="false" alt="" srcSet="" />
        </div>
        <div className="flex items-center me-3">
          <div className="w-[160px]">
            <img
              src={`../../../../public/scaner.png`}
              draggable="false"
              alt=""
              srcSet=""
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-emerald-800">Reservation</h1>
            <div className="my-3">
              <p>
                <span className="font-semibold">Address :</span> {hotel_address}
              </p>
              <p>
                <span className="font-semibold">Mobile :</span> {hotel_phone}
              </p>
              <p>
                <span className="font-semibold">Email :</span> {hotel_email}
              </p>
              <p>
                <span className="font-semibold">Webite :</span> {hotel_website}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDesginHeader;
