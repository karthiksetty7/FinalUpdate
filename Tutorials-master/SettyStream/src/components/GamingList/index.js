import {Link} from 'react-router-dom'

import BackgroundContext from '../../BackgroundContext'

import './index.css'

const GamingList = props => (
  <BackgroundContext.Consumer>
    {value => {
      const {darkTheme} = value
      const {eachVideo} = props
      const {thumbnailUrl, title, viewCount, id} = eachVideo

      return (
        <li className='gaming-card'>
          <Link to={`/videos/${id}`} className='gaming-card__link'>
            {/* THUMBNAIL */}
            <img
              src={thumbnailUrl}
              alt='video thumbnail'
              className='gaming-card__thumbnail'
            />

            {/* CONTENT */}
            <div className='gaming-card__content'>
              <p
                className={`gaming-card__title ${
                  darkTheme ? 'text-light' : ''
                }`}
              >
                {title}
              </p>

              <p className='gaming-card__views'>
                {viewCount} Watching Worldwide
              </p>
            </div>
          </Link>
        </li>
      )
    }}
  </BackgroundContext.Consumer>
)

export default GamingList
