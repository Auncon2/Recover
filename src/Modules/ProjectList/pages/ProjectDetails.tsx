import { useParams } from "react-router-dom";
import {
  useGetProjectDetailsQuery,
  useUpdateProjectMutation,
} from "../api/ProjectListEndPoints";
import { IViewProjectView } from "../types/ProjectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Col, Select } from "antd";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: projectDetails } = useGetProjectDetailsQuery<
    IViewProjectView | any
  >(Number(id));
  const [edit, setEdit] = useState(false);
  const [changed, setChanged] = useState("");
  const [updateProject] = useUpdateProjectMutation();
  console.log("object", changed);

  // const projectData: IViewProjectView | undefined = projectDetails?.data;

  console.log("data", projectDetails);

  const {
    approval_status,
    description,
    developerenvironmentalimpact,
    developerprojectimages,
    location,
    projectname,
    projectstatus,
    projecttype,
    projectunits,
  } = projectDetails?.data[0] || {};

  const handleUpdate = () => {
    setEdit(false);
    updateProject({ id, data: { status: changed } });
  };

  const handleChanged = (value: string) => {
    setChanged(value);
  };

  return (
    <div>
      <div className="space-y-1 ">
        <div className="flex space-x-5">
          <div className="font-semibold space-y-3  w-[20rem]">
            <h1>Project Name</h1>
            <h1>Project Status</h1>
            <h1>Project Type</h1>
            <h1>Location</h1>
            <h1>Approval Status</h1>
            <h1>Description</h1>
          </div>
          <div className="space-y-3 ">
            <p className="space-x-5">
              <span className="font-bold">:</span>
              <span>{projectname}</span>
            </p>
            <p className="space-x-5">
              <span className="font-bold">:</span>
              <span>{projectstatus}</span>
            </p>
            <p className="space-x-5">
              <span className="font-bold">:</span>
              <span>{projecttype}</span>
            </p>
            <p className="space-x-5">
              <span className="font-bold">:</span>
              <span>{location}</span>
            </p>
            <p className="space-x-5 flex">
              <span className="font-bold">:</span>
              {!edit ? (
                <span>{approval_status}</span>
              ) : (
                <Col xs={24} sm={12} md={12} lg={2}>
                  <Select
                    defaultValue={approval_status}
                    style={{ width: "100%" }}
                    onChange={handleChanged}
                  >
                    <Select.Option value="APPROVED">Approved</Select.Option>
                    <Select.Option value="REJECTED">Rejected</Select.Option>
                    <Select.Option value="PENDING">Pending</Select.Option>
                  </Select>
                </Col>
              )}

              {!edit ? (
                <button onClick={() => setEdit(true)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              ) : (
                <button onClick={handleUpdate}>
                  <FontAwesomeIcon icon={faUpload} />
                </button>
              )}
            </p>
            <p className="space-x-5">
              <span className="font-bold">:</span>
              <span>{description}</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold my-3 underline">Property Units </p>
        <div className=" grid lg:grid-cols-3 gap-10 ">
          {projectunits?.map((pr: any, i: number) => (
            <div key={i} className="border rounded">
              <p className="text-center py-2 bg-slate-400 font-semibold text-base">
                {pr?.availabilitystatus}
              </p>
              <div className="my-5 mx-6">
                <div className="flex space-x-5">
                  <div className="font-semibold space-y-3">
                    <h1>Price</h1>
                    <h1>Floor Number</h1>
                    <h1>Square Footage</h1>
                    <h1>Unit Name</h1>
                    <h1>Unit Type</h1>
                  </div>
                  <div className="space-y-3">
                    <p className="space-x-5">
                      <span className="font-bold">:</span>
                      <span>{pr?.price}</span>
                    </p>
                    <p className="space-x-5">
                      <span className="font-bold">:</span>
                      <span>{pr?.floornumber}</span>
                    </p>
                    <p className="space-x-5">
                      <span className="font-bold">:</span>
                      <span>{pr?.squarefootage}</span>
                    </p>
                    <p className="space-x-5">
                      <span className="font-bold">:</span>
                      <span>{pr?.unitname}</span>
                    </p>
                    <p className="space-x-5">
                      <span className="font-bold">:</span>
                      <span>{pr?.unittype}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold my-3 underline">Developer Environmental</p>
        <div className=" grid lg:grid-cols-3 gap-10 ">
          {developerenvironmentalimpact?.map((pr: any, i: number) => (
            <div key={i} className="border rounded">
              <p className="text-center py-2 bg-slate-400 font-semibold text-base">
                {pr?.certificationstatus}
              </p>
              <div className="mx-8 my-5 space-y-2">
                <div className="flex space-x-5 ">
                  <h1 className="font-semibold  lg:w-[8rem] ">
                    Impact Category
                  </h1>
                  <span>:</span>
                  <span className=" lg:w-[18rem]">{pr?.impactcategory}</span>
                </div>
                <div className="flex space-x-5 ">
                  <h1 className="font-semibold w-[5rem] lg:w-[8rem] ">
                    Impact Value
                  </h1>
                  <span>:</span>
                  <span className=" w-[10rem] lg:w-[18rem]">
                    {pr?.impactvalue}
                  </span>
                </div>
                <div className="flex space-x-5">
                  <h1 className="font-semibold w-[3rem] lg:w-[8rem] ">
                    Impact Description
                  </h1>
                  <span>:</span>
                  <span className=" w-[10rem] lg:w-[18rem]">
                    {pr?.impactdescription}
                  </span>
                </div>
                <div className="flex space-x-5">
                  <h1 className="font-semibold w-[3rem] lg:w-[8rem] ">Notes</h1>
                  <span>:</span>
                  <span className=" w-[10rem] lg:w-[18rem]">{pr?.notes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold my-3 underline">Developer Project Images</p>
        <div className=" grid lg:grid-cols-3 gap-10 ">
          {developerprojectimages?.map((pr: any, i: number) => (
            <div key={i} className="border rounded">
              <div>
                <img
                  className="lg:h-[20rem] lg:w-full"
                  src={`http://192.168.0.244:5000/dev/${pr?.imagefileurl}`}
                  alt="Developer Project Image"
                  srcSet=""
                />
              </div>
              <div className="mx-8 my-5 space-y-2">
                <div className="flex space-x-5 ">
                  <h1 className="font-semibold w-[3rem] lg:w-[8rem] ">
                    Image Caption
                  </h1>
                  <span>:</span>
                  <span className=" w-[10rem] lg:w-[18rem]">
                    {pr?.imagecaption}
                  </span>
                </div>
                <div className="flex space-x-5">
                  <h1 className="font-semibold w-[3rem] lg:w-[8rem] ">Notes</h1>
                  <span>:</span>
                  <span className=" w-[10rem] lg:w-[18rem]">{pr?.notes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
