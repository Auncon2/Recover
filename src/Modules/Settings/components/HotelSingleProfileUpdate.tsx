import { useEffect, useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
} from "antd";

import { useForm } from "antd/es/form/Form";

import type { RcFile, UploadFile } from "antd/es/upload";
import {
  useGetSingleHotelQuery,
  useUpdateSingleHotelMutation,
} from "../api/SettingsEndPoints";
import dayjs from "dayjs";
import { imageURL } from "../../../app/slice/baseQuery";
import { GiCancel } from "react-icons/gi";
import TextArea from "antd/es/input/TextArea";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface HotelSingleProfileUpdateProps {
  onClose: () => void; // Assuming onClose is a function with no arguments
}

const HotelSingleProfileUpdate: React.FC<HotelSingleProfileUpdateProps> = ({
  onClose,
}) => {
  const { data } = useGetSingleHotelQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // {},
  // {
  //   refetchOnMountOrArgChange: true,
  // }
  const [updateHotelProfileData, { isSuccess, isLoading }] =
    useUpdateSingleHotelMutation();
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any>([]);
  const [_deletedAmenitiesIds, setDeletedAmenitiesIds] = useState<number[]>([]);
  const [deletedPhotosIds, setDeletedPhotosIds] = useState<number[]>([]);
  const [_amnitiesList, setAmnitiesList] = useState<any>([]);
  // const [updateamnitiesList, setUpdateAmnitiesList] = useState<any>([]);

  const [photosList, setPhotosList] = useState<any>([]);
  const [amenitiesList, setamenitiesTypeList] = useState<any>([]);
  // const [amenitiescheck, setAmenitiesCheck] = useState<boolean>(false);

  // const handleDelete = (value: string) => {
  //   // const id = data?.data?.hotel_amnities?.find(
  //   //   (item) => item.name === value
  //   // )?.id;

  //   const id = amnitiesList?.find((item: any) => item.name === value)?.id;

  //   if (id) {
  //     setDeletedAmenitiesIds((prevIds) => [...prevIds, id]);
  //   }
  // };

  const handlePhotoDelete = (value: number) => {
    console.log("value", value);
    const newPhoto = photosList?.filter((item: any) => item.id !== value);
    setPhotosList(newPhoto);
    // const idToDelete = data?.data?.hotel_images?.find(
    //   (item) => item.id !== value
    //   // (item) => item.id !== value
    // )?.id;

    setDeletedPhotosIds((prevIds) => [...prevIds, value]);
  };
  console.log("photosList", photosList, "deletedPhotosIds", deletedPhotosIds);
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
    if (data) {
      const photosArray =
        data?.data?.hotel_images?.map((photo) => ({
          id: photo?.id,
          photo: photo?.photo,
        })) || [];
      setPhotosList(photosArray);
    }
  }, [data]);
  // useEffect(() => {
  //   const photosArray =
  //     (data?.data?.hotel_images || []).map((photo) => ({
  //       uid: `${photo.id}`,
  //       url: `${imageURL}${photo.photo}`,
  //     })) || [];
  //   setPhotosList(photosArray);
  // });

  useEffect(() => {
    if (data) {
      // const amenitiesArray =
      //   data?.data?.hotel_amnities?.map((amenity) => amenity?.name) || [];
      const amenitiesArray =
        data?.data?.hotel_amnities?.map((amenity) => ({
          id: amenity?.id,
          name: amenity?.name,
        })) || [];

      setAmnitiesList(amenitiesArray);
      // setUpdateAmnitiesList(amenitiesArray.map((amenity) => amenity.name));

      form.setFieldsValue({
        id: data?.data?.id,
        name: data?.data?.name,
        city: data?.data?.city,
        country: data?.data?.country,
        description: data?.data?.description,
        phone: data?.data?.phone != null ? data?.data?.phone : 0,
        map_url: data?.data?.map_url,
        website: data?.data?.website,
        email: data?.data?.email,
        logo: data?.data?.name,
        address: data?.data?.address,
        founded_year:
          data?.data?.founded_year != null
            ? dayjs(data?.data?.founded_year)
            : dayjs(),

        zip_code: data?.data?.zip_code != null ? data?.data?.zip_code : 0,
        postal_code:
          data?.data?.postal_code != null ? data?.data?.postal_code : 0,
        group: data?.data?.group,
        // delete_amnities: amenitiesArray.map((amenity) => amenity.name),
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (data) {
      const AmenitiesType =
        data?.data?.hotel_amnities?.map((value: any, index: any) => ({
          value: value.id,
          label: value.name,
          id: value.id,
          key: `room_${value.name}_${index}`,
        })) || [];
      setamenitiesTypeList(AmenitiesType);
    }
  }, [data]);

  const onFinish = (values: any) => {
    const { picccc, hotelamnities, logo, delete_amnities, ...all } = values;
    const formData = new FormData();

    const amenitiesValuesArray = values.hotelamnities?.map(
      (amenity: { first: string }) => amenity.first
    );

    // const amenitiesArray = JSON.parse(JSON.stringify(amenitiesValuesArray));
    // const updateArray = JSON.parse(JSON.stringify(updateamnitiesList));
    for (const key in all) {
      if (all[key] !== undefined) {
        // if (key === "hotel_amnities") {
        //   formData.append(key, JSON.stringify(amenitiesValuesArray));
        // } else {
        //   formData.append(key, all[key]);
        // }
        formData.append(key, all[key]);
      }
    }

    if (logo?.file?.originFileObj && logo !== String) {
      formData.append("logo", logo?.file?.originFileObj);
    }

    if (fileList?.length) {
      fileList.forEach((file: any, index: number) => {
        formData.append(`photo${index + 1}`, file.originFileObj);
      });
    }

    if (delete_amnities) {
      formData.append("remove_amnities", JSON.stringify(delete_amnities));
    }
    if (deletedPhotosIds.length > 0) {
      formData.append("remove_photo", JSON.stringify(deletedPhotosIds));
    }

    if (hotelamnities) {
      formData.append("hotel_amnities", JSON.stringify(amenitiesValuesArray));
    }

    updateHotelProfileData(formData as any);

    // console.table(Object.fromEntries(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields(["picccc", "logo"]);
      form.setFieldsValue({
        // hotelamnities: [{ first: undefined }],
        delete_amnities: [],
        hotelamnities: [],
      });
      setDeletedAmenitiesIds([]);
      setDeletedPhotosIds([]);
      setFileList([]);

      onClose();

      // navigate("/setting/hotel_profile");

      // setTimeout(() => {
      //   window.location.reload();
      // }, 4000);
    }
  }, [form, isSuccess]);

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Hotel Name"
              //   rules={[{ required: true, message: "Please enter room number" }]}
            >
              <Input type="text" placeholder="Please enter room number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="logo"
              label="Logo"
              style={{ width: "100%" }}
              //   rules={[{ required: true, message: "Please enter room number" }]}
            >
              <Upload maxCount={1} accept=".png,.jpg,.jpeg">
                <Button icon={<UploadOutlined />} style={{ width: "330px" }}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                // {
                //   required: true,
                //   message: "Please input your E-mail!",
                // },
              ]}
            >
              <Input style={{ width: "100%" }} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              // rules={[
              //   { required: true, message: "Please choose check out date" },
              // ]}
            >
              <Input placeholder="City" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="country"
              label="Country"
              // rules={[
              //   { required: true, message: "Please choose check in time" },
              // ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="group"
              label="Group"
              // rules={[
              //   { required: true, message: "Please choose check out time" },
              // ]}
            >
              <Input placeholder="Group" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              //   rules={[{ required: true, message: "update resevation" }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              //   rules={[{ required: true, message: "Please enter room number" }]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="website"
              label="Website URL"
              //   rules={[{ required: true, message: "Please choose any status" }]}
            >
              <Input placeholder="Paste website url" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="map_url"
              label="Map URL"
              // rules={[
              //   { required: true, message: "Please choose the dateTime" },
              // ]}
            >
              <Input placeholder="Paste hotel location url" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="founded_year" label="Founded Year">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="zip_code"
              label="Zip Code"
              // rules={[
              //   { required: true, message: "Please choose the dateTime" },
              // ]}
            >
              <Input placeholder="Zip code" maxLength={10} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="postal_code"
              label="Postal code"
              //   rules={[{ required: true, message: "Please choose any status" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Hotel Amenities"
              name="hotel_amnities"
              style={{ width: "100%" }}
              // rules={[
              //   {
              //     required: true,
              //     message: "Enter  amenities  details!",
              //   },
              // ]}
            >
              <Form.List name="hotelamnities">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "first"]}
                          style={{ width: "100%" }}
                        >
                          <Input
                            type="text"
                            placeholder="Amenitie"
                            style={{ width: "330px" }}
                          />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Amenities
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Description"
              // rules={[
              //   { required: true, message: "Please choose the dateTime" },
              // ]}
            >
              <TextArea
                rows={4}
                showCount
                maxLength={255}
                placeholder="Description"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Upload Room Pictures" name="picccc">
              <Upload
                // fileList={fileList}
                onChange={(fileList: any) => {
                  setFileList(fileList?.fileList);
                }}
                action="/upload.do"
                listType="picture-card"
                onPreview={handlePreview}
                maxCount={10}
                accept=".png,.jpg,.jpeg"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={<span className="text-red-600">Delete Amenities</span>}
              name="delete_amnities"
            >
              <Select
                placeholder="Select Amenities to Delete"
                mode="multiple"
                style={{ width: "100%" }}
                // onChange={handleChange}
                showSearch={false}
                // onDeselect={handleDelete}
                options={amenitiesList}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Form.Item
            label={<span className="text-red-600">Delete Hotel Pictures</span>}
            style={{ marginLeft: "10PX" }}
          >
            <div className="grid grid-cols-6 gap-5 mx-auto ">
              {photosList.map((img: any, index: number) => (
                <div className="flex flex-col gap-2 overflow-hidden">
                  <div className="flex justify-end">
                    <GiCancel
                      color="#8f6456"
                      className="hover:cursor-pointer"
                      onClick={() => handlePhotoDelete(img.id)}
                      // onClick={() => handlePhotoDelete(img.id)}
                    />
                  </div>

                  <Image
                    key={index}
                    // src={img.photo}
                    src={`${imageURL + img.photo}`}
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

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "150px",
                }}
                htmlType="submit"
                loading={isLoading}
              >
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default HotelSingleProfileUpdate;
