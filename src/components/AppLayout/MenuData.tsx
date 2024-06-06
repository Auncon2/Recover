/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { IMenuData } from "../Types/MenuData";
import Dashboard from "../../Modules/Dashboard/Dashboard";
import { VscAccount } from "react-icons/vsc";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineChecklistRtl,
} from "react-icons/md";
import {
  IoBedOutline,
  IoRestaurantOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  TbBrandBooking,
  TbFileInvoice,
  TbFileReport,
  TbMoneybag,
} from "react-icons/tb";
import { SlPeople } from "react-icons/sl";
import { LuHotel } from "react-icons/lu";

import { RiAddFill, RiAdminLine } from "react-icons/ri";
import { GoShield } from "react-icons/go";
import { CiCircleList } from "react-icons/ci";
import { IUser } from "../../auth/types/loginTypes";
import { FaMoneyBill } from "react-icons/fa6";
import { BiPurchaseTag } from "react-icons/bi";

// export const sideBarItems: any = (role: number) => {
// const menuData = [
// export const sideBarItems: IMenuData[] | any = [

const sideBarItems: any = (user: IUser) => {
  const menuData: any = [
    {
      label: (
        <Link to="/" className="font-semibold">
          Dashboard
        </Link>
      ),
      key: "/",
      icon: <AppstoreOutlined style={{ color: "white" }} />,
      element: <Dashboard />,
    },
  ];

  // ...................room......................
  {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    {
      children.push({
        label: <Link to="/hotel/room-create">Room Create</Link>,
        key: "/hotel/room-create/",
        icon: <IoBedOutline />,
      });
    }

    // Condition for the second child
    {
      children.push({
        label: <Link to="/hotel/room-list">Room List</Link>,
        key: "/hotel/room-list/",
        icon: <AppstoreOutlined />,
      });
    }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="text-white font-semibold">Room</span>,
      key: "hotelroom",
      icon: (
        <LuHotel
          // color="#028989"
          color="white"
        />
      ),
      children: children,
    });
  }
  // ..................room Booking.................................
  {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
  {
      children.push({
        label: (
          <Link to="/create_room_booking/make-booking/from/to">
            Create Booking
          </Link>
        ),
        key: "/create_room_booking/make-booking/from/to/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    {
      children.push({
        label: <Link to="/book_list">Booking List</Link>,
        key: "/book_list/",
        icon: <AppstoreOutlined />,
      });
    }
    // room booking invoice
  {
      children.push({
        label: <Link to="/room-booking-invoice">Booking Invoice</Link>,
        key: "/room-booking-invoice/",
        icon: <AppstoreOutlined />,
      });
    }

    menuData.push({
      label: <span className="text-white font-semibold">Room Booking</span>,
      key: "room_booking",
      icon: <TbBrandBooking color="white" />,
      children: children,
    });
  }
  // .......................hall ...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "hall"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "hall-create"
        )
      )
    ) {
      children.push({
        label: (
          <Link to="/hall/hall-create" className="text-white">
            Hall Create
          </Link>
        ),
        key: "/hall/hall-create/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "hall-list"
        )
      )
    ) {
      children.push({
        label: <Link to="/hall/hall-list">Hall List</Link>,
        key: "/hall/hall-list/",
        icon: <AppstoreOutlined />,
      });
    }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="font-semibold text-white">Hall</span>,
      key: "hall",
      icon: <LuHotel color="white" />,
      children: children,
    });
  }
  // .......................hall booking...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "hall-booking"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "create-hall-booking"
        )
      )
    ) {
      children.push({
        label: (
          <Link to="/create-hall-booking/make-booking/date/from/to">
            Create Hall Booking
          </Link>
        ),
        key: "/create-hall-booking/make-booking/date/from/to/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "hall-booking-list"
        )
      )
    ) {
      children.push({
        label: <Link to="/hall-booking-list">Hall Booking List</Link>,
        key: "/hall-booking-list/",
        icon: <AppstoreOutlined />,
      });
    }

    // hall-booking-invoice
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "hall-booking-list"
        )
      )
    ) {
      children.push({
        label: <Link to="/hall-booking-invoice">Hall Booking Invoice</Link>,
        key: "/hall-booking-invoice/",
        icon: <AppstoreOutlined />,
      });
    }

    // // hall-checkin-checkout
    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "hall-booking-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/hall-check-in-check-out">Hall Check Out</Link>,
    //     key: "/hall-check-in-check-out/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="font-semibold text-white">Hall Booking</span>,
      key: "hall-booking",
      icon: <TbBrandBooking color="white" />,
      children: children,
    });
  }

  // .......................Restaurent...........................................

  if (
    // user?.authorization.find(
    //   (item: any) => item.permission_group_name === "restaurant"
    // )
    user?.authorization.some((authorization) =>
      authorization.subModules.find(
        (subModule) => subModule.permission_name === "restaurant"
      )
    )
  ) {
    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "create-invoice"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/ingredients">Ingredients</Link>,
    //     key: "/restaurent/ingredients/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }

    // // Condition for the second child

    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "invoice-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/supplier">Supplier</Link>,
    //     key: "/restaurent/supplier/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }

    // // Condition for the Third child

    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "invoice-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/purchase">Purchase</Link>,
    //     key: "/restaurent/purchase/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }
    // // Condition for the  child

    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "invoice-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/category">Category</Link>,
    //     key: "/restaurent/category/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }
    // // Condition for the Fifth child

    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "invoice-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/foods">Foods</Link>,
    //     key: "/restaurent/foods/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }
    // // Condition for the Sixth child

    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "invoice-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/inventory">Inventory</Link>,
    //     key: "/restaurent/inventory/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }
    // // Condition for the Seven child

    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "invoice-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/all-order">All Order</Link>,
    //     key: "/restaurent/all-order/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }

    // // Condition for the Eight child

    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "invoice-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/kitchen">Kitchen</Link>,
    //     key: "/restaurent/kitchen/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }
    // // Condition for the Eight child

    // if (
    //   user?.authorization.some((authorization) =>
    //     authorization.subModules.find(
    //       (subModule) => subModule.permission_name === "invoice-list"
    //     )
    //   )
    // ) {
    //   children.push({
    //     label: <Link to="/restaurent/pos">Pos</Link>,
    //     key: "/restaurent/pos/",
    //     icon: <AppstoreOutlined />,
    //   });
    // }

    menuData.push({
      label: (
        <Link to="/restaurent/create-restaurent" className="font-semibold">
          Restaurant
        </Link>
      ),
      key: "restaurent",
      icon: <IoRestaurantOutline color="white" />,
      // children: children,
    });
  }
  // .......................invoice...........................................

  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "invoice"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "create-invoice"
        )
      )
    ) {
      children.push({
        label: <Link to="/invoice/create-booking-invoice">Create Invoice</Link>,
        key: "/invoice/create-booking-invoice/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "invoice-list"
        )
      )
    ) {
      children.push({
        label: <Link to="/invoice/booking-invoice">Invoice List</Link>,
        key: "/invoice/booking-invoice/",
        icon: <AppstoreOutlined />,
      });
    }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="font-semibold text-white">Invoice</span>,
      key: "invoice",
      icon: <TbFileInvoice color="white" />,
      children: children,
    });
  }
  // .......................Money Receipt...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "money-receipt"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "invoice-money-receipt"
        )
      )
    ) {
      children.push({
        label: (
          <Link to="/money-receipt/invoice-money-receipt">
            Invoice Money Receipt
          </Link>
        ),
        key: "/money-receipt/invoice-money-receipt/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "advance-return"
        )
      )
    ) {
      children.push({
        label: <Link to="/money-receipt/advance-return">Advance Return</Link>,
        key: "/money-receipt/advance-return/",
        icon: <AppstoreOutlined />,
      });
    }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="font-semibold text-white">Money Receipt</span>,
      key: "/money-receipt",
      icon: <FaMoneyBill color="white" />,
      children: children,
    });
  }

  // .......................Guest...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "guest"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "guest-list"
        )
      )
    ) {
      children.push({
        label: <Link to="/guest/guest-list">Guest List</Link>,
        key: "/guest/guest-list/",
        icon: <AppstoreOutlined />,
      });
    }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="font-semibold text-white">Guest</span>,
      key: "guest",
      icon: <SlPeople color="white" />,
      children: children,
    });
  }

  // .......................Accounts...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "accounts"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "create-account"
        )
      )
    ) {
      children.push({
        label: <Link to="/account/create-account">Create Account</Link>,
        key: "/account/create-account/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "account-list"
        )
      )
    ) {
      children.push({
        label: <Link to="/account/account-list">Account List</Link>,
        key: "/account/account-list/",
        icon: <AppstoreOutlined />,
      });
    }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="font-semibold text-white">Accounts</span>,
      key: "/account",
      icon: <VscAccount color="white" />,
      children: children,
    });
  }
  // .......................Expense...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "expense"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "expense-head"
        )
      )
    ) {
      children.push({
        label: <Link to="/expense/expense-head-list">Expense Head </Link>,
        key: "/expense/expense-head-list/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "add-expense"
        )
      )
    ) {
      children.push({
        label: <Link to="/expense/create-expense">Add Expense</Link>,
        key: "/expense/create-expense/",
        icon: <RiAddFill size="20" />,
      });
    }
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "expense-history"
        )
      )
    ) {
      children.push({
        label: <Link to="/expense/expense-list">Expense History</Link>,
        key: "/expense/expense-list/",
        icon: <AppstoreOutlined />,
      });
    }
    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="text-white font-semibold">Expense</span>,
      key: "Expense",
      icon: <TbFileReport color="white" />,
      children: children,
    });
  }

  // .......................purchase...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name !== "purchase"
    )
  ) {
    const children = [];

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name !== "supplier"
        )
      )
    ) {
      children.push({
        label: "Supplier",
        key: "/purchase/supplier/",
        icon: <AppstoreOutlined />,
        children: [
          {
            label: <Link to="/purchase/create-supplier/">Create Supplier</Link>,
            key: "/purchase/create-supplier/",
            icon: <RiAddFill size="20" />,
          },
          {
            label: <Link to="/purchase/supplier-list/">Supplier List</Link>,
            key: "/purchase/supplier-list/",
            icon: <AppstoreOutlined />,
          },
        ],
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name !== "purchase-list"
        )
      )
    ) {
      children.push({
        label: "Purchase List",
        key: "/purchase/purchase/",
        icon: <AppstoreOutlined />,
        children: [
          {
            label: <Link to="/purchase/create-purchase/">Create Purchase</Link>,
            key: "/purchase/create-purchase/",
            icon: <RiAddFill size="20" />,
          },
          {
            label: <Link to="/purchase/purchase-list/">Purchase List</Link>,
            key: "/purchase/purchase-list/",
            icon: <AppstoreOutlined />,
          },
        ],
      });
    }

    menuData.push({
      label: <span className="text-white font-semibold">Purchase</span>,
      key: "Purchase",
      icon: <BiPurchaseTag color="white" />,
      children: children,
    });
  }

  // .......................Inventory...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name !== "inventory"
    )
  ) {
    const children = [];

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name !== "products"
        )
      )
    ) {
      children.push({
        label: <Link to="/inventory/products/">Products</Link>,
        key: "/inventory/products/",
        icon: <AppstoreOutlined />,
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name !== "categories"
        )
      )
    ) {
      children.push({
        label: <Link to="/inventory/categories/">Categories</Link>,
        key: "/inventory/categories/",
        icon: <AppstoreOutlined />,
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name !== "units"
        )
      )
    ) {
      children.push({
        label: <Link to="/inventory/units/">Units</Link>,
        key: "/inventory/units/",
        icon: <AppstoreOutlined />,
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name !== "brands"
        )
      )
    ) {
      children.push({
        label: <Link to="/inventory/brands/">Brands</Link>,
        key: "/inventory/brands/",
        icon: <AppstoreOutlined />,
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name !== "damaged-products"
        )
      )
    ) {
      children.push({
        label: <Link to="/inventory/damaged-products/">Damaged Products</Link>,
        key: "/inventory/damaged-products/",
        icon: <AppstoreOutlined />,
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name !== "update-stock"
        )
      )
    ) {
      children.push({
        label: <Link to="/inventory/update-stock/">Update Stock</Link>,
        key: "/inventory/update-stock/",
        icon: <AppstoreOutlined />,
      });
    }

    menuData.push({
      label: <span className="text-white font-semibold">Inventory</span>,
      key: "Inventory",
      icon: <BiPurchaseTag color="white" />,
      children: children,
    });
  }
  // .......................payroll...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "payroll"
    )
  ) {
    // Push the parent menu item with the constructed children array
    menuData.push({
      label: (
        <Link to="/payroll" className="text-white font-semibold">
          Payroll
        </Link>
      ),
      key: "/payroll/",
      icon: <TbMoneybag color="white" />,
    });
  }

  // .......................Report..................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "report"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "room-report"
        )
      )
    ) {
      children.push({
        label: <Link to="/report/room-report">Room Report</Link>,
        key: "/report/room-report/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "room-booking-report"
        )
      )
    ) {
      children.push({
        label: (
          <Link to="/report/room-booking-report">Room Booking Report</Link>
        ),
        key: "/report/room-booking-report/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "hall-booking-report"
        )
      )
    ) {
      children.push({
        label: (
          <Link to="/report/hall-booking-report">Hall Booking Report</Link>
        ),
        key: "/report/hall-booking-report/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "account-report"
        )
      )
    ) {
      children.push({
        label: <Link to="/report/account-report">Account Report</Link>,
        key: "/report/account-report/",
        icon: <AppstoreOutlined />,
      });
    }
    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "account-report"
        )
      )
    ) {
      children.push({
        label: (
          <Link to="/report/guest-ledger-report">Guest Ledger Report</Link>
        ),
        key: "/report/guest-ledger-report/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "expense-report"
        )
      )
    ) {
      children.push({
        label: <Link to="/report/expense-report">Expense Report</Link>,
        key: "/report/expense-report/",
        icon: <AppstoreOutlined />,
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "salary-report"
        )
      )
    ) {
      children.push({
        label: <Link to="/report/salary-report">Salary Report</Link>,
        key: "/report/salary-report/",
        icon: <AppstoreOutlined />,
      });
    }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="font-semibold text-white">Report</span>,
      key: "Report",
      icon: <TbFileReport color="white" />,
      children: children,
    });
  }

  // .......................administration...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "administration"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "admin"
        )
      )
    ) {
      children.push({
        label: "Admin",
        icon: <RiAdminLine />,
        children: [
          {
            label: <Link to="admin/adminlist">Admin List</Link>,
            key: "/admin/adminlist/",
            icon: <MdOutlineChecklistRtl />,
          },
        ],
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "role-and-permission"
        )
      )
    )
      // {
      //   children.push({
      //     label: <span className="font-semibold">Administrationaaa</span>,
      //     key: "administration",
      //     icon: <MdOutlineAdminPanelSettings color="#028989" />,
      //     children: [
      //       {
      //         label: "Admin",
      //         icon: <RiAdminLine />,
      //         children: [
      //           {
      //             label: <Link to="admin/adminlist">Admin List</Link>,
      //             key: "/admin/adminlist/",
      //             icon: <MdOutlineChecklistRtl />,
      //           },
      //         ],
      //       },
      //       {
      //         label: "Role & Permissions",
      //         icon: <GoShield />,
      //         children: [
      //           {
      //             label: <Link to="admin/role-list">Role List</Link>,
      //             key: "/admin/role-list/",
      //             icon: <CiCircleList />,
      //           },
      //           // {
      //           //   label: (
      //           //     <Link to="admin/permission-group-list">Permission Group</Link>
      //           //   ),
      //           //   icon: <AppstoreOutlined />,
      //           //   key: "/admin/permission-group-list/",
      //           // },
      //           // {
      //           //   label: <Link to="admin/permission-list">Permission</Link>,
      //           //   icon: <AppstoreOutlined />,
      //           //   key: "/admin/permission-list/",
      //           // },
      //         ],
      //       },
      //       // {
      //       //   label: <Link to="admin/audit-trail">Audit Trail</Link>,
      //       //   key: "/admin/audit-trail/",
      //       //   icon: <AppstoreOutlined />,
      //       // },
      //     ],
      //   });
      // }

      // Push the parent menu item with the constructed children array
      menuData.push({
        label: <span className="font-semibold text-white">Administration</span>,
        key: "administration",
        icon: <MdOutlineAdminPanelSettings color="white" />,
        children: [
          {
            label: "Admin",
            icon: <RiAdminLine />,
            children: [
              {
                label: <Link to="admin/adminlist">Admin List</Link>,
                key: "/admin/adminlist/",
                icon: <MdOutlineChecklistRtl />,
              },
            ],
          },
          {
            label: "Role & Permissions",
            icon: <GoShield />,
            children: [
              {
                label: <Link to="admin/role-list">Role List</Link>,
                key: "/admin/role-list/",
                icon: <CiCircleList />,
              },
              // {
              //   label: (
              //     <Link to="admin/permission-group-list">Permission Group</Link>
              //   ),
              //   icon: <AppstoreOutlined />,
              //   key: "/admin/permission-group-list/",
              // },
              // {
              //   label: <Link to="admin/permission-list">Permission</Link>,
              //   icon: <AppstoreOutlined />,
              //   key: "/admin/permission-list/",
              // },
            ],
          },
          // {
          //   label: <Link to="admin/audit-trail">Audit Trail</Link>,
          //   key: "/admin/audit-trail/",
          //   icon: <AppstoreOutlined />,
          // },
        ],
      });
  }

  // .......................Settings...........................................
  if (
    user?.authorization.find(
      (item: any) => item.permission_group_name === "settings"
    )
  ) {
    // Conditionally construct the children array
    const children = [];

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "Hotel-details"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/hotel_profile">Hotel Details</Link>,
        key: "/setting/hotel_profile/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the second child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "room-type"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/room-type">Room Type</Link>,
        key: "/setting/room-type/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "bed-type"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/bed-type">Bed Type</Link>,
        key: "/setting/bed-type/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "room-amenities"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/amenities-type">Room Amenities</Link>,
        key: "/setting/amenities-type/",
        icon: <AppstoreOutlined />,
      });
    }

    // Condition for the first child
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "hall-amenities"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/hall-amenities-type">Hall Amenities</Link>,
        key: "/setting/hall-amenities-type/",
        icon: <AppstoreOutlined />,
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "department"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/department-type">Department </Link>,
        key: "/setting/department-type/",
        icon: <AppstoreOutlined />,
      });
    }
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "degisnation"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/degisnation-type">Designation </Link>,
        key: "/setting/degisnation-type/",
        icon: <AppstoreOutlined />,
      });
    }
    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "degisnation"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/payroll-month">Payroll Month </Link>,
        key: "/setting/payroll-month/",
        icon: <AppstoreOutlined />,
      });
    }

    if (
      user?.authorization.some((authorization) =>
        authorization.subModules.find(
          (subModule) => subModule.permission_name === "employee"
        )
      )
    ) {
      children.push({
        label: <Link to="/setting/employee">Employee</Link>,
        key: "/setting/employee/",
        icon: <AppstoreOutlined />,
      });
    }

    // Push the parent menu item with the constructed children array
    menuData.push({
      label: <span className="font-semibold text-white">Settings</span>,
      key: "/settings",
      icon: <IoSettingsOutline color="white" />,
      children: children,
    });
  }
  return menuData;
};

export default sideBarItems;
