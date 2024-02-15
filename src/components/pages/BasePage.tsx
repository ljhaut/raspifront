import { FC, ReactNode } from "react";
import "../css/Base.css";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const BasePage: FC<Props> = ({ children }) => {
  return (
    <div className="root">
      <header className="header">
        <Header />
      </header>
      <div className="main">{children}</div>
      <footer className="footer"></footer>
    </div>
  );
};

export default BasePage;
