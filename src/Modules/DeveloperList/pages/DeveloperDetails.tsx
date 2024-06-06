import { useParams } from "react-router-dom";
import {
  useGetDeveloperDetailsQuery,
  useUpdateDeveloperMutation,
} from "../api/DeveloperListEndPoints";
import { IViewDeveloperDetails } from "../types/DeveloperListTypes";

const DeveloperDetails = () => {
  const { id } = useParams();
  const { data: developerDetails } = useGetDeveloperDetailsQuery<
    IViewDeveloperDetails | any
  >(Number(id));
  const [updateDeveloper] = useUpdateDeveloperMutation();
  console.log("dd", developerDetails?.data);
  const {
    address,
    contactnumber,
    email,
    firstname,
    is_verified,
    lastname,
    profileimageurl,
    username,
    developer_documents,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = developerDetails?.data || {};

  const handleDecline = () => {
    updateDeveloper({ id: Number(id), data: { status: false } });
  };
  const handleApprove = () => {
    updateDeveloper({ id: Number(id), data: { status: true } });
  };

  return (
    <div>
      <div className=" lg:flex lg:justify-between lg:items-center">
        <div className="space-y-1 ">
          <div className="flex space-x-5">
            <div className="font-semibold space-y-3">
              <h1>First Name</h1>
              <h1>Last Name</h1>
              <h1>User Name</h1>
              <h1>Email</h1>
              <h1>Address</h1>
              <h1>Contact Number</h1>
              <h1>Verified</h1>
            </div>
            <div className="space-y-3">
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{firstname}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{lastname}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{username}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{email}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{address}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>{contactnumber}</span>
              </p>
              <p className="space-x-5">
                <span className="font-bold">:</span>
                <span>
                  {is_verified ? (
                    <button
                      onClick={() => handleDecline()}
                      className="border px-4 py-2 rounded bg-red-500 text-white"
                    >
                      Decline
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove()}
                      className="border px-4 py-2 rounded bg-green-500 text-white"
                    >
                      Approve
                    </button>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="avatar lg:mx-20">
          <div className="w-24 rounded-full">
            <img
              src={`http://192.168.0.244:5000/auth/${profileimageurl}`}
              alt={username}
              className=" border-2 rounded-lg w-full"
            />
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div>
        {developer_documents?.map((docu: any, i: number) => (
          <div key={i} className="lg:flex py-5 border">
            <iframe
              className="border w-[40rem]"
              title="PDF Viewer"
              width="800px"
              height="600px"
              src={`http://192.168.0.244:5000/dev/document/${docu?.documentfileurl}`}
            ></iframe>
            <div className="py-5 space-y-1 mx-10 w-[60rem] break-words">
              <p className="font-bold text-xl">
                Document Name : <span>{docu?.documentname}</span>
              </p>
              <p className=""> Notes : {docu?.notes}</p>
              <p> Upload Date : {docu?.uploaddate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperDetails;
