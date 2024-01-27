import { FC, ReactNode } from "react";
import "../css/Base.css";

type Props = {
  children: ReactNode;
};

const Base: FC<Props> = ({ children }) => {
  return (
    <div className="root">
      <div className="header">{"header"}</div>
      <div className="main">{children}</div>
      <div className="footer">{"footer"}</div>
    </div>
  );
};

export default Base;
