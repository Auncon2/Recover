import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { imageURL } from "../../../app/slice/baseQuery";
import { useParams } from "react-router-dom";
import { useUpdateHallMutation } from "../api/HallEndPoints";
import { useGetHallAmenitiesTypelistQuery } from "../../HallAmenities/api/HallAmenitiesEndPoint";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const HallUpdate = ({ onClose, singleHallDetails }: any) => {
  const [status, _setStatus] = useState<any>({ status: 1 });
  const { data: hallAmenitiesData } = useGetHallAmenitiesTypelistQuery(status);
  const { id } = useParams();
  const [form] = useForm();
  const [updateHall, { isSuccess, isLoading }] = useUpdateHallMutation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any>([]);
  const [photosList, setPhotosList] = useState<any>([]);
  const [deletedPhotosIds, setDeletedPhotosIds] = useState<number[]>([]);
  console.log("fileList", fileList, "deletedPhotosIds", deletedPhotosIds);

  const removeamenitiess = useWatch("removeamenities", form);
  console.log("removeamenitiess", removeamenitiess);
  const handlePhotoDelete = (value: number) => {
    const newPhoto = photosList?.filter((item: any) => item.id !== value);
    setPhotosList(newPhoto);
    setDeletedPhotosIds((prevIds) => [...prevIds, value]);
  };

  useEffect(() => {
    if (singleHallDetails) {
      const photosArray =
        singleHallDetails?.hall_images?.map((photo: any) => ({
          id: photo?.id,
          photo: photo?.photo,
        })) || [];

      setPhotosList(photosArray);
    }
  }, [singleHallDetails]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  useEffect(() => {
    if (singleHallDetails) {
      form.setFieldValue("name", singleHallDetails?.name);
      form.setFieldValue("size", singleHallDetails?.hall_size);
      form.setFieldValue("rate_per_hour", singleHallDetails?.rate_per_hour);
      form.setFieldValue("capacity", singleHallDetails?.capacity);
      form.setFieldValue("location", singleHallDetails?.location);
      form.setFieldValue("rate_per_night", singleHallDetails?.rate_per_night);
      form.setFieldValue("hall_status", singleHallDetails?.hall_status);
    }
  }, [form, singleHallDetails]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    const { pic, remove_amenities, hall_amenities, ...rest } = values;

    for (const key in rest) {
      if (rest[key]) {
        formData.append(key, rest[key]);
      }
    }

    if (hall_amenities) {
      formData.append("hall_amenities", JSON.stringify(hall_amenities));
    }
    if (remove_amenities) {
      formData.append("remove_amenities", JSON.stringify(remove_amenities));
    }

    if (fileList) {
      const formattedPhotos = fileList.map((file: any) => {
        return file.originFileObj;
      });
      formattedPhotos.map((img: any) => formData.append("photo", img));
    }
    if (deletedPhotosIds.length > 0) {
      formData.append("remove_photos", JSON.stringify(deletedPhotosIds));
    }
    updateHall({ id: Number(id), data: formData });
    console.table(Object.fromEntries(formData));
    onClose();
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields(["pic", "remove_amenities", "hall_amenities"]);
      form.setFieldsValue({
        roomaminities: [],
        removeamenities: [],
      });
      setFileList([]);
      setDeletedPhotosIds([]);
    }
  }, [isSuccess]);

  return (
    <div>
      <Form
        name="update room"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        key={"id"}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row align={"middle"} justify={"start"} gutter={[20, 0]}>
          {/* name */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item label="Hall Name" name="name" style={{ width: "100%" }}>
              <Input
                type="text"
                placeholder="Enter name"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* size */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item label="Hall Size" name="size" style={{ width: "100%" }}>
              <Input
                type="text"
                placeholder="Enter size"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* rate_per_hour */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Rate Per Hour"
              name="rate_per_hour"
              style={{ width: "100%" }}
            >
              <Input
                type="text"
                placeholder="Enter rate_per_hour"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* capacity */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Capacity"
              name="capacity"
              style={{ width: "100%" }}
            >
              <Input
                type="text"
                placeholder="Enter capacity"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* location */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Location"
              name="location"
              style={{ width: "100%" }}
            >
              <Input
                type="text"
                placeholder="Enter location"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          {/* hall_status */}
          {/* <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Hall Status"
              name="hall_status"
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select hall Status"
                options={[
                  { value: "available", label: "Available" },
                  { value: "booked", label: "Booked" },
                  { value: "maintenance", label: "Maintenance" },
                ]}
              />
            </Form.Item>
          </Col> */}

          {/* hall_amenities */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item label="Hall amenities " name="hall_amenities">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select Hall Amenities"
              >
                {hallAmenitiesData?.data?.map((amenities) => (
                  <Select.Option key={amenities.id} value={amenities.id}>
                    {amenities.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* image */}
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item label="Upload hall pictures" name="pic">
              <Upload
                onChange={(fileList: any) => {
                  setFileList(fileList?.fileList);
                }}
                action="/upload.do"
                listType="picture-card"
                onPreview={handlePreview}
                maxCount={5}
                accept=".png,.jpg,.jpeg"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Col>
        </Row>
        <Row justify={"start"} gutter={[20, 0]}></Row>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item label="Delete hall amenities " name="remove_amenities">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                // defaultValue={["a10", "c12"]}
                placeholder="Select hall Amenities to Delete"
              >
                {singleHallDetails?.hall_amenities?.map((amenities: any) => (
                  <Select.Option key={amenities.id} value={amenities.id}>
                    {amenities.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Form.Item label="Delete Hall pictures">
            <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-5 mx-auto">
              {photosList?.map((img: any, index: number) => (
                <div
                  className="flex flex-col gap-2 overflow-hidden"
                  key={index}
                >
                  <div className="flex justify-end">
                    <GiCancel
                      color="#8f6456"
                      className="hover:cursor-pointer"
                      //   onClick={() => handlePhotoDelete(img.photo)}
                      onClick={() => handlePhotoDelete(img.id)}
                    />
                  </div>

                  <Image
                    key={index}
                    src={`${imageURL + img?.photo}`}
                    alt={`Image ${index + 1}`}
                    width={"auto"}
                    height={70}
                    className=" object-cover  overflow-hidden hover:cursor-pointer "
                    // onClick={() => handlePhotoDelete(img.photo)}
                  />
                </div>
              ))}
            </div>
          </Form.Item>
        </Row>

        <Form.Item wrapperCol={{ offset: 0, span: 16 }} className="my-2">
          <Button
            icon={<SendOutlined />}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "150px",
            }}
            // className="text-bold bg-[#b38b7a] hover:bg-[#b3836f] text-white w-36 "
            htmlType="submit"
            loading={isLoading}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HallUpdate;
