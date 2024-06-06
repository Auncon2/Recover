import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Modules/Dashboard/Dashboard";
import NotFound from "./components/NotFound/NotFound";
import AppLayout from "./components/AppLayout/AppLayout";
import ProtectedRoute from "./app/utils/ProtectedRoute";
// import Login from './auth/pages/Login';
import UnauthorizePage from "./common/notfound/UnauthorizePage";
import ForgotPassword from "./auth/pages/ForgotPassword";
import SendOtp from "./auth/pages/SendOtp";
import ChangePassword from "./auth/pages/ChangePassword";
import Request from "./Modules/Request/pages/Request";
import Login from "./auth/pages/Login";
import UserList from "./Modules/UserList/pages/UserList";
import Agentlist from "./Modules/AgentList/pages/AgentList";
import Projectlist from "./Modules/ProjectList/pages/ProjectList";
import ProjectDetails from "./Modules/ProjectList/pages/ProjectDetails";
import RoomCreateModule from "./Modules/RoomModule/pages/RoomCreateModule";

import SinglePageroomDetail from "./Modules/RoomModule/pages/SinglePageroomDetail";
import CreateBooking from "./Modules/BookRoom/pages/CreateBooking";
import BookList from "./Modules/BookRoom/pages/BookList";
import RequireUser from "./app/utils/requireUser";
import SingleBookList from "./Modules/BookRoom/pages/SingleBookList";

import CreateAccount from "./Modules/Account/components/CreateAccount";
import HotelSingleProfile from "./Modules/Settings/pages/HotelSingleProfile";
import Profile from "./Modules/Profile/Profile";
import BookingInvoicePage from "./Modules/BookingInvoice/pages/BookingInvoicePage";

import CreateAdmin from "./Modules/Admin/components/CreateAdmin";
import AdminList from "./Modules/Admin/pages/Adminlist";
import Rolelist from "./Modules/Administration/Role/pages/RoleList";
import PermissionGrouplist from "./Modules/Administration/Permissions/pages/PermissionGroupList";
import Permissionlist from "./Modules/Administration/Permissions/pages/PermissionList";
import CreatePermission from "./Modules/Administration/Permissions/components/CreatePermission";
import AudiTrailList from "./Modules/Administration/Audit/pages/AuditTrailList";
import CreateRolePermission from "./Modules/Administration/Permissions/components/CreateRolePermission";
import Accountlist from "./Modules/Account/pages/Accountlist";
import Report from "./Modules/Report/pages/Report";
import BookingReport from "./Modules/RoomBookingReport/pages/BookingReport";

import Customer from "./Modules/Customer/pages/Customer";
import CustomerDetails from "./Modules/Customer/pages/CustomerDetails";
import AccountReport from "./Modules/AccountReport/pages/AccountReports";
import CreateExpenseHead from "./Modules/Expense/components/CreateExpenseHead";
import ExpenseHeadlist from "./Modules/Expense/pages/ExpenseHeadlist";
import CreateExpense from "./Modules/Expense/components/CreateExpense";
import Expenselist from "./Modules/Expense/pages/Expenselist";
import InvoiceMoneyReceipt from "./Modules/MoneyReceipt/pages/InvoiceMoneyReceipt";
import ExpenseView from "./Modules/Expense/pages/ExpenseView";
import AllExpenseReportList from "./Modules/ExpenseReport/pages/AllExpenseReportList";
import CreateGuest from "./Modules/Customer/pages/CreateGuest";

import HotelRoomTypes from "./Modules/Settings/pages/HotelRoomTypes";
import HotelBedTypes from "./Modules/Settings/pages/HotelBedTypes";
import HotelAmenitiesTypes from "./Modules/Settings/pages/HotelAmenitiesTypes";
import { SingleMoneyReceipt } from "./Modules/MoneyReceipt/components/SingleMoneyReceipt";
import Payment from "./Modules/Payment/pages/Payment";
import AdvanceReturn from "./Modules/MoneyReceipt/pages/AdvanceReturn";
import CreateAdvanceReturn from "./Modules/MoneyReceipt/components/CreateAdvanceReturn";
import SingleAdvanceReturnReceipt from "./Modules/MoneyReceipt/components/SingleAdvanceReturnReceipt";
import HotelDepartmentTypes from "./Modules/Settings/pages/HotelDepartmentTypes";
import HotelDegisnationTypes from "./Modules/Settings/pages/HotelDegisnationTypes";
import CheckIn from "./Modules/BookRoom/pages/CheckIn";
import CheckInCheckOut from "./Modules/BookRoom/pages/CheckInCheckOut";
import EmployeeList from "./Modules/Employee/pages/EmployeeList";
import SingleEmployeeProfile from "./Modules/Employee/components/SingleEmployeeProfile";
import SalaryReport from "./Modules/SalaryReport/pages/SalaryReport";
import HallAmenitiesTypes from "./Modules/HallAmenities/pages/HallAmenities";

