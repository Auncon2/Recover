import { useDispatch } from "react-redux";
import { AVAILABLE, OCCUPIED } from "../utils/pos-constant";
import { selectedTable } from "../api/posSlice";
import { Button } from "antd";

const SubTable = ({ subtable, tableId }: any) => {
  const { rest_table_id, rest_table_status, rest_table_name } = subtable || {};

  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(selectedTable(rest_table_id))}
      key={rest_table_id}
      size="large"
      style={{
        backgroundColor: `${
          tableId === rest_table_id
            ? "#0079FF"
            : (rest_table_status === OCCUPIED && "#FF0400") ||
              (rest_table_status === AVAILABLE && "transparent")
        }`,
        color: `${
          tableId === rest_table_id
            ? "white"
            : (rest_table_status === OCCUPIED && "white") ||
              (rest_table_status === AVAILABLE && "black")
        }`,
        border: `${
          tableId === rest_table_id
            ? "2px solid #0079FF"
            : (rest_table_status === OCCUPIED && "2px solid #FF0400") ||
              (rest_table_status === AVAILABLE && "2px solid #0079FF")
        }`,
        height: "8rem",
        textAlign: "center",
        cursor: "pointer",
        fontWeight: 700,
        width: "100%",
      }}
    >
      {rest_table_name}
    </Button>
  );
};

export default SubTable;
