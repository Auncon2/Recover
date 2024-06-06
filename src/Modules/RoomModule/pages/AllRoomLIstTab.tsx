import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AllRoomList from "./AllRoomList";
import AllAvalaibleRooms from "./AllAvalaibleRooms";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "All Room List",
    children: <AllRoomList />,
  },
  {
    key: "2",
    label: "All  Avaliable / Unavaliable Room List",
    children: <AllAvalaibleRooms />,
  },
];
const AllRoomLIstTab = () => {
  return (
    <>
      <Tabs defaultActiveKey="2" items={items} onChange={onChange} />
    </>
  );
};

export default AllRoomLIstTab;