import HallCreate from "./Modules/HallModule/components/HallCreate";
import HallDetails from "./Modules/HallModule/pages/HallDetails";
import CreateHallBooking from "./Modules/HallBooking/pages/CreateHallBooking";

import SingleRole from "./Modules/Administration/Role/pages/SingleRole";
import PayRollSec from "./Modules/PayRollSec/pages/PayRollSec";
import ViewPayrollSec from "./Modules/PayRollSec/pages/ViewPayrollSec";
import HallBookingList from "./Modules/HallBooking/pages/HallBookingList";
import AllHallBookingReportList from "./Modules/HallBookingReport/pages/HallBookingReport";
import HallBookingSingle from "./Modules/HallBooking/pages/HallBookingSingleNew";
import HallCheckIn from "./Modules/HallBooking/pages/HallCheckIn";
import HallCheckInCheckOut from "./Modules/HallBooking/pages/HallCheckInCheckOut";
import AllRoomLIstTab from "./Modules/RoomModule/pages/AllRoomLIstTab";

import HallListTab from "./Modules/HallModule/pages/HallListTab";
import HotelPayrollMonthAndHourSelect from "./Modules/Settings/pages/HotelPayrollMonthAndHourSelect";

import RoomBookingInvoice from "./Modules/BookRoom/pages/RoomBookingInvoice";

import HallBookingInvoice from "./Modules/HallModule/pages/HallBookingInvoice";

import ClientLedgerReport from "./Modules/ClientLedgerReport/pages/ClientLedgerReport";
import Ingredients from "./Modules/Restaurent/Ingredients/pages/Ingredients";
import Purchase from "./Modules/Restaurent/Purchase/pages/Purchase";
import Supplier from "./Modules/Restaurent/Supplier/pages/Supplier";
import Category from "./Modules/Restaurent/Category/pages/Category";
import Foods from "./Modules/Restaurent/Foods/pages/Foods";
import Inventory from "./Modules/Restaurent/Inventory/pages/Inventory";
import AllOrders from "./Modules/Restaurent/AllOrder/pages/AllOrders";
import SungleOrder from "./Modules/Restaurent/AllOrder/pages/SungleOrder";
import Kitchen from "./Modules/Restaurent/Kitchen/pages/Kitchen";
import PointOfSale from "./Modules/Restaurent/pos/pages/PointOfSale";
// import CreateRestaurent from "./Modules/Restaurent/CreateRestaurent/pages/CreateRestaurent";

// import PayRollSec from "./Modules/Payroll/pages/PayRollSec";
// import ViewPayrollSec from "./Modules/Payroll/pages/ViewPayrollSec";
import Restaurant from "./Modules/Restaurent/CreateRestaurent/pages/Restaurant";
import MoneyReceiptCreate from "./Modules/MoneyReceipt/pages/MoneyReceiptCreate";
import RoomBookingInvoiceModule from "./Modules/BookRoom/pages/RoomBookingInvoiceModule";
import HallBookingInvoiceModule from "./Modules/HallModule/pages/HallBookingInvoiceModule";
import InvoiceClientAndOfficeCopy from "./Modules/BookingInvoice/pages/InvoiceClientAndOfficeCopy";
import CreateInvoice from "./Modules/BookingInvoice/components/CreateInvoice";
import PurchaseSupplier from "./Modules/Purchase/pages/PurchaseSupplier";
import PurchaseList from "./Modules/Purchase/pages/PurchaseList";
import CreatePurchaseSupplier from "./Modules/Purchase/components/CreatePurchaseSupplier";
import CreatePurchase from "./Modules/Purchase/components/CreatePurchase";
import Products from "./Modules/Inventory/pages/Products";
import Categories from "./Modules/Inventory/pages/Categories";
import Units from "./Modules/Inventory/pages/Units";
import Brands from "./Modules/Inventory/pages/Brands";
import DamagedProducts from "./Modules/Inventory/pages/DamagedProducts";
import UpdateStock from "./Modules/Inventory/pages/UpdateStock";
import CreateRoomBookingV2 from "./Modules/BookRoom/pages/CreateRoomBookingV2";

