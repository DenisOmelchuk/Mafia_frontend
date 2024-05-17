import React, { useState, useEffect } from "react";
import img from "./Jessy.jpg";
import Header from "../components/Header";

export default function CreateGame() {
  return (
    <>
      <Header />
      <div className="create_page_container">
        <div className="create_game_img_form_container">
          <img src={img} alt="" className="heisengerg_img" />
          <div className="form_container" >
            <div className="create_game_form_container_pararaph_container">
              <p>
                <span className="create_game_form_container_pararaph_create">
                  Join
                </span>
                <span className="create_game_form_container_pararaph_the_game">
                  the game!
                </span>
              </p>
            </div>
            <hr className="custom-hr_join" />
            <form>
              <input
                className="grey_input_field register_login_input"
                placeholder="Enter GameID"
              ></input>
              <button className="join_game_btn">Join Game</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
