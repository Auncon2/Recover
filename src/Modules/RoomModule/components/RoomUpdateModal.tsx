import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
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
import { useUpdateHotelRoomMutation } from "../api/HotelRoomEndPoints";
import { useParams } from "react-router-dom";
import { useGetAmenitiesTypelistQuery } from "../../Settings/api/AmentiesEndPoints";
import TextArea from "antd/es/input/TextArea";
import { useGetRoomTypelistQuery } from "../../Settings/api/RoomTypesEndPoint";
import { useGetBedTypelistQuery } from "../../Settings/api/BedTypesEndPoints";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const RoomUpdateModal = ({ onClose, singleHotelRoomDetails }: any) => {
  const [status, _setStatus] = useState<any>({ status: 1 });
  const { data: amenitesTypesData } = useGetAmenitiesTypelistQuery(status);
  const { id } = useParams();
  const [form] = useForm();
  const [updateHotelRoom, { isSuccess }] = useUpdateHotelRoomMutation();
  const { data: roomTypesData } = useGetRoomTypelistQuery(status);
  const { data: bedTypesData } = useGetBedTypelistQuery(status);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any>([]);
  const [photosList, setPhotosList] = useState<any>([]);
  const [deletedPhotosIds, setDeletedPhotosIds] = useState<number[]>([]);
  // const [amenity, setAmenity] = useState<number[]>([]);
  // const removeamenitiess = useWatch("removeamenities", form);
  const discounTT = useWatch("discountt", form);
  const refundablEE = useWatch("refundablee", form);

  const handlePhotoDelete = (value: number) => {
    const newPhoto = photosList?.filter((item: any) => item.id !== value);
    setPhotosList(newPhoto);
    setDeletedPhotosIds((prevIds) => [...prevIds, value]);
  };
  console.log("singleHotelRoomDetails", singleHotelRoomDetails);
  useEffect(() => {
    if (singleHotelRoomDetails) {
      const photosArray =
        singleHotelRoomDetails?.room_images?.map((photo: any) => ({
          id: photo?.id,
          photo: photo?.photo,
        })) || [];

      setPhotosList(photosArray);
    }
  }, [singleHotelRoomDetails]);

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

  const childNumber = useWatch("child", form);
  const adultNumber = useWatch("adult", form);

  useEffect(() => {
    form.setFieldValue("occupancy", childNumber + adultNumber || 0);
  }, [adultNumber, childNumber, form]);

  useEffect(() => {
    if (singleHotelRoomDetails) {
      form.setFieldValue("room_number", singleHotelRoomDetails?.room_number);
      form.setFieldValue("room_type", singleHotelRoomDetails?.room_type);
      form.setFieldValue("room_size", singleHotelRoomDetails?.room_size);

      form.setFieldValue("bed_type", singleHotelRoomDetails?.bed_type);
      form.setFieldValue(
        "rate_per_night",
        singleHotelRoomDetails?.rate_per_night
      );
      form.setFieldValue(
        "availabilityy",
        singleHotelRoomDetails?.availability.toString()
      );
      form.setFieldValue(
        "refundablee",
        singleHotelRoomDetails?.refundable.toString()
      );
      form.setFieldValue(
        "discount_percent",
        singleHotelRoomDetails?.discount_percent
          ? singleHotelRoomDetails?.discount_percent
          : 0
      );
      form.setFieldValue(
        "tax_percent",
        singleHotelRoomDetails?.tax_percent
          ? singleHotelRoomDetails?.tax_percent
          : 0
      );
      form.setFieldValue(
        "description",
        singleHotelRoomDetails?.room_description
      );
      form.setFieldValue(
        "discountt",
        singleHotelRoomDetails?.discount.toString()
      );
      form.setFieldValue(
        "refundable_time",
        singleHotelRoomDetails?.refundable_time
          ? singleHotelRoomDetails?.refundable_time
          : 0
      );
      form.setFieldValue(
        "refundable_charge",
        singleHotelRoomDetails?.refundable_charge
          ? singleHotelRoomDetails?.refundable_charge
          : 0
      );
      form.setFieldValue(
        "aminities_charge",
        singleHotelRoomDetails?.aminities_charge
      );
      form.setFieldValue("child", singleHotelRoomDetails?.child);
      form.setFieldValue("adult", singleHotelRoomDetails?.adult);
      form.setFieldValue("discount", singleHotelRoomDetails?.discount);
      form.setFieldValue("room_amenities", ["jhjh"]);
    }
  }, [form, singleHotelRoomDetails]);
  // useEffect(() => {
  //   if (discounTT === "0") {
  //     form.resetFields(["discount_percent"]);
  //   }
  // }, [discounTT]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    const {
      picccc,
      refundablee,
      availabilityy,
      removeamenities,
      roomaminities,
      discount_percent,
      discountt,
      ...rest
    } = values;

    for (const key in rest) {
      if (rest[key]) {
        formData.append(key, rest[key]);
      }
    }
    if (discounTT === "1" && discount_percent) {
      formData.append("discount_percent", discount_percent);
    } else if (discounTT === "0" && discount_percent) {
      formData.append("discount_percent", "0");
    }
    if (discountt) {
      formData.append("discount", discountt);
    }
    if (availabilityy) {
      formData.append("availability", availabilityy);
    }
    if (refundablee) {
      formData.append("refundable", refundablee);
    }
    if (roomaminities) {
      formData.append("room_amenities", JSON.stringify(roomaminities));
    }
    if (removeamenities) {
      formData.append("remove_amenities", JSON.stringify(removeamenities));
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
    updateHotelRoom({ id: Number(id), data: formData });
    console.table(Object.fromEntries(formData));
    onClose();
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields(["picccc"]);

      form.setFieldsValue({
        roomaminities: [],
        removeamenities: [],
      });
      setFileList([]);
    }
  }, [form, isSuccess]);

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
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Room Number"
              name="room_number"
              style={{ width: "100%" }}
            >
              <Input
                type="text"
                placeholder="Enter Room Number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Room Type"
              name="room_type"
              style={{ width: "100%" }}
            >
              <Select style={{ width: "100%" }} placeholder="Select Room Type">
                {roomTypesData?.data?.map((room: any) => (
                  <Select.Option key={room.id} value={room.room_type}>
                    {room.room_type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label={<span> Room size (in sqft)</span>}
              name="room_size"
              style={{ width: "100%" }}
            >
              <InputNumber
                type="number"
                placeholder="Enter Room size in sqft"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Bed Type"
              name="bed_type"
              style={{ width: "100%" }}
            >
              <Select style={{ width: "100%" }} placeholder="Select Bed Type">
                {bedTypesData?.data?.map((bed: any) => (
                  <Select.Option key={bed.id} value={bed.bed_type}>
                    {bed.bed_type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Rate Per Night"
              name="rate_per_night"
              style={{ width: "100%" }}
            >
              <InputNumber
                type="number"
                placeholder="Enter Rate Per Night"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Discount"
              name="discountt"
              style={{ width: "100%" }}
            >
              {/* <Select style={{ width: "100%" }} placeholder="Select discount">
                <Select.Option value="1">Yes</Select.Option>
                <Select.Option value="0">No</Select.Option>
              </Select> */}
              <Select
                style={{ width: "100%" }}
                placeholder="Select discount"
                options={[
                  { value: "1", label: "Yes" },
                  { value: "0", label: "No" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Discount percent (%)"
              name="discount_percent"
              style={{ width: "100%" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value > 100) {
                      return Promise.reject(
                        "Discount Percentage cannot exceed 100"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                disabled={discounTT === "0" ? discounTT : false}
                type="number"
                placeholder="Enter Discount percentage"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Tax percent (%)"
              name="tax_percent"
              style={{ width: "100%" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value > 100) {
                      return Promise.reject("Tax Percentage cannot exceed 100");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                type="number"
                placeholder="Enter Tax percentage"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Refundable"
              name="refundablee"
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Refundable"
                options={[
                  { value: "1", label: "Refundable" },
                  { value: "0", label: "Non-refundable" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Refundable time "
              name="refundable_time"
              style={{ width: "100%" }}
            >
              <InputNumber
                disabled={refundablEE === "0" ? refundablEE : false}
                type="number"
                placeholder="Enter Refundable time"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Refundable charge"
              name="refundable_charge"
              style={{ width: "100%" }}
            >
              <InputNumber
                disabled={refundablEE === "0" ? refundablEE : false}
                type="number"
                placeholder="Enter Refundable Charge "
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Child"
              name="child"
              style={{ width: "100%" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value > 10) {
                      return Promise.reject("Child cannot exceed 10");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                type="number"
                placeholder="Enter Child"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Adult"
              name="adult"
              style={{ width: "100%" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value > 10) {
                      return Promise.reject("Adult cannot exceed 10");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                type="number"
                placeholder="Enter Adult"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Occupancy"
              name="occupancy"
              style={{ width: "100%" }}
            >
              <InputNumber
                type="number"
                // type="text"
                placeholder="Enter Occupancy"
                style={{ width: "100%" }}
                readOnly
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item label="Room amenities " name="roomaminities">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                // defaultValue={["a10", "c12"]}
                placeholder="Select Room Amenities"
              >
                {amenitesTypesData?.data?.map((amenities) => (
                  <Select.Option key={amenities.id} value={amenities.id}>
                    {amenities.room_amenities}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Amenities charge"
              name="aminities_charge"
              style={{ width: "100%" }}
            >
              <InputNumber
                type="number"
                placeholder="Enter Amenities charge"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"start"} gutter={[20, 0]}>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Description"
              name="description"
              style={{ width: "100%" }}
            >
              <TextArea
                rows={4}
                placeholder="Enter Others details"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item label="Upload room pictures" name="picccc">
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
        <Row>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label={
                <span className="text-red-600">Delete Room amenities</span>
              }
              name="removeamenities"
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                // defaultValue={["a10", "c12"]}
                placeholder="Select Room Amenities to Delete"
              >
                {singleHotelRoomDetails?.room_amenities?.map(
                  (amenities: any) => (
                    <Select.Option key={amenities.id} value={amenities.id}>
                      {amenities.name}
                    </Select.Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Form.Item
            label={<span className="text-red-600">Delete room pictures</span>}
            style={{ marginLeft: "10px" }}
          >
            <div className="grid grid-cols-3 md:grid-cols-6 gap-5 mx-auto">
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
            // loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RoomUpdateModal;
