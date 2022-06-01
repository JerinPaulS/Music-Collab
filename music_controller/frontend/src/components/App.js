import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
//import { render } from "react-dom";
import HomePage from "./HomePage";
//import "/home/jerinpaul/Documents/Git/Music Colab/music_controller/frontend/static/css/index.css";

function App() {
  return (
      <div>
          <HomePage />
      </div>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);