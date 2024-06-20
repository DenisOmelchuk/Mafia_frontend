import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo_unactive.png";
import logoActive from "./logo_active.png";
import notification_icon from "./notification_icon.png";
import accept_icon from "./accept_icon.png";
import dont_accept_icon from "./dont_accept_icon.png";
import { baseUrl } from "../shared";
import axios from "axios";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Create", href: "/create_game" },
  { name: "Join", href: "/join_game" },
  { name: "Profile", href: "/profile" },
  { name: "Logout", href: "/logout" },
];

export default function Header(props) {
  const [isLogoActive, setIsLogoActive] = useState(false);
  const [friendsRequests, setFriendsRequests] = useState(
    JSON.parse(localStorage.getItem("friendsRequests")) || []
  );
  const [gameInvitations, setGameInvitations] = useState(
    JSON.parse(localStorage.getItem("gameInvitations")) || []
  );

  const [token, setToken] = useState(localStorage.getItem("access")); // Initial state based on token in local storage

  useEffect(() => {
    // Save friendsRequests to localStorage whenever it changes
    localStorage.setItem("friendsRequests", JSON.stringify(friendsRequests));
  }, [friendsRequests]);

  useEffect(() => {
    // Save gameInvitations to localStorage whenever it changes
    localStorage.setItem("gameInvitations", JSON.stringify(gameInvitations));
  }, [gameInvitations]);

  useEffect(() => {
    const wsUrl = token
      ? `ws://localhost:8000/ws/notifications/?token=${token}`
      : null; // WebSocket URL depends on token existence
    if (wsUrl) {
      const chatSocket = new WebSocket(wsUrl); // Create WebSocket only if token exists

      chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        if (data.game_invitations) {
          setGameInvitations((prevInvitations) => [
            ...prevInvitations,
            ...data.game_invitations,
          ]);
        }
        if (data.friend_requests) {
          setFriendsRequests((prevFriendRequests) => [
            ...prevFriendRequests,
            ...data.friend_requests,
          ]);
        } else {
          alert("The message is empty!");
        }
      };

      chatSocket.onclose = function (e) {
        console.log("The socket closed unexpectedly");
      };

      // Cleanup function to close the WebSocket connection
      return () => {
        chatSocket.close();
      };
    }
  }, [token]);

  const friendRequestAccept = async (username) => {
    const url = baseUrl + "friend_request_accept/";
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
        setFriendsRequests(
          friendsRequests.filter((user) => user.username !== username)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const friendRequestRefuse = async (username) => {
    const url = baseUrl + "friend_request_refuse/";
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
        setFriendsRequests(
          friendsRequests.filter((user) => user.username !== username)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderGameInviteNotifications = () => {
    const gameInvitationsElements = [];
    const gameInvitationsElementsLenght = gameInvitations.length;

    for (let i = 0; i < gameInvitationsElementsLenght; i++) {
      gameInvitationsElements.push(
        <>
          <div key={i} className="notification_userbox_container">
            <div
              className="notification_userbox"
              id="notification_userbox_game"
            >
              <div className="notification_userbox_user_info_container">
                <img
                  src={baseUrl + gameInvitations[i].avatar.substring(1)}
                  alt={gameInvitations[i].username}
                  className="notification_user_img"
                ></img>
                <p className="notification_user_username">
                  {gameInvitations[i].username}
                </p>
              </div>
              <div className="notification_userbox_second_container">
                <p className="notification_user_game_players_current">
                  {gameInvitations[i].current_players}
                </p>
                <p className="notification_user_game_players_expected">
                  / {gameInvitations[i].expected_players}
                </p>
              </div>
            </div>
            <div className="notification_game_btn_container">
              <button className="notification_game_join">Join</button>
              <button className="notification_game_invite">Invite</button>
              <button className="notification_game_cancel_btn">
                <img
                  src={dont_accept_icon}
                  className="notification_game_cancel_icon"
                ></img>
              </button>
            </div>
          </div>
          {i !== gameInvitationsElementsLenght - 1 && (
            <hr key={i} className="notifications_user_separation_hr"></hr>
          )}
        </>
      );
    }
    return gameInvitationsElements;
  };

  const renderFriendRequestsNotifications = () => {
    const friendsRequestsElements = [];
    const friendsRequestsElementsLength = friendsRequests.length;

    for (let i = 0; i < friendsRequestsElementsLength; i++) {
      friendsRequestsElements.push(
        <>
          <div
            key={i}
            className="notification_userbox"
            id="notification_userbox_friend"
          >
            <div className="notification_userbox_user_info_container">
              <img
                src={baseUrl + friendsRequests[i].avatar.substring(1)}
                className="notification_user_img"
              ></img>
              <p className="notification_user_username">
                {friendsRequests[i].username}
              </p>
            </div>
            <div className="notification_userbox_second_container">
              <button
                className="notification_frnds_btn"
                id="notif_frnds_accept_btn"
                onClick={() => friendRequestAccept(friendsRequests[i].username)}
              >
                <img
                  src={accept_icon}
                  className="notification_friends_icon"
                ></img>
              </button>
              <button
                className="notification_frnds_btn"
                id="notif_frnds_dnt_accept_btn"
                onClick={() => friendRequestRefuse(friendsRequests[i].username)}
              >
                <img
                  src={dont_accept_icon}
                  className="notification_friends_icon"
                ></img>
              </button>
            </div>
          </div>
          {i !== friendsRequestsElementsLength - 1 && (
            <hr key={i} className="notifications_user_separation_hr"></hr>
          )}
        </>
      );
    }
    return friendsRequestsElements;
  };

  return (
    <>
      <div className="my-2 flex items-center">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={() => setIsLogoActive(false)}
            className={({ isActive }) => {
              return (
                "px-5 py-1 text-base no-underline " +
                (!isActive
                  ? "text-slate-200 hover:text-white font-Noto_Sans_Lisu font-medium"
                  : "text-yellow-400 font-Noto_Sans_Lisu font-medium")
              );
            }}
          >
            {item.name === "About"
              ? ({ isActive }) =>
                  isActive ? (
                    <a href={item.href}>
                      <img
                        src={logoActive}
                        alt="HTML tutorial"
                        style={{ height: "30px", width: "auto" }}
                      />
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      onMouseEnter={() => setIsLogoActive(true)}
                      onMouseLeave={() => setIsLogoActive(false)}
                    >
                      <img
                        src={isLogoActive ? logoActive : logo}
                        alt="HTML tutorial"
                        style={{ height: "30px", width: "auto" }}
                      />
                    </a>
                  )
              : item.name}
          </NavLink>
        ))}
        {(gameInvitations.length > 0 || friendsRequests.length > 0) && (
          <div>
            <div className="notification_div">
              <img
                src={notification_icon}
                alt=""
                className="notification_icon"
              ></img>
              <div class="notification-conteiner">
                <div className="notifications_margin_div_top"></div>
                <div className="notification_content">
                  {gameInvitations.length > 0 && (
                    <>
                      <p className="notification_type_paragraph">
                        Game Invitations
                      </p>
                      <hr className="notifications_hr"></hr>
                      {renderGameInviteNotifications()}
                    </>
                  )}
                  {friendsRequests.length > 0 && (
                    <>
                      <p className="notification_type_paragraph">
                        Friends Requests
                      </p>
                      <hr className="notifications_hr"></hr>
                      {renderFriendRequestsNotifications()}
                    </>
                  )}
                  <div className="notification_margin_div_end"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>{props.children}</div>
    </>
  );
}
