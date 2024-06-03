import React, { useEffect, useState } from "react";
import delete_icon from "./delete_icon.png";
import axios from "axios";
import { baseUrl } from "../shared";

export default function FriendsList() {
  const token = localStorage.getItem("access");
  const [friendsList, setFriendsList] = useState(null);

  const getFriendsList = async () => {
    const url = baseUrl + "list_friends/";
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFriendsList(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteFriend = async (username) => {
    const url = baseUrl + "delete_friend/";
    try {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { username: username }, 
      });

      if (response.status === 200) {
        // Remove the friend from the state
        setFriendsList(friendsList.filter(friend => friend.username !== username));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getFriendsList();
  }, []);

  const renderFriendsList = () => {
    const friendsElements = [];
    if (friendsList) {
      for (let i = 0; i < friendsList.length; i++) {
        friendsElements.push(
          <div key={i} className="profile_users_list_item">
            <div className="circle" id="offline"></div>
            <img src={baseUrl + friendsList[i].avatar.substring(1)} alt={friendsList[i].username} className="profile_users_list_user_image" />
            <p className="profile_users_list_username">{friendsList[i].username}</p>
            <button className="profile_users_list_button" onClick={() => deleteFriend(friendsList[i].username)}>
              <img src={delete_icon} alt="Delete" className="profile_users_list_button_icon" />
            </button>
          </div>
        );
      }
    } else {
      return <p>Waiting</p>;
    }
    return friendsElements;
  };

  return (
    <div className="profile_users_list_container">
      {renderFriendsList()}
    </div>
  );
}
