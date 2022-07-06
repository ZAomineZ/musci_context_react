import React from "react";
import "./App.css";
import TrackList from "./components/TrackList";
import { MusicPlayerProvider } from "./MusicPlayerContext";
import PlayerControls from "./components/PlayerControls";

function App() {
  return (
    <MusicPlayerProvider>
      <div className="container">
        <TrackList />
        <PlayerControls />
      </div>
    </MusicPlayerProvider>
  );
}

export default App;
