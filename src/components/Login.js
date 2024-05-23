import { useState } from "react";
import { baseUrl } from "../shared";
import RegisterLogin from "./RegisterLoginHeader";
import RegisterLoginContainer from "./RegisterLoginContainer";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login_user(e) {
    e.preventDefault();
    const url = baseUrl + "token/"; 
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.access && data.refresh) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          console.log("Login successful:", data);
        } else {
          console.error("Login failed:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="register_login_form_container">
      <form onSubmit={login_user} id="login" className="register_login_form">
        <input
          type="text"
          value={username}
          id="login"
          className="grey_input_field register_login_input"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          id="password"
          className="grey_input_field register_login_input"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={login_user}
          form="register_form"
          className={
            username !== "" && password !== ""
              ? "register_login_btn_active"
              : "register_login_btn_deactive"
          }
        >
          Login
        </button>
      </form>
    </div>
  );
}
