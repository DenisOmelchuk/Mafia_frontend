import React, { useState, useEffect } from "react";
import img from "./Heisengerg.jpg";
import { baseUrl } from "../shared";
import Header from "../components/Header";

export default function CreateGame() {
  const [gameCreated, setGameCreated] = useState(false);
  const url = baseUrl + "createGame";

  const minNumOfPlayers = 5;
  const maxNumOfPlayers = 13;
  const [numOfPlayers, setNumOfPlayers] = useState(5);

  function processGameCreation(e) {
    e.preventDefault();
    setGameCreated(true);
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     localStorage.setItem("access", data.access);
    //   });
  }

  useEffect(() => {
    console.log(gameCreated);
  }, [gameCreated]);

  useEffect(() => {
    setGameCreated(false);
  }, []);

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
                  Create
                </span>
                <span className="create_game_form_container_pararaph_the_game">
                  the game!
                </span>
              </p>
            </div>
            <p className="info" id="create_game_info">And choose the amount of players (5-13)</p>
            <form className="create_game_form">
              <button
                onClick={(e) => {
                  processGameCreation(e);
                }}
                className={
                  gameCreated
                    ? "create_game_btn_deactive"
                    : "create_game_btn_active"
                }
              >
                Create
              </button>
              <input
                type="text"
                onChange={(e) => setNumOfPlayers(e.target.value)}
                value={numOfPlayers}
                className="grey_input_field num_of_players_input"
                id={numOfPlayers > 4 && numOfPlayers < 14 ? "" : ""}
              />
            </form>

            <hr className="custom-hr" />
            {gameCreated ? (
              <>
                <p className="info" id="gameID_info">
                  copy GameID and share it with your friends
                </p>
                <p className="game_id">XGJSLP345</p>
                <button className="copy_game_id_btn">copy</button>
                <button className="join_game_btn">Join Game</button>
              </>
            ) : (
              <>
                <div class="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