export const routers = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/unauthorized",
    element: <UnauthorizePage />,
  },
  {
    path: "/login",
    element: <ProtectedRoute children={<Login />} />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "forget-password/otp",
    element: <SendOtp />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/",
    element: <RequireUser children={<AppLayout />} />,
    // element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <RequireUser
            children={<Dashboard />}
            // allowedRoles={["user", "Super Admin", "admin"]}
          />

          // <Dashboard />
        ),
      },
      {
        path: "/account",
        element: <Accountlist />,
      },
      {
        path: "/admin/createadmin",
        element: <CreateAdmin />,
      },

      {
        path: "/admin",
        children: [
          {
            path: "adminlist",
            element: <AdminList />,
          },
          {
            path: "role-list",
            element: <Rolelist />,
          },

          {
            path: "permission-group-list",
            element: <PermissionGrouplist />,
          },
          {
            path: "permission-list",
            element: <Permissionlist />,
          },
          {
            path: "create-permission",
            element: <CreatePermission />,
          },
          {
            path: "create-role-permission",
            element: <CreateRolePermission />,
          },
          {
            path: "audit-trail",
            element: <AudiTrailList />,
          },
        ],
      },
      {
        path: "/restaurent",
        children: [
          {
            path: "create-restaurent",
            element: <Restaurant />,
          },
          {
            path: "ingredients",
            element: <Ingredients />,
          },
          {
            path: "purchase",
            element: <Purchase />,
          },
          {
            path: "supplier",
            element: <Supplier />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "foods",
            element: <Foods />,
          },
          {
            path: "inventory",
            element: <Inventory />,
          },
          {
            path: "all-order",
            element: <AllOrders />,
          },
          {
            path: "pos",
            element: <PointOfSale />,
          },
          {
            path: "kitchen",
            element: <Kitchen />,
          },
          {
            path: "order/1",
            element: <SungleOrder />,
          },
        ],
      },
      {
        path: "/admin/role-list/:id",
        element: <SingleRole />,
      },

      // {
      //   path: "/group/grouplist",
      //   element: <GroupPages />,
      // },
      // {
      //   path: "/group/creategroup",
      //   element: <CreateGroup />,
      // },
      // {
      //   path: "/role-permission/createrole",
      //   element: <CreateRole />,
      // },
      // {
      //   path: "/role-permission/rolelist",
      //   element: <RoleList />,
      // },
      // {
      //   path: "/payroll",
      //   element: <PayrollItems />,
      // },

      // {
      //   path: "/payroll/:id",
      //   element: <Viewpayrolltems />,
      // },
      {
        path: "/payroll",
        element: <PayRollSec />,
      },
      // {
      //   path: "/hall/hall-list",
      //   element: <HallList />,
      // },
      {
        path: "/hall/hall-list",
        element: <HallListTab />,
      },

      {
        path: "/hall/hall-create",
        element: <HallCreate />,
      },
      {
        path: "/hall-details/:id",
        element: <HallDetails />,
      },
      {
        path: "/hall-booking-invoice",
        element: <HallBookingInvoice />,
      },
      {
        path: "/hall-booking-invoice/:id",
        // element: <SingleHallBookingInvoiceList />,
        element: <HallBookingInvoiceModule />,
      },
      {
        path: "/payroll/:id",
        element: <ViewPayrollSec />,
      },
      {
        path: "/check-in",
        element: <CheckIn />,
      },
      {
        path: "/check-in-check-out",
        element: <CheckInCheckOut />,
      },
      {
        path: "/hall-check-in",
        element: <HallCheckIn />,
      },
      {
        path: "/hall-check-in-check-out",
        element: <HallCheckInCheckOut />,
      },
      {
        path: "/guest/guest-list",
        element: <Customer />,
      },
      {
        path: "/guest/guest-list/:id",
        element: <CustomerDetails />,
      },
      {
        path: "/userList",
        element: <UserList />,
      },
      {
        path: "/agentList",
        element: <Agentlist />,
      },
      {
        path: "/projectView/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/projectList",
        element: <Projectlist />,
      },
      {
        path: "/request",
        element: <Request />,
      },

      {
        path: "/guest/create-guest",
        element: <CreateGuest />,
      },
      {
        path: "/invoice/booking-invoice",
        element: <BookingInvoicePage />,
      },
      {
        path: "/invoice/booking-invoice/:id",
        // element: <SingleInvoice />,
        element: <InvoiceClientAndOfficeCopy />,
      },
      {
        path: "/hotel/room-create",
        element: <RoomCreateModule />,
      },
      {
        path: "/hotel/room-list",
        element: <AllRoomLIstTab />,
      },
      {
        path: "/room_detail/:id",
        element: <SinglePageroomDetail />,
      },
      {
        path: "/create-hall-booking/:roomId/:date_Id/:from_Id/:to_Id",
        element: <CreateHallBooking />,
      },
      {
        path: "/hall-booking-list",
        element: <HallBookingList />,
      },
      {
        path: "/single-hall-booked-info/:id",
        element: <HallBookingSingle />,
      },
      {
        path: "/create_room_booking/:roomId/:from_Id/:to_Id",
        element: <CreateRoomBookingV2 />,
      },
      {
        path: "/book_list",
        element: <BookList />,
      },
      {
        path: "/single_book_list/:id",
        element: <SingleBookList />,
      },
      {
        path: "/room-booking-invoice",
        element: <RoomBookingInvoice />,
      },
      {
        path: "/room-booking-invoice/:id",
        // element: <SingleRoomBookingInvoice />,
        element: <RoomBookingInvoiceModule />,
      },
      {
        path: "/invoice/create-booking-invoice",
        element: <CreateInvoice />,
      },

      {
        path: "/report/room-report",
        element: <Report />,
      },
      {
        path: "/report/room-booking-report",
        element: <BookingReport />,
      },
      {
        path: "/report/hall-booking-report",
        element: <AllHallBookingReportList />,
      },
      {
        path: "/report/account-report",
        element: <AccountReport />,
      },
      {
        path: "/report/expense-report",
        element: <AllExpenseReportList />,
      },
      {
        path: "/report/salary-report",
        element: <SalaryReport />,
      },
      {
        path: "/report/guest-ledger-report",
        element: <ClientLedgerReport />,
      },
      {
        path: "/expense/create-expense-head",
        element: <CreateExpenseHead />,
      },
      {
        path: "/expense/expense-head-list",
        element: <ExpenseHeadlist />,
      },
      {
        path: "/expense/create-expense",
        element: <CreateExpense />,
      },
      {
        path: "/expense/expense-list",
        element: <Expenselist />,
      },
      {
        path: "/expense/expense-view/:id",
        element: <ExpenseView />,
      },

      {
        path: "/money-receipt",
        children: [
          {
            path: "invoice-money-receipt",
            element: <InvoiceMoneyReceipt />,
          },
          {
            path: "add-receipt/:guestid/:invoiceid/:type",
            // element: <CreateMoneyReceipt />,
            element: <MoneyReceiptCreate />,
          },

          {
            path: "view-receipt/:id",
            element: <SingleMoneyReceipt />,
          },
          {
            path: "advance-return",
            element: <AdvanceReturn />,
          },
          { path: "advance-return-add", element: <CreateAdvanceReturn /> },
          {
            path: "view-advance-return/:id",
            element: <SingleAdvanceReturnReceipt />,
          },
        ],
      },

      {
        path: "/purchase",
        children: [
          {
            path: "supplier-list",
            element: <PurchaseSupplier />,
          },
          {
            path: "create-supplier",
            element: <CreatePurchaseSupplier />,
          },
          {
            path: "create-purchase",
            element: <CreatePurchase />,
          },
          {
            path: "purchase-list",
            element: <PurchaseList />,
          },
        ],
      },

      {
        path: "/inventory",
        children: [
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "units",
            element: <Units />,
          },
          {
            path: "brands",
            element: <Brands />,
          },
          {
            path: "damaged-products",
            element: <DamagedProducts />,
          },
          {
            path: "update-stock",
            element: <UpdateStock />,
          },
        ],
      },

      {
        path: "/account",
        children: [
          {
            path: "create-account",
            element: <CreateAccount />,
          },
          {
            path: "account-list",
            element: <Accountlist />,
          },
        ],
      },
      {
        path: "/setting",
        children: [
          {
            path: "hotel_profile",
            element: <HotelSingleProfile />,
          },
          {
            path: "room-type",
            element: <HotelRoomTypes />,
          },
          {
            path: "bed-type",
            element: <HotelBedTypes />,
          },
          {
            path: "amenities-type",
            element: <HotelAmenitiesTypes />,
          },
          {
            path: "hall-amenities-type",
            element: <HallAmenitiesTypes />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "payment-method",
            element: <Payment />,
          },
          {
            path: "department-type",
            element: <HotelDepartmentTypes />,
          },
          {
            path: "degisnation-type",
            element: <HotelDegisnationTypes />,
          },
          {
            path: "payroll-month",
            element: <HotelPayrollMonthAndHourSelect />,
          },
          { path: "employee", element: <EmployeeList /> },
          { path: "emplyee-profile/:id", element: <SingleEmployeeProfile /> },
        ],
      },
    ],
  },
]);
