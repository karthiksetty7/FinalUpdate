import {AiFillLike} from 'react-icons/ai'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import VideosList from '../VideosList'
import BackgroundContext from '../../BackgroundContext'

import '../../CommonVideosPage.css'

const LikedVideos = () => (
  <BackgroundContext.Consumer>
    {({likedVideos, isDarkMode}) => (
      <>
        <Header />
        <div className='nav-sections-container'>
          <LeftNavBar />

          <main
            className={`common-page ${isDarkMode ? 'common-page--dark' : ''}`}
          >
            <div className='common-page__header'>
              <AiFillLike className='common-page__icon' />
              <h1>Liked Videos</h1>
            </div>

            {likedVideos.length === 0 ? (
              <div className='common-page__empty'>
                <h2>No liked videos</h2>
              </div>
            ) : (
              <ul className='common-page__grid'>
                {likedVideos.map(v => (
                  <VideosList key={v.id} eachVideo={v} />
                ))}
              </ul>
            )}
          </main>
        </div>
      </>
    )}
  </BackgroundContext.Consumer>
)

export default LikedVideos
