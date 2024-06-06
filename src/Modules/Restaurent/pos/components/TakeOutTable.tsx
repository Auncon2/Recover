import { useDispatch } from "react-redux";
import { AVAILABLE, OCCUPIED } from "../utils/pos-constant";
import { selectedTable, stateClear } from "../api/posSlice";
import { ITakeout } from "../types/pointOfSalesTypes";

interface Props {
  table: ITakeout;
  tableId: number;
}

const TakeoutTable: React.FC<Props> = ({ table, tableId }) => {
  const { takeout_table_name, takeout_table_id, takeout_table_status } =
    table || {};
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(selectedTable(takeout_table_id));
        dispatch(stateClear());
      }}
      style={{
        backgroundColor: `${
          tableId === takeout_table_id
            ? "#0079FF"
            : (takeout_table_status === OCCUPIED && "#FF0400") ||
              (takeout_table_status === AVAILABLE && "transparent")
        }`,
        color: `${
          tableId === takeout_table_id
            ? "white"
            : (takeout_table_status === OCCUPIED && "white") ||
              (takeout_table_status === AVAILABLE && "black")
        }`,
        border: `${
          tableId === takeout_table_id
            ? "2px solid #0079FF"
            : (takeout_table_status === OCCUPIED && "2px solid #FF0400") ||
              (takeout_table_status === AVAILABLE && "2px solid #0079FF")
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
      {takeout_table_name}
    </div>
  );
};

export default TakeoutTable;
