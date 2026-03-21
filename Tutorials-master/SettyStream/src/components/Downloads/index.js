import {AiOutlineDownload} from 'react-icons/ai'
import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import BackgroundContext from '../../BackgroundContext'
import '../../CommonVideosPage.css'

const Downloads = () => (
  <BackgroundContext.Consumer>
    {({isDarkMode}) => (
      <>
        <Header />
        <div className='nav-sections-container'>
          <LeftNavBar />

          <main
            className={`common-page ${isDarkMode ? 'common-page--dark' : ''}`}
          >
            <div className='common-page__header'>
              <AiOutlineDownload className='common-page__icon' />
              <h1>Downloads</h1>
            </div>

            <div className='common-page__empty'>
              <h2>No Downloads Yet</h2>
              <p>Download videos to watch offline</p>
            </div>
          </main>
        </div>
      </>
    )}
  </BackgroundContext.Consumer>
)

export default Downloads
