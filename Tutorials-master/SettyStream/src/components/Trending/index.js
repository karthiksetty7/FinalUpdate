import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'

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

class Trending extends Component {
  state = {
    videos: [],
    status: apiStatus.INITIAL,
  }

  componentDidMount() {
    this.fetchTrending()
  }

  fetchTrending = async () => {
    this.setState({status: apiStatus.LOADING})

    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/videos/trending', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    if (response.ok) {
      const data = await response.json()

      const updated = data.videos.map(v => ({
        id: v.id,
        title: v.title,
        thumbnailUrl: v.thumbnail_url,
        viewCount: v.view_count,
        publishedAt: v.published_at,
        channel: {
          name: v.channel.name,
          profileImageUrl: v.channel.profile_image_url,
        },
      }))

      this.setState({videos: updated, status: apiStatus.SUCCESS})
    } else {
      this.setState({status: apiStatus.FAILURE})
    }
  }

  renderVideos = () => {
    const {videos} = this.state

    return (
      <ul className='trending__list'>
        {videos.map(video => (
          <li key={video.id} className='trending__card'>
            <img
              src={video.thumbnailUrl}
              alt='thumbnail'
              className='trending__thumbnail'
            />

            <div className='trending__content'>
              <h3 className='trending__title'>{video.title}</h3>

              <p className='trending__channel'>{video.channel.name}</p>

              <p className='trending__meta'>
                {video.viewCount} views • {video.publishedAt}
              </p>
            </div>
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
          <div className='trending__error'>
            <h2>Failed to load Trending</h2>
            <button type='button' onClick={this.fetchTrending}>
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
              <main
                className={`trending ${isDarkMode ? 'trending--dark' : ''}`}
              >
                {/* HEADER */}
                <div className='trending__header'>
                  <FaFire className='trending__icon' />
                  <h1>Trending</h1>
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

export default Trending
