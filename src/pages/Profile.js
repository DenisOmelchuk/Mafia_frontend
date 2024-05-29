// profile.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../shared";
import ProfileModal from "../components/ProfileModal";
import img from "./Saul.png";
import user_icon from "./user_icon.png";
import cancel_icon_active from "./cancel_icon_active.png";
import cancel_icon_deactive from "./cancel_icon_deactive.png";
import Header from "../components/Header";
import friends_icon from "./friends_icon.png";
import add_friends_icon from "./add_friends_icon.png";
import go_back_icon_animated from "./go_back_icon_animated.gif";
import go_back_icon_static from "./go_back_icon_static.png";
import a from "./a.jpg";

export default function Profile() {
  const [username, setUsername] = useState("null");
  const [temproraryUsername, setTemproraryUsername] = useState("null");
  const [image, setImage] = useState(a);
  const [temproraryImage, setTemproraryImage] = useState(null);
  const [temproraryImageFile, setTemproraryImageFile] = useState(null);
  const token = localStorage.getItem("access");

  const modalRef = useRef();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const url = baseUrl + "profile/";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { username, avatar } = response.data;
        setUsername(username);
        setTemproraryUsername(username);
        setImage(baseUrl + avatar.substring(1));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateUserData = async (event) => {
    event.preventDefault();
    const url = baseUrl + "profile/update/";
    const formData = new FormData();

    if (temproraryImage !== null) {
      formData.append("avatar", temproraryImageFile);
    }

    if (temproraryUsername !== username) {
      formData.append("username", temproraryUsername);
    }

    try {
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const { username, avatar } = response.data;
        setUsername(username);
        setTemproraryUsername(username);
        setImage(baseUrl + avatar.substring(1));
        setTemproraryImage(null);
        setTemproraryImageFile(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setTemproraryImageFile(file);
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTemproraryImage(imageURL);
    }
  };

  const cancelChanges = () => {
    setTemproraryImage(null);
    setTemproraryUsername(username);
    setTemproraryImageFile(null);
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <>
      <Header />
      <ProfileModal ref={modalRef}>
        <button
          onClick={() => modalRef.current.close()}
          className="go_back_btn"
        >
          {isHovered ? (
            <img
              src={go_back_icon_animated}
              alt=""
              className="go_back_icon"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            />
          ) : (
            <img
              src={go_back_icon_static}
              alt=""
              className="go_back_icon"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            />
          )}
        </button>
      </ProfileModal>
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
                  />
                ) : (
                  <img
                    src={temproraryImage}
                    alt=""
                    className="user_image_profile_info_new"
                  />
                )}

                <input
                  type="file"
                  name="image"
                  id="image"
                  className="update_user_image_input"
                  accept="image/png, image/jpeg"
                  onChange={handleFileInput}
                />
                <label htmlFor="image" className="profile_image_input">
                  Update Photo
                </label>
              </div>
              <div className="username_info_container">
                <img src={user_icon} alt="" className="user_icon" />
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
                <img src={friends_icon} alt="" className="friends_icon" />
                <button
                  className="profile_friends_btn"
                  onClick={() => modalRef.current.open()}
                >
                  See Friends
                </button>
                <button className="profile_add_friend_btn">
                  <img
                    src={add_friends_icon}
                    alt=""
                    className="add_friends_icon"
                  />
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
                    />
                  ) : (
                    <img
                      src={cancel_icon_active}
                      alt=""
                      className="cancel_btn_icon"
                      onClick={cancelChanges}
                    />
                  )}
                </button>
                <button
                  onClick={updateUserData}
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
