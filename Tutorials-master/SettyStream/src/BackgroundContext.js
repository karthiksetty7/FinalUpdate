import React from 'react'

const BackgroundContext = React.createContext({
  isDarkMode: false,
  savedVideos: [],
  likedVideos: [],
  historyVideos: [],
  toggleTheme: () => {},
  toggleSaveVideo: () => {},
  likeVideo: () => {},
  dislikeVideo: () => {},
  addToHistory: () => {},
})

export default BackgroundContext
