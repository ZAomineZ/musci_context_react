import { Dispatch, SetStateAction, useContext } from "react";
import { IMusicPlayerState, MusicPlayerContext } from "../MusicPlayerContext";

const useMusicPlayer = () => {
  const [state, setState] =
    useContext<
      [IMusicPlayerState, Dispatch<SetStateAction<IMusicPlayerState>>]
    >(MusicPlayerContext);

  function playTrack(index: number) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      state.audioPlayer.pause();
      state.audioPlayer = new Audio(state.tracks[index].file);
      state.audioPlayer.play().then((r) => r);
      setState((state) => ({
        ...state,
        currentTrackIndex: index,
        isPlaying: true,
      }));
    }
  }

  function togglePlay() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play().then((r) => r);
    }
    setState((state) => ({ ...state, isPlaying: !state.isPlaying }));
  }

  function playPreviousTrack() {
    if (null === state?.currentTrackIndex) return;

    const newIndex =
      (((state?.currentTrackIndex + -1) % state.tracks.length) +
        state.tracks.length) %
      state.tracks.length;
    playTrack(newIndex);
  }

  function playNextTrack() {
    if (null === state?.currentTrackIndex) return;

    const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    playTrack(newIndex);
  }

  return {
    playTrack,
    togglePlay,
    currentTrackName:
      state.currentTrackIndex !== null &&
      state.tracks[state.currentTrackIndex]?.name,
    trackList: state.tracks,
    isPlaying: state.isPlaying,
    playPreviousTrack,
    playNextTrack,
  };
};

export default useMusicPlayer;
