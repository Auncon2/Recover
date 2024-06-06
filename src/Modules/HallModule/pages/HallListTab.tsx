import { Tabs } from "antd";
import type { TabsProps } from "antd";
import HallList from "./HallList";
import HallAvalaiableUnavalaiableList from "./HallAvalaiableUnavalaiableList";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "All Hall List",
    children: <HallList />,
  },
  {
    key: "2",
    label: "All  Avaliable / Unavaliable Hall List",
    children: <HallAvalaiableUnavalaiableList />,
  },
];
const HallListTab = () => {
  return (
    <div>
      <Tabs defaultActiveKey="2" items={items} onChange={onChange} />
    </div>
  );
};

export default HallListTab;
