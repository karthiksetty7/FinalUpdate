import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import SpecificVideo from './components/SpecificVideo'
import Trending from './components/Trending'
import SavingVideos from './components/SavingVideos'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import History from './components/History'
import LikedVideos from './components/LikedVideos'
import Downloads from './components/Downloads'

import BackgroundContext from './BackgroundContext'
import './App.css'

class App extends Component {
  state = {
    isDarkMode: false,
    savedVideos: JSON.parse(localStorage.getItem('savedVideos')) || [],
    likedVideos: JSON.parse(localStorage.getItem('likedVideos')) || [],
    historyVideos: JSON.parse(localStorage.getItem('historyVideos')) || [],
  }

  componentDidUpdate() {
    const {savedVideos, likedVideos, historyVideos} = this.state

    localStorage.setItem('savedVideos', JSON.stringify(savedVideos))
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos))
    localStorage.setItem('historyVideos', JSON.stringify(historyVideos))
  }

  toggleTheme = () => {
    this.setState(prev => ({isDarkMode: !prev.isDarkMode}))
  }

  toggleSaveVideo = video => {
    this.setState(prev => {
      const exists = prev.savedVideos.find(v => v.id === video.id)

      return {
        savedVideos: exists
          ? prev.savedVideos.filter(v => v.id !== video.id)
          : [...prev.savedVideos, video],
      }
    })
  }

  likeVideo = video => {
    this.setState(prev => {
      const exists = prev.likedVideos.find(v => v.id === video.id)
      if (exists) return null

      return {likedVideos: [...prev.likedVideos, video]}
    })
  }

  dislikeVideo = video => {
    this.setState(prev => ({
      likedVideos: prev.likedVideos.filter(v => v.id !== video.id),
    }))
  }

  addToHistory = video => {
    const today = new Date().toDateString()

    this.setState(prev => {
      const updatedHistory = prev.historyVideos.filter(
        each => each.video.id !== video.id,
      )

      return {
        historyVideos: [{date: today, video}, ...updatedHistory],
      }
    })
  }

  render() {
    return (
      <BackgroundContext.Provider
        value={{
          ...this.state,
          toggleTheme: this.toggleTheme,
          toggleSaveVideo: this.toggleSaveVideo,
          likeVideo: this.likeVideo,
          dislikeVideo: this.dislikeVideo,
          addToHistory: this.addToHistory,
        }}
      >
        <Switch>
          <Route path='/login' component={Login} />
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute path='/videos/:id' component={SpecificVideo} />
          <ProtectedRoute path='/trending' component={Trending} />
          <ProtectedRoute path='/gaming' component={Gaming} />
          <ProtectedRoute path='/saved-videos' component={SavingVideos} />
          <ProtectedRoute path='/liked-videos' component={LikedVideos} />
          <ProtectedRoute path='/history' component={History} />
          <ProtectedRoute path='/downloads' component={Downloads} />
          <Route component={NotFound} />
        </Switch>
      </BackgroundContext.Provider>
    )
  }
}

export default App
