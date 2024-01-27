import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  ApolloLink,
  Observable,
} from "@apollo/client";
import Cookies from "universal-cookie";
import { onError } from "@apollo/client/link/error";
import { getAccessToken, setAccessToken } from "./utils/accessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { JwtPayload, jwtDecode } from "jwt-decode";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const cookies = new Cookies();

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        return new Promise((resolve) => {
          const token = getAccessToken();

          if (!token) {
            resolve(true);
          } else {
            try {
              const { exp } = jwtDecode<JwtPayload>(token);
              if (Date.now() >= exp! * 1000) {
                resolve(false);
              } else {
                resolve(true);
              }
            } catch {
              resolve(false);
            }
          }
        });
      },
      fetchAccessToken: () => {
        return fetch("http://127.0.0.1:5000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: process.env.REACT_APP_HASURA_URL,
      credentials: "include",
    }),
  ]),
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
