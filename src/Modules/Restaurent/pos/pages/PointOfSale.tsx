import { Fragment, useEffect, useState } from "react";

import {
  CASHBACK,
  DECREASE,
  DELIVERY,
  DINEIN,
  INCREASE,
  INPUT,
  PERCANTAGE,
  TAKEOUT,
  orderTypeList,
} from "../utils/pos-constant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvoiceNo,
  calculateDiscountAsPercentage,
  calculateFixedDiscount,
  calculateNetTotal,
  calculateSubTotal,
  calculateVatAmount,
  clearData,
  searchFoodItem,
  selectedDelivaryPlatform,
  selectedOrderType,
  selectedStaff,
  selectedTable,
} from "../api/posSlice";
import { Button, Empty, Input, Space, Typography } from "antd";
const { Text } = Typography;
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import {
  ICarts,
  IDelivary,
  IDinein,
  ITakeout,
} from "../types/pointOfSalesTypes";
import { useGetCategorylistQuery } from "../../Category/api/CategoryEndPoints";
import {
  useCheckingOrderQuery,
  useConfirmOrderMutation,
  useDelivaryQuery,
  useDineInQuery,
  useTakeOutQuery,
} from "../api/posEndPoints";
import notification from "../../../../components/utils/Notification";
import { generateRandomNumber } from "../../../../utilities/helper";
import SubTableModal from "../components/SubTableModal";
import FoodMenuItem from "../components/FoodMenuItem";
import FoodCategory from "../components/FoodCategory";
import DeliveryPlatform from "../components/DeliveryPlatform";
import OrderSummery from "../components/OrderSummery";
import TakeoutTable from "../components/TakeOutTable";
import SubTable from "../components/SubTable";
import DineInTable from "../components/DineInTable";
import { useGetFoodslistQuery } from "../../Foods/api/FoodsEndPoints";

