import React from "react";
import "./style.css";

export default ({black}) => {
  return (
    <header className={black ? 'black':''}>
      <div className="header--logo">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="https://i.pinimg.com/originals/f7/c0/fe/f7c0feecbb4bb4dcee1d339a633566bd.png" />
        </a>
      </div>
    </header>
  );
};
