import React, { useState } from "react";
import { Link } from "react-router-dom";

import "src/components/Join/Join.css";
import readingBook from "src/icons/readingBook.svg";
// import InfoComponent from "./components/InfoComponent"
// import FormComponent from "./components/FormComponent";

const Join = ({location}) => {

  console.log(location)

  const [viewInfo, setViewInfo] = useState(0);
  const toggle = () => { setViewInfo(!viewInfo); }

  const FormComponent = ()=> {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    return (<div>
      <div>
        <input
          placeholder="Nick Name"
          className="joinInput"
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div>
        <input
          placeholder="Room Name"
          className="joinInput mt-20"
          type="text"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
      </div>
      <Link
        onClick={(e) => (!room || !name) && e.preventDefault()}
        to={`/app/chat?name=${name}&room=${room}`}
      >
        <button className="button mt-20 fontprime bgbutton" type="submit">
          Sign In
        </button>
      </Link>

  </div>)
  }

  return (
    <div className="joinOuterContainer" style={{backgroundColor: "#F4F6F8"}}>
      <img className="bookIcon" src={readingBook} alt="."></img>
      <div className="joinInnerContainer" style={{backgroundColor: "white"}}>
        <h1 className="chatHeading"> Join Room </h1>
        <FormComponent />
      </div>
    </div>
  );
};

export default Join;


/*
Link tag sends the data to /room
*/
