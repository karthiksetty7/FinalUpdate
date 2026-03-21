import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

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

class SpecificVideo extends Component {
  state = {
    videoDetails: null,
    status: apiStatus.INITIAL,
  }

  componentDidMount() {
    this.fetchVideo()
  }

  fetchVideo = async () => {
    this.setState({status: apiStatus.LOADING})

    const {match} = this.props
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(
      `https://apis.ccbp.in/videos/${match.params.id}`,
      {
        headers: {Authorization: `Bearer ${jwtToken}`},
      },
    )

    if (response.ok) {
      const data = await response.json()
      const v = data.video_details

      const updated = {
        id: v.id,
        title: v.title,
        videoUrl: v.video_url,
        viewCount: v.view_count,
        publishedAt: v.published_at,
        description: v.description,
        channel: {
          name: v.channel.name,
          profileImageUrl: v.channel.profile_image_url,
          subscriberCount: v.channel.subscriber_count,
        },
      }

      this.setState({
        videoDetails: updated,
        status: apiStatus.SUCCESS,
      })
    } else {
      this.setState({status: apiStatus.FAILURE})
    }
  }

  renderVideo = value => {
    const {videoDetails} = this.state
    const {toggleSaveVideo, savedVideos} = value

    const isSaved = savedVideos.find(v => v.id === videoDetails.id)

    return (
      <div className='video-page__container'>
        {/* VIDEO PLAYER */}
        <ReactPlayer url={videoDetails.videoUrl} controls width='100%' />

        {/* TITLE */}
        <h2 className='video-page__title'>{videoDetails.title}</h2>

        {/* ACTIONS */}
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
              <BiListPlus /> {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <hr />

        {/* CHANNEL */}
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

        {/* DESCRIPTION */}
        <p className='video-page__description'>{videoDetails.description}</p>
      </div>
    )
  }

  renderContent = value => {
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
          <div className='video-page__error'>
            <h2>Failed to load video</h2>
            <button type='button' onClick={this.fetchVideo}>
              Retry
            </button>
          </div>
        )

      case apiStatus.SUCCESS:
        return this.renderVideo(value)

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
            <>
              <Header />
              <div className='nav-sections-container'>
                <LeftNavBar />

                {/* MAIN */}
                <main
                  className={`video-page ${
                    isDarkMode ? 'video-page--dark' : ''
                  }`}
                >
                  {this.renderContent(value)}
                </main>
              </div>
            </>
          )
        }}
      </BackgroundContext.Consumer>
    )
  }
}

export default SpecificVideo
