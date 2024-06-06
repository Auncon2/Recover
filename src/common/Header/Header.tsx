import { imageURL } from "../../app/slice/baseQuery";

const Header = ({
  hotel_logo,
  hotel_address,
  hotel_phone,
  hotel_email,
  hotel_website,
}: any) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="w-[200px] ">
        <img src={imageURL + hotel_logo} draggable="false" alt="" srcSet="" />
      </div>
      <div className="flex flex-col md:flex-row items-center me-3">
        <div className="w-[140px]">
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
  );
};

export default Header;
