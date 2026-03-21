import {MdHistory} from 'react-icons/md'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import VideosList from '../VideosList'
import BackgroundContext from '../../BackgroundContext'
import '../../CommonVideosPage.css'

const History = () => (
  <BackgroundContext.Consumer>
    {({historyVideos, isDarkMode}) => (
      <>
        <Header />
        <div className='nav-sections-container'>
          <LeftNavBar />

          <main
            className={`common-page ${isDarkMode ? 'common-page--dark' : ''}`}
          >
            <div className='common-page__header'>
              <MdHistory className='common-page__icon' />
              <h1>History</h1>
            </div>

            {historyVideos.length === 0 ? (
              <div className='common-page__empty'>
                <h2>No history available</h2>
              </div>
            ) : (
              <ul className='common-page__grid'>
                {historyVideos.map(v => (
                  <VideosList key={v.video.id} eachVideo={v.video} />
                ))}
              </ul>
            )}
          </main>
        </div>
      </>
    )}
  </BackgroundContext.Consumer>
)

export default History
