import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { isUserAuthenticated, userAccess } from "./utils/accessToken";
import PrivateRoute from "./navigation/PrivateRoute";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import AdminPage from "./components/pages/AdminPage";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            isUserAuthenticated() ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <RegisterPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            userAccess() === "admin" ? <AdminPage /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
