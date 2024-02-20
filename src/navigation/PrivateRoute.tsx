import { FC } from "react";
import { isUserAuthenticated } from "../utils/accessToken";
import { Navigate } from "react-router-dom";

type Props = {
  children: any;
};

const PrivateRoute: FC<Props> = ({ children }) => {
  if (!isUserAuthenticated()) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
