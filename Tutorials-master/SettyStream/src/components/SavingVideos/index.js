import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import VideosList from '../VideosList'
import BackgroundContext from '../../BackgroundContext'

import '../../CommonVideosPage.css'

const SavingVideos = () => (
  <BackgroundContext.Consumer>
    {({savedVideos, isDarkMode}) => (
      <>
        <Header />
        <div className='nav-sections-container'>
          <LeftNavBar />

          <main
            className={`common-page ${isDarkMode ? 'common-page--dark' : ''}`}
          >
            <div className='common-page__header'>
              <BiListPlus className='common-page__icon' />
              <h1>Saved Videos</h1>
            </div>

            {savedVideos.length === 0 ? (
              <div className='common-page__empty'>
                <h2>No saved videos</h2>
                <p>Save videos to watch later</p>
              </div>
            ) : (
              <ul className='common-page__grid'>
                {savedVideos.map(v => (
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

export default SavingVideos
