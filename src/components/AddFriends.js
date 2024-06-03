import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../shared";
import send_friend_request_icon from "./send_friend_request_icon.png";

export default function SearchUsername() {
  const token = localStorage.getItem("access");
  const [username, setUsername] = useState("");
  const [usersList, setUsersList] = useState(null);

  const getUsersList = async (username) => {
    const url = baseUrl + "search_users/";
    try {
      const response = await axios.post(
        url,
        { username: username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUsersList(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const send_friend_request = async (username) => {
    const url = baseUrl + "send_friend_request/";
    try {
      const response = await axios.post(
        url,
        { username: username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      if (response.status === 200) {
        setUsersList(usersList.filter((user) => user.username !== username));
        console.log("Friend request sent");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    if (username) {
      getUsersList(username);
    }
  }, [username]);

  const renderUsersList = () => {
    const usersElements = [];
    if (usersList) {
      for (let i = 0; i < usersList.length; i++) {
        usersElements.push(
          <div key={i} className="profile_users_list_item">
            <div className="circle" id="offline"></div>
            <img
              src={baseUrl + usersList[i].avatar.substring(1)}
              alt={usersList[i].username}
              className="profile_users_list_user_image"
            />
            <p className="profile_users_list_username">{usersList[i].username}</p>
            <button className="profile_users_list_button" onClick={() => send_friend_request(usersList[i].username)}>
              <img
                src={send_friend_request_icon}
                alt="Send Friend Request"
                className="profile_users_list_button_icon"
              />
            </button>
          </div>
        );
      }
    } else {
      return <p>Waiting</p>;
    }
    return usersElements;
  };

  return (
    <>
      <input
        className="search_users_input"
        type="text"
        value={username}
        placeholder=" Enter username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <div className="profile_users_list_container">{renderUsersList()}</div>
    </>
  );
}
