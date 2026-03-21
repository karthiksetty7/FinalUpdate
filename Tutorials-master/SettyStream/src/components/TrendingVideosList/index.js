import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import BackgroundContext from '../../BackgroundContext'

import './index.css'

const TrendingVideosList = props => (
  <BackgroundContext.Consumer>
    {value => {
      const {darkTheme} = value
      const {eachVideo} = props
      const {channel, publishedAt, thumbnailUrl, title, viewCount, id} =
        eachVideo
      const {name, profileImageUrl} = channel

      return (
        <Link to={`/videos/${id}`} className='nav-link'>
          <li className='trending-each-video-card'>
            <img
              src={thumbnailUrl}
              alt='video thumbnail'
              className='trending-thumbnail-img'
            />
            <div className='trending-video-profile-container'>
              {!darkTheme && (
                <img
                  src={profileImageUrl}
                  alt='channel logo'
                  className='trending-profile-img'
                />
              )}
              <div
                className={
                  darkTheme
                    ? 'dark-trending-video-info-container'
                    : 'trending-video-info-container'
                }
              >
                <p className='trending-video-title'>{title}</p>
                <p className='trending-video-name'>{name}</p>
                <p className='trending-video-views'>
                  {viewCount} Views •{' '}
                  {formatDistanceToNow(new Date(publishedAt))}
                </p>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </BackgroundContext.Consumer>
)

export default TrendingVideosList
