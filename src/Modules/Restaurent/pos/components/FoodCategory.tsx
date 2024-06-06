import { useDispatch } from "react-redux";
import { searchFoodItem, selectedCategory } from "../api/posSlice";
import { Typography } from "antd";

interface Props {
  categories: any;
  categoryId: number;
}

const FoodCategory: React.FC<Props> = ({ categories, categoryId }) => {
  const { id, name } = categories || {};
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(searchFoodItem(""));
        dispatch(selectedCategory(id));
      }}
      style={{
        backgroundColor: id === categoryId ? "#0079FF" : "",
        border: id === categoryId ? "2px solid  #0079FF" : "2px solid  #0079FF",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        borderRadius: "8px",
      }}
    >
      <Typography.Text
        style={{
          color: id === categoryId ? "white" : "black",
          fontSize: "18px",
          textTransform: "uppercase",
        }}
      >
        {name}
      </Typography.Text>
    </div>
  );
};

export default FoodCategory;
