import {BsMoon, BsSun} from 'react-icons/bs'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import BackgroundContext from '../../BackgroundContext'

import logo from '../../SettyStream.png'

import './index.css'

const Header = props => (
  <BackgroundContext.Consumer>
    {value => {
      const {isDarkMode, toggleTheme} = value

      const onLogout = () => {
        Cookies.remove('jwt_token')
        props.history.replace('/login')
      }

      return (
        <nav className={`header ${isDarkMode ? 'header--dark' : ''}`}>
          {/* LOGO */}
          <Link to='/' className='header__logo-container'>
            <img src={logo} alt='website logo' className='header__logo' />
          </Link>

          {/* RIGHT SIDE */}
          <div className='header__actions'>
            {/* THEME BUTTON */}
            <button
              type='button'
              className='header__icon-btn'
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <BsSun size={22} color='#fff' />
              ) : (
                <BsMoon size={22} />
              )}
            </button>

            {/* PROFILE */}
            <img
              src='https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'
              alt='profile'
              className='header__profile'
            />

            {/* LOGOUT POPUP */}
            <Popup
              modal
              trigger={
                <button type='button' className='header__logout-btn'>
                  Logout
                </button>
              }
            >
              {close => (
                <div
                  className={`header__popup ${
                    isDarkMode ? 'header__popup--dark' : ''
                  }`}
                >
                  <p className='header__popup-text'>
                    Are you sure you want to logout?
                  </p>

                  <div className='header__popup-actions'>
                    <button
                      type='button'
                      className='btn btn--outline'
                      onClick={() => close()}
                    >
                      Cancel
                    </button>

                    <button
                      type='button'
                      className='btn btn--primary'
                      onClick={onLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      )
    }}
  </BackgroundContext.Consumer>
)

export default withRouter(Header)
