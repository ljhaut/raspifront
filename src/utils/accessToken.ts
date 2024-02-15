import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

type token = {
  exp: number;
  "https://hasura.io/jwt/claims": any;
  "user.access": string;
  "user.id": number;
};

export const setAccessToken = (s: string) => {
  const cookies = new Cookies();
  cookies.set("jwt", s, {
    sameSite: "strict",
    path: "/",
    secure: true,
  });
};

export const getAccessToken = () => {
  const cookies = new Cookies();
  return cookies.get("jwt");
};

export function isUserAuthenticated() {
  try {
    const accessToken = getAccessToken();
    const decoded: token = jwtDecode(accessToken);
    const access = decoded["user.access"];
    if (access) {
      return true;
    }
  } catch (err) {
    return false;
  }
}

export function userAccess() {
  try {
    const accessToken = getAccessToken();
    const decoded: token = jwtDecode(accessToken);
    const access = decoded["user.access"];
    return access;
  } catch (err) {
    return false;
  }
}
