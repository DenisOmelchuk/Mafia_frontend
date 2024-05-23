import { useState } from "react";
import { baseUrl } from "../shared";
import axios from "axios";
import x_img from "./x.png";
import check_mark from "./check_mark.png";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const url = baseUrl + "registration/";

  const registerUser = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", image);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="register_login_form_container">
      <form
        onSubmit={registerUser}
        className="register_login_form"
        encType="multipart/form-data"
      >
        <input
          type="text"
          value={username}
          className="grey_input_field register_login_input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          className="grey_input_field register_login_input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="register_login_img_input_container">
          <input
            type="file"
            name="image"
            id="image"
            className="register_login_img_input"
            accept="image/png, image/jpeg"
            onChange={handleFileInput}
          />
          <label for="image">Upload image</label>
          {image ? (
            <img src={check_mark} alt="" className="check_mark_img" />
          ) : (
            <img src={x_img} alt="" className="x_img" />
          )}
        </div>
        <button
          onClick={registerUser}
          className={
            username !== "" && password !== "" && image !== null
              ? "register_login_btn_active"
              : "register_login_btn_deactive"
          }
        >
          Register
        </button>
      </form>
    </div>
  );
}
