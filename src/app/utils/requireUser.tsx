/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from "react-router-dom";
import { userApi } from "../api/userApi/userApi";
import { IUser } from "../../auth/types/loginTypes";
import GlobalLoader from "../../components/loader/GlobalLoader";

const RequireUser = ({
  children,
}: {
  allowedRoles?: string[];
  children: JSX.Element;
}): any => {
  const location = useLocation();

  const { isLoading } = userApi.endpoints.getMe.useQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const storedUser = localStorage?.getItem("token");
  const token = storedUser ? JSON.parse(storedUser).token : null;

  // const loading = isLoading || isFetching;

  const profileData = userApi.endpoints.getMe.useQueryState(undefined, {
    selectFromResult: (cache) => {
      const data = cache.data?.data;
      let profileData: IUser = {} as IUser;
      if (data) {
        profileData = data;
      }
      return profileData;
    },
  });

  if (isLoading) {
    return <GlobalLoader />;
  }

  return token && profileData.id ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  // return token &&
  //   profileData.id &&
  //   allowedRoles.includes(profileData.role_name as string) ? (
  //   children
  // ) : token && profileData.id ? (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default RequireUser;
