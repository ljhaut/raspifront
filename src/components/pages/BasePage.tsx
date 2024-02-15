import { FC, ReactNode } from "react";
import "../css/Base.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

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

const BasePage: FC<Props> = ({ children }) => {
  return (
    <div className="root">
      <header className="header">
        <LogOutButton />
      </header>
      <div className="main">{children}</div>
      <footer className="footer">footer</footer>
    </div>
  );
};

export default BasePage;
