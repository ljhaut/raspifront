import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../utils/accessToken";
import { Link } from "react-router-dom";
import "../css/LoginPage.css";

const LoginPage: FC = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });
      const data = await response.json();

      if (response.status === 200) {
        console.log("User logged in successfully", data);
        setAccessToken(data["accessToken"]);
        navigator("/home");
      } else {
        console.error("Login error:", data);
      }
    } catch (err) {
      console.error("There was an error sending the request", err);
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <h2 className="page-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              value={username}
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit">login</button>
        </form>
        <Link to="/register" className="register-link">
          register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
