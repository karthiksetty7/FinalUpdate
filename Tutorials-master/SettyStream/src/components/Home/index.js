import {Component} from 'react'
import {MdClose, MdSearch} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import LeftNavBar from '../LeftNavBar'
import VideosList from '../VideosList'
import BackgroundContext from '../../BackgroundContext'

import logo from '../../SettyStream.png'

import './index.css'

const apiStatus = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class Home extends Component {
  state = {
    showBanner: true,
    videos: [],
    searchInput: '',
    activeSearch: '',
    status: apiStatus.INITIAL,
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    this.setState({status: apiStatus.LOADING})

    const {activeSearch} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${activeSearch}`,
      {
        headers: {Authorization: `Bearer ${jwtToken}`},
      },
    )

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

  onSearch = () => {
    this.setState(prev => ({activeSearch: prev.searchInput}), this.fetchVideos)
  }

  renderVideos = () => {
    const {videos} = this.state

    if (videos.length === 0) {
      return (
        <div className='home__empty'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png'
            alt='no videos'
          />
          <h2>No results found</h2>
          <p>Try different keywords</p>
          <button type='button' onClick={this.fetchVideos}>
            Retry
          </button>
        </div>
      )
    }

    return (
      <ul className='home__videos-grid'>
        {videos.map(video => (
          <VideosList key={video.id} eachVideo={video} />
        ))}
      </ul>
    )
  }

  renderContent = isDarkMode => {
    const {status, showBanner, searchInput} = this.state

    switch (status) {
      case apiStatus.LOADING:
        return (
          <div className='loader-container'>
            <Loader type='ThreeDots' color='#888' />
          </div>
        )

      case apiStatus.FAILURE:
        return (
          <div className='home__error'>
            <h2>Something went wrong</h2>
            <button type='button' onClick={this.fetchVideos}>
              Retry
            </button>
          </div>
        )

      case apiStatus.SUCCESS:
        return (
          <>
            {/* BANNER */}
            {showBanner && (
              <div className='home__banner'>
                <button
                  type='button'
                  className='home__banner-close'
                  onClick={() => this.setState({showBanner: false})}
                >
                  <MdClose />
                </button>

                <img src={logo} alt='logo' className='home__banner-logo' />

                <p className={isDarkMode && 'home__banner-text'}>
                  Buy Premium Plans with UPI
                </p>

                <button type='button' className='home__banner-btn'>
                  GET IT NOW
                </button>
              </div>
            )}

            {/* SEARCH */}
            <div className='home__search'>
              <input
                type='search'
                placeholder='Search'
                value={searchInput}
                onChange={e => this.setState({searchInput: e.target.value})}
              />

              <button type='button' onClick={this.onSearch}>
                <MdSearch />
              </button>
            </div>

            {/* VIDEOS */}
            {this.renderVideos()}
          </>
        )

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
              <main className={`home ${isDarkMode ? 'home--dark' : ''}`}>
                {this.renderContent(isDarkMode)}
              </main>
            </div>
          </>
        )}
      </BackgroundContext.Consumer>
    )
  }
}

export default Home
