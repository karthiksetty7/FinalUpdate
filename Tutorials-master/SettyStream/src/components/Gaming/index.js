import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import BackgroundContext from '../../BackgroundContext'

import './index.css'

const apiStatus = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class Gaming extends Component {
  state = {
    videos: [],
    status: apiStatus.INITIAL,
  }

  componentDidMount() {
    this.fetchGaming()
  }

  fetchGaming = async () => {
    this.setState({status: apiStatus.LOADING})

    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/videos/gaming', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    if (response.ok) {
      const data = await response.json()

      const updated = data.videos.map(v => ({
        id: v.id,
        title: v.title,
        thumbnailUrl: v.thumbnail_url,
        viewCount: v.view_count,
      }))

      this.setState({videos: updated, status: apiStatus.SUCCESS})
    } else {
      this.setState({status: apiStatus.FAILURE})
    }
  }

  renderVideos = () => {
    const {videos} = this.state

    return (
      <ul className='gaming__grid'>
        {videos.map(video => (
          <li key={video.id} className='gaming__card'>
            <img
              src={video.thumbnailUrl}
              alt='gaming video'
              className='gaming__thumbnail'
            />

            <h3 className='gaming__title'>{video.title}</h3>

            <p className='gaming__views'>
              {video.viewCount} Watching Worldwide
            </p>
          </li>
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.LOADING:
        return (
          <div className='loader-container'>
            <Loader type='ThreeDots' color='#888' />
          </div>
        )

      case apiStatus.FAILURE:
        return (
          <div className='gaming__error'>
            <h2>Failed to load Gaming</h2>
            <button type='button' onClick={this.fetchGaming}>
              Retry
            </button>
          </div>
        )

      case apiStatus.SUCCESS:
        return this.renderVideos()

      default:
        return null
    }
  }

  render() {
    return (
      <BackgroundContext.Consumer>
        {({isDarkMode}) => (
          <>
            <Header />
            <div className='nav-sections-container'>
              <LeftNavBar />
              <main className={`gaming ${isDarkMode ? 'gaming--dark' : ''}`}>
                {/* HEADER */}
                <div className='gaming__header'>
                  <SiYoutubegaming className='gaming__icon' />
                  <h1>Gaming</h1>
                </div>

                {this.renderContent()}
              </main>
            </div>
          </>
        )}
      </BackgroundContext.Consumer>
    )
  }
}

export default Gaming
