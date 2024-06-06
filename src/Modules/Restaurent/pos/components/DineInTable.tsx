import { useDispatch } from "react-redux";
import { AVAILABLE, OCCUPIED } from "../utils/pos-constant";
import { selectedTable, stateClear } from "../api/posSlice";
import { IDinein } from "../types/pointOfSalesTypes";

interface Props {
  table: IDinein;
  tableId: number;
}

const DineInTable: React.FC<Props> = ({ table, tableId }) => {
  const { rest_table_name, rest_table_id, rest_table_status } = table || {};
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(selectedTable(rest_table_id));
        dispatch(stateClear());
      }}
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
        cursor: "pointer",
        fontWeight: 600,
        display: "grid",
        placeItems: "center",
        borderRadius: "8px",
        userSelect: "none",
      }}
    >
      {rest_table_name}
    </div>
  );
};

export default DineInTable;
