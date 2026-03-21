import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import BackgroundContext from '../../BackgroundContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        viewCount: data.video_details.view_count,
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
      }

      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className='loader-container'>
      <Loader type='ThreeDots' color='#2563eb' height='50' width='50' />
    </div>
  )

  renderFailure = () => (
    <div className='video-page__error'>
      <h2>Something went wrong</h2>
      <button type='button' onClick={this.getVideoDetails}>
        Retry
      </button>
    </div>
  )

  renderVideo = value => {
    const {videoDetails} = this.state
    const {toggleSaveVideo, savedVideos} = value

    const isSaved = savedVideos.find(v => v.id === videoDetails.id)

    return (
      <div className='video-page__container'>
        <div className='video-page__content'>
          <ReactPlayer url={videoDetails.videoUrl} controls width='100%' />

          <h2 className='video-page__title'>{videoDetails.title}</h2>

          <div className='video-page__actions'>
            <p>{videoDetails.viewCount} views</p>

            <div className='video-page__buttons'>
              <button type='button' className='video-btn'>
                <BiLike /> Like
              </button>

              <button type='button' className='video-btn'>
                <BiDislike /> Dislike
              </button>

              <button
                type='button'
                className={`video-btn ${isSaved ? 'active' : ''}`}
                onClick={() => toggleSaveVideo(videoDetails)}
              >
                <BiListPlus />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <hr />

          <div className='video-page__channel'>
            <img
              src={videoDetails.channel.profileImageUrl}
              alt='channel'
              className='video-page__channel-img'
            />

            <div>
              <p className='video-page__channel-name'>
                {videoDetails.channel.name}
              </p>
              <p className='video-page__subs'>
                {videoDetails.channel.subscriberCount} subscribers
              </p>
            </div>
          </div>

          <p className='video-page__description'>{videoDetails.description}</p>
        </div>
      </div>
    )
  }

  renderVideoDetails = value => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderVideo(value)
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <BackgroundContext.Consumer>
        {value => {
          const {isDarkMode} = value

          return (
            <div className='app-container'>
              <Header />
              <div className='nav-sections-container'>
                <LeftNavBar />
                <div
                  className={`video-page ${
                    isDarkMode ? 'video-page--dark' : ''
                  }`}
                >
                  {this.renderVideoDetails(value)}
                </div>
              </div>
            </div>
          )
        }}
      </BackgroundContext.Consumer>
    )
  }
}

export default VideoItemDetails
