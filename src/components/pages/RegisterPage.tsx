import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: FC = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
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
      <button type="submit">register</button>
    </form>
  );
};

export default RegisterPage;
