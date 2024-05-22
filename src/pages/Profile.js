import React, { useState, useEffect } from "react";
import img from "./Saul.png";
import user_icon from "./user_icon.png";
import cancel_icon_active from "./cancel_icon_active.png";
import cancel_icon_deactive from "./cancel_icon_deactive.png";
import Header from "../components/Header";
import friends_icon from "./friends_icon.png";
import add_friends_icon from "./add_friends_icon.png";
import a from "./a.jpg";

export default function CreateGame() {
  const [username, setUsername] = useState("Denny");
  const [temproraryUsername, setTemproraryUsername] = useState("Denny");
  const [image, setImage] = useState(a);
  const [temproraryImage, setTemproraryImage] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTemproraryImage(imageURL);
    }
  };

  const cancelChanges = () => {
    setTemproraryImage(null);
    setTemproraryUsername(username);
  };

  return (
    <>
      <Header />
      <div className="create_page_container">
        <div className="create_game_img_form_container">
          <img src={img} alt="" className="heisengerg_img" />
          <div className="form_container">
            <div className="create_game_form_container_pararaph_container">
              <p>
                <span className="create_game_form_container_pararaph_create">
                  Edit
                </span>
                <span className="create_game_form_container_pararaph_the_game">
                  your profile!
                </span>
              </p>
            </div>
            <hr className="custom-hr_join" />
            <div className="user_information_container">
              <div className="user_image_info_container">
                {temproraryImage === null ? (
                  <img
                    src={image}
                    alt=""
                    className="user_image_profile_info_original"
                  ></img>
                ) : (
                  <img
                    src={temproraryImage}
                    alt=""
                    className="user_image_profile_info_new"
                  ></img>
                )}

                <input
                  type="file"
                  name="image"
                  id="image"
                  className="update_user_image_input"
                  accept="image/png, image/jpeg"
                  onChange={handleFileInput}
                />
                <label for="image" className="profile_image_input">
                  Update Photo
                </label>
              </div>
              <div className="username_info_container">
                <img src={user_icon} alt="" className="user_icon"></img>
                <input
                  type="text"
                  onChange={(e) => setTemproraryUsername(e.target.value)}
                  value={temproraryUsername}
                  className="grey_input_field username_input"
                  id={
                    temproraryUsername === username
                      ? "username_input_unchanged"
                      : "username_input_changed"
                  }
                />
              </div>
              <div className="profile_friends_container">
                <img src={friends_icon} alt="" className="friends_icon"></img>
                <button className="profile_friends_btn">See Friends</button>
                <button className="profile_add_friend_btn">
                  <img
                    src={add_friends_icon}
                    alt=""
                    className="add_friends_icon"
                  ></img>
                </button>
              </div>
              <div className="profile_btns_container">
                <button
                  className="cancel_btn"
                  id={
                    temproraryUsername === username && temproraryImage === null
                      ? "cancel_btn_deactive"
                      : ""
                  }
                >
                  {temproraryUsername === username &&
                  temproraryImage === null ? (
                    <img
                      src={cancel_icon_deactive}
                      alt=""
                      className="cancel_btn_icon"
                    ></img>
                  ) : (
                    <img
                      src={cancel_icon_active}
                      alt=""
                      className="cancel_btn_icon"
                      onClick={cancelChanges}
                    ></img>
                  )}
                </button>
                <button
                  className="update_btn"
                  id={
                    temproraryUsername === username && temproraryImage === null
                      ? "update_btn_deactive"
                      : "update_btn_active"
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
