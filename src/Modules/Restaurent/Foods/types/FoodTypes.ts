export interface ICreatedFood {
  created_food_id: number;
  ingredient_name: string;
  created_food_ingredients_quantity: number;
  created_food_ingredients_price: number;
  ingredient_measure_status: string;
}

export interface ICreatedFood {
  created_food_id: number;
  ingredient_name: string;
  created_food_ingredients_quantity: number;
  created_food_ingredients_price: number;
  ingredient_measure_status: string;
}

export interface IFoodMenu {
  food_item_id: number;
  inserted_product_id: number;
  food_item_category: number;
  product_category: number;
  food_item_entry_id: string;
  food_item_name: string;
  product_name: string;
  food_item_retail_price: number;
  product_retail_price: number;
  food_item_status: string;
  food_item_production_price: number;
  created_food_ingredients_quantity: number;
  food_category_name: string;
  createdfoods: ICreatedFood[];
  item_ingredients: ICreatedFood[];
}
