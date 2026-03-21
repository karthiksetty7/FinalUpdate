import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import BackgroundContext from '../../BackgroundContext'

import './index.css'

const VideosList = props => (
  <BackgroundContext.Consumer>
    {({isDarkMode}) => {
      const {eachVideo} = props

      const {id, title, thumbnailUrl, viewCount, publishedAt, channel} =
        eachVideo

      const {name, profileImageUrl} = channel

      return (
        <li className='video-card'>
          <Link to={`/videos/${id}`} className='video-card__link'>
            {/* THUMBNAIL */}
            <img
              src={thumbnailUrl}
              alt='video thumbnail'
              className='video-card__thumbnail'
            />

            {/* CONTENT */}
            <div className='video-card__content'>
              <img
                src={profileImageUrl}
                alt='channel logo'
                className='video-card__channel-img'
              />

              <div className='video-card__info'>
                <h3
                  className={`video-card__title ${
                    isDarkMode ? 'dark-text' : ''
                  }`}
                >
                  {title}
                </h3>

                <p className='video-card__channel-name'>{name}</p>

                <p className='video-card__meta'>
                  {viewCount} views •{' '}
                  {formatDistanceToNow(new Date(publishedAt))}
                </p>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </BackgroundContext.Consumer>
)

export default VideosList
