import { createContext, Dispatch, SetStateAction, useState } from "react";
import LostChameleon from "./assets/LostChameleon.mp3";
import Rock from "./assets/TheHipsta.mp3";
import Tobu from "./assets/Tobu.mp3";
import { Track } from "./types/track";

interface IMusicPlayerProviderProps {
  children: JSX.Element;
}

export interface IMusicPlayerState {
  audioPlayer: HTMLAudioElement;
  tracks: Track[];
  currentTrackIndex: number | null;
  isPlaying: boolean;
}

const MusicPlayerContext = createContext<
  [IMusicPlayerState, Dispatch<SetStateAction<IMusicPlayerState>>]
>([{} as IMusicPlayerState, () => {}]);

const MusicPlayerProvider = ({ children }: IMusicPlayerProviderProps) => {
  const [state, setState] = useState<IMusicPlayerState>({
    audioPlayer: new Audio(),
    tracks: [
      {
        name: "Lost Chameleon - Genesis",
        file: LostChameleon,
      },
      {
        name: "The Hipsta - Shaken Soda",
        file: Rock,
      },
      {
        name: "Tobu - Such Fun",
        file: Tobu,
      },
    ],
    currentTrackIndex: null,
    isPlaying: false,
  });

  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };
