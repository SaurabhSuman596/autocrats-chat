import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setname] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img
          className="Logo_Img"
          src="https://www.schoolmykids.com/web-images/school/sainik-school-ambikapur.png"
          alt=""
        />
        <h1>THE AUTOCRATS</h1>
        <input
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
        />
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to="/chat"
        >
          <button onClick={sendUser} className="joinbtn">
            Login In
          </button>
        </Link>
        <p>
          Created by : <span>Saurabh Suman</span>
        </p>
      </div>
    </div>
  );
};

export default Join;
export { user };
