import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../utils/accessToken";
import { Link } from "react-router-dom";

const LoginPage: FC = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
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
    <div>
      <Link to="/register">register</Link>
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
    </div>
  );
};

export default LoginPage;
