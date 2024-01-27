import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Home from "./components/pages/Home";
import { setAccessToken } from "./utils/accessToken";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return <AppRoutes />;
};

export default App;