const PointOfSale: React.FC = () => {
  const [carts, setCarts] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    orderType,
    subTotal,
    vatAmount,
    discount,
    change,
    netTotal,
    staff,
    discountAmount,
    discountType,
    paidAmount,
    paymentType,
    tableId,
    delivaryPlatform,
    categoryId,
    searchFood,
    dineInSubTable,
    isPayment,
  } = useSelector((state: any) => state.pos);

  const dispatch = useDispatch();

  const { data: foodMenu } = useGetFoodslistQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: category } = useGetCategorylistQuery({});
  // const { data: account } = useGetAccountListQuery({});
  const { data: dineIn } = useDineInQuery({});
  const { data: takeOut } = useTakeOutQuery({});
  const { data: delivary } = useDelivaryQuery({});
  const { data: checkingOrder, isFetching } = useCheckingOrderQuery({
    tableId,
    orderType,
  });

  const [create, { isLoading, data }] = useConfirmOrderMutation();

  useEffect(() => {
    if (data?.data && isPayment) {
      dispatch(clearData());
      navigate(`/invoice/${data.data}`);
    }
  }, [data, dispatch, isPayment, navigate]);

  const { createdfoods } = checkingOrder?.data || {};

  useEffect(() => {
    if (createdfoods) {
      dispatch(addInvoiceNo(checkingOrder?.data?.invoice_id));
      dispatch(selectedStaff(checkingOrder?.data?.invoice_staff));
      setCarts(
        createdfoods.map((item: any) => ({
          food_item_name: item.food_item_name,
          item_food_id: item.item_id,
          item_quantity: Number(item.item_quantity),
          item_price: Number(item.food_item_production_price),
          item_total: createdfoods
            ? Number(item.item_total)
            : Number(item.item_total) * Number(item.item_quantity),
        }))
      );
    } else {
      setCarts([]);
    }
  }, [checkingOrder, createdfoods, dispatch]);

  useEffect(() => {
    let filteredData = foodMenu?.data?.filter(
      ({ product_name }: ICarts) => product_name !== null
    );
    if (categoryId) {
      filteredData = filteredData?.filter(
        ({ product_category }: ICarts) => product_category === categoryId
      );
    }
    if (searchFood) {
      const lowerSearchText = searchFood.toLowerCase();
      filteredData = filteredData?.filter(({ product_name }: ICarts) =>
        product_name.toLowerCase().includes(lowerSearchText)
      );
    }
    setResults(filteredData as any);
  }, [foodMenu, searchFood, categoryId]);

  const handleAddToCarts = (items: ICarts) => {
    const index = carts.findIndex(
      ({ item_food_id }) => item_food_id === items.inserted_product_id
    );
    if (index !== -1) {
      const updateCarts = [...carts];
      updateCarts[index].item_quantity += 1;
      updateCarts[index].item_total =
        updateCarts[index].item_quantity * updateCarts[index].item_price;
      setCarts(updateCarts);
    } else {
      setCarts([
        ...carts,
        {
          food_item_name: items.product_name,
          item_food_id: items.inserted_product_id,
          item_quantity: 1,
          item_price: Number(items.product_retail_price),
          item_total: Number(items.product_retail_price),
        },
      ]);
    }
  };

  const handleEditAddToCarts = (
    type: string,
    id: number,
    value: number = 0
  ) => {
    const findData = results?.find(
      ({ inserted_product_id }: ICarts) => inserted_product_id === id
    );
    const updatedCarts = [...carts];
    const index = updatedCarts.findIndex(
      ({ item_food_id }: ICarts) => item_food_id === id
    );

    if (index !== -1) {
      const item = updatedCarts[index];
      item.item_quantity ??= 1;

      switch (type) {
        case INCREASE:
          item.item_quantity += 1;
          item.item_total = Number(
            (
              Number(item.item_total) + Number(findData.product_retail_price)
            ).toFixed(2)
          );
          break;
        case DECREASE:
          if (item.item_quantity > 1) {
            item.item_quantity -= 1;
            item.item_total = Number(
              (
                Number(item.item_total) - Number(findData.product_retail_price)
              ).toFixed(2)
            );
          } else {
            updatedCarts.splice(index, 1);
          }
          break;
        case INPUT:
          item.item_quantity = value;
          item.item_total = Number(
            (value * Number(findData.product_retail_price)).toFixed(2)
          );
          break;
        default:
          break;
      }
      setCarts(updatedCarts);
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCarts(carts.filter((item) => item.item_food_id !== id));
  };

  useEffect(() => {
    dispatch(calculateSubTotal(carts));
    dispatch(calculateVatAmount());
    discountType === PERCANTAGE &&
      dispatch(calculateDiscountAsPercentage(discountAmount));
    discountType === CASHBACK &&
      dispatch(calculateFixedDiscount(discountAmount));
    dispatch(calculateNetTotal());
  }, [carts, discountAmount, discountType, dispatch]);

  const handleConfirmOrder = () => {
    if (!tableId) {
      return notification(
        "warning",
        "You must select a table before taking orders"
      );
    }
    create({
      invoice_sales_from: 1,
      invoice_type: "postpaid",
      invoice_no: generateRandomNumber(""),
      invoice_client: 1,
      invoice_staff: staff,
      invoice_table: tableId,
      invoice_date: new Date(),
      invoice_subtotal: subTotal,
      invoice_customer_type: orderType,
      invoice_platform: delivaryPlatform,
      invoice_platform_id: tableId,
      invoice_discount: null,
      invoice_vat_rate: 2,
      invoice_vat_amount: 5,
      invoice_net_total: netTotal,
      invoice_payment_type: null,
      inovice_account: null,
      invoice_total_paid: null,
      invoice_status: "Pending",
      invoice_change: null,
      invoice_items: carts,
    });
  };

  const handlePaymentNow = () => {
    create({
      invoice_sales_from: 1,
      invoice_type: "postpaid",
      invoice_client: 1,
      invoice_staff: staff,
      invoice_table: tableId,
      invoice_date: new Date(),
      invoice_subtotal: subTotal,
      invoice_customer_type: orderType,
      invoice_platform: delivaryPlatform,
      invoice_platform_id: tableId,
      invoice_discount: discount,
      invoice_vat_rate: 2,
      invoice_vat_amount: vatAmount,
      invoice_net_total: netTotal,
      invoice_payment_type: paymentType,
      //   inovice_account: account.data[0].account_id || null,
      invoice_total_paid: paidAmount,
      invoice_status: "Completed",
      invoice_change: change,
      invoice_items: carts,
    });
  };

  return (
    <Fragment>
      <div
        style={{
          overflowY: "auto",
          display: "grid",
          gap: "0.5rem",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        <Space
          direction="vertical"
          className="scrollbar"
          style={{
            maxHeight: "calc(100vh - 66px)",
            overflowY: "auto",
            gridColumn: "span 1",
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Select order type
          </Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "0.5rem",
            }}
          >
            {orderTypeList.map(({ name, value }, index: number) => (
              <div
                key={index}
                onClick={() => {
                  dispatch(selectedOrderType(value));
                  dispatch(selectedTable(null));
                  dispatch(selectedDelivaryPlatform(null));
                  dispatch(selectedStaff(null));
                }}
                style={{
                  color: `${orderType === value ? "white" : "black"}`,
                  background: `${orderType === value ? "#0157B7" : "#E3E0E0"}`,
                  textTransform: "uppercase",
                  padding: "8px",
                  textAlign: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {name}
              </div>
            ))}
          </div>

          {orderType === DINEIN && (
            <>
              <Text
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Select Dine In table
              </Text>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "0.5rem",
                }}
              >
                {dineIn?.data?.map((table: IDinein) => (
                  <DineInTable
                    key={table.rest_table_id}
                    table={table}
                    tableId={tableId}
                  />
                ))}
              </div>

              <Text
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Select Dine In Sub table
              </Text>
              <Button
                onClick={() => setOpen(true)}
                icon={<PlusOutlined />}
                style={{
                  backgroundColor: "#003B95",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                Add Sub-Table
              </Button>

              <div
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                }}
              >
                {dineInSubTable?.map((subtable: any, index: number) => (
                  <SubTable key={index} subtable={subtable} tableId={tableId} />
                ))}
              </div>
            </>
          )}

          {orderType === TAKEOUT && (
            <>
              <Text
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Select Take Out table
              </Text>
              <div
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                }}
              >
                {takeOut?.data?.map((table: ITakeout) => (
                  <TakeoutTable
                    key={table.takeout_table_id}
                    table={table}
                    tableId={tableId}
                  />
                ))}
              </div>
            </>
          )}

          {orderType === DELIVERY && (
            <>
              <Text
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Select Delivery Platform
              </Text>
              <div
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                }}
              >
                {delivary?.data?.map((delivary: IDelivary) => (
                  <DeliveryPlatform
                    key={delivary.delivary_id}
                    delivary={delivary}
                    tableId={tableId}
                  />
                ))}
              </div>
            </>
          )}
        </Space>

        <div style={{ gridColumn: "span 3" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            }}
          >
            <div
              style={{
                maxHeight: "calc(100vh - 85px)",
                overflowY: "auto",
                gridColumn: "span 3",
                border: "2px solid #0079FF",
                borderRadius: "0.375rem",
                marginInlineEnd: "0.5rem",
                padding: "8px",
              }}
              className="scrollbar"
            >
              <OrderSummery
                isFetching={isFetching}
                isLoading={isLoading}
                carts={carts}
                createdfoods={createdfoods}
                handleConfirmOrder={handleConfirmOrder}
                handleEditAddToCarts={handleEditAddToCarts}
                handleRemoveFromCart={handleRemoveFromCart}
                handlePaymentNow={handlePaymentNow}
              />
            </div>

            <div
              className="scrollbar"
              style={{
                maxHeight: "calc(100vh - 66px)",
                overflowY: "auto",
                gridColumn: "span 1",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "5px",
                  height: "calc(100vh - 66px)",
                  userSelect: "none",
                }}
              >
                {category &&
                  [
                    {
                      id: null,
                      name: "All",
                    },
                    // ...category?.data,
                  ]?.map((categories: any) => (
                    <FoodCategory
                      key={categories.id}
                      categories={categories}
                      categoryId={categoryId}
                    />
                  ))}
              </div>
            </div>

            <Space
              direction="vertical"
              className="scrollbar"
              style={{
                maxHeight: "calc(100vh - 66px)",
                overflowY: "auto",
                gridColumn: "span 3",
                marginInlineStart: "0.5rem",
              }}
            >
              <Input
                allowClear
                size="large"
                value={searchFood}
                onChange={(e) => dispatch(searchFoodItem(e.target.value))}
                prefix={<SearchOutlined />}
                placeholder="Search"
              />

              <div
                style={{
                  maxHeight: "calc(100vh - 97px)",
                  overflowY: "auto",
                  display: "grid",
                  gap: "0.25rem",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                }}
                className="scrollbar"
              >
                {results?.map((foods: ICarts) => (
                  <FoodMenuItem
                    key={foods.inserted_product_id}
                    carts={carts}
                    foods={foods}
                    category={category}
                    handleAddToCarts={handleAddToCarts}
                  />
                ))}
              </div>

              {results?.length === 0 && <Empty />}
            </Space>
          </div>
        </div>
      </div>
      <SubTableModal open={open} setOpen={setOpen} dineIn={dineIn} />
    </Fragment>
  );
};

export default PointOfSale;
