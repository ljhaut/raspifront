import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/RegisterPage.css";

const RegisterPage: FC = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (response.status === 201) {
        console.log("User created succesfully", data);
        navigator("/login");
      } else {
        console.error("Registration error:", data);
      }
    } catch (err) {
      console.error("There was an error sending the request", err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="page-title">Register</h2>
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
        <button type="submit">register</button>
        <Link to="/login" className="back">
          back
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
