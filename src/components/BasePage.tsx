import { FC, ReactNode } from "react";
import "./css/BasePage.css";
import { ApolloProvider } from "@apollo/client";
import client from "../graphQL/apolloClient";

type BasePageProps = {
  children: ReactNode;
};

const BasePage: FC<BasePageProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <div className="root">
        <div className="header">{"header"}</div>
        <div className="main">{children}</div>
        <div className="footer">{"footer"}</div>
      </div>
    </ApolloProvider>
  );
};

export default BasePage;
