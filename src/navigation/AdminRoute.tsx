import { FC } from "react";
import { Navigate } from "react-router-dom";
import { userAccess } from "../utils/accessToken";

type Props = {
  children: any;
};

const AdminRoute: FC<Props> = ({ children }) => {
  if (userAccess() !== "admin") {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default AdminRoute;
