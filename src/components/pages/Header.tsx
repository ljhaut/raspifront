import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { userAccess } from "../../utils/accessToken";
import "../css/Header.css";

const LogOutButton: FC = () => {
  const navigator = useNavigate();

  const handleLogOut = async () => {
    const cookies = new Cookies();
    cookies.remove("jwt");

    const response = await fetch("http://127.0.0.1:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);

    navigator("/login");
  };

  return <button onClick={handleLogOut}>Log Out</button>;
};

const HomeButton: FC = () => {
  const navigator = useNavigate();
  const goHome = () => {
    navigator("/home");
  };
  return <button onClick={goHome}>Home</button>;
};

const AdminButton: FC = () => {
  const navigator = useNavigate();
  const goAdmin = () => {
    navigator("/admin");
  };
  return <button onClick={goAdmin}>Admin</button>;
};

const Header: FC = () => {
  const location = useLocation();
  const title = location.pathname === "/admin" ? "Adminsivu" : "Kotisivu";
  return (
    <div className="header">
      <div className="inner-header">
        <div>
          <HomeButton />
          {userAccess() === "admin" && <AdminButton />}
        </div>
        <div>{title}</div>
        <div>
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
