import { Card, Typography } from "antd";
import { ICarts } from "../types/pointOfSalesTypes";
import { formatter } from "../../../../utilities/helper";

const { Text } = Typography;

interface Props {
  foods: ICarts;
  handleAddToCarts: any;
  category: any;
  carts: ICarts[];
}

const FoodMenuItem: React.FC<Props> = ({
  foods,
  handleAddToCarts,
  category,
  carts,
}) => {
  const {
    product_retail_price,
    product_name,
    product_category,
    inserted_product_id,
  } = foods || {};

  const matchingCategory =
    category?.data?.find(
      (item: any) => item.food_category_id === product_category
    ) || {};

  const isItemInCart = carts.some(
    ({ item_food_id }: ICarts) => item_food_id === inserted_product_id
  );

  return (
    <Card
      size="small"
      type="inner"
      extra={
        <Typography.Text type="secondary">
          {matchingCategory.food_category_name}
        </Typography.Text>
      }
      title={
        <Text style={{ color: "#0079FF" }}>
          {formatter(product_retail_price)}/-
        </Text>
      }
      onClick={() => handleAddToCarts(foods)}
      style={{
        backgroundColor: isItemInCart ? "#e6f1ff" : "transparent",
        border: "1px solid #0079FF",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Text
        style={{
          display: "block",
          fontWeight: 600,
          fontSize: "16px",
        }}
      >
        {product_name}
      </Text>
    </Card>
  );
};

export default FoodMenuItem;
