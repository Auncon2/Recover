import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { selectedStaff } from "../api/posSlice";
import { useGetEmployeeQuery } from "../../../Employee/api/EmployeeEndPoint";

const AddStaff = () => {
  const { data: employee } = useGetEmployeeQuery({});
  const dispatch = useDispatch();
  const { staff } = useSelector((state: any) => state.pos);

  return (
    <Select
      showSearch
      allowClear
      style={{ minWidth: "100%" }}
      onChange={(option) => dispatch(selectedStaff(option))}
      value={staff}
      placeholder="Select Staff"
      optionFilterProp="children"
      filterOption={(input, option) =>
        ((option?.label ?? "") as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      options={employee?.data?.map(
        ({ first_name, employee_id, last_name }: any) => {
          return {
            value: employee_id,
            label: `${first_name} ${last_name}`,
          };
        }
      )}
    />
  );
};

export default AddStaff;
