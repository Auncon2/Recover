import { useDispatch } from "react-redux";
import { AVAILABLE, OCCUPIED } from "../utils/pos-constant";
import {
  selectedDelivaryPlatform,
  selectedTable,
  stateClear,
} from "../api/posSlice";
import { IDelivary } from "../types/pointOfSalesTypes";

interface Props {
  delivary: IDelivary;
  tableId: number;
}

const DeliveryPlatform: React.FC<Props> = ({ delivary, tableId }) => {
  const { delivary_id, delivary_platform_name, delivary_status } =
    delivary || {};
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(selectedTable(delivary_id));
        dispatch(selectedDelivaryPlatform(delivary_platform_name));
        dispatch(stateClear());
      }}
      style={{
        backgroundColor: `${
          tableId === delivary_id
            ? "#0079FF"
            : (delivary_status === OCCUPIED && "#FF0400") ||
              (delivary_status === AVAILABLE && "transparent")
        }`,
        color: `${
          tableId === delivary_id
            ? "white"
            : (delivary_status === OCCUPIED && "white") ||
              (delivary_status === AVAILABLE && "black")
        }`,
        border: `${
          tableId === delivary_id
            ? "2px solid #0079FF"
            : (delivary_status === OCCUPIED && "2px solid #FF0400") ||
              (delivary_status === AVAILABLE && "2px solid #0079FF")
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
      {delivary_platform_name}
    </div>
  );
};

export default DeliveryPlatform;
