import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'

const links = [
  { path: '/', text: 'Home' },
  { path: 'about', text: 'About' },
  { path: 'profile', text: 'Profile' },
  { path: 'login', text: 'Login' },
]

const Navbar = () => {
  const [ navbarOpen, setNavbarOpen ] = useState(false)
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const ref = useRef()
  useEffect((event) => {
    const handler = (event) => {
      if (
        navbarOpen &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setNavbarOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
    }
  }, [navbarOpen])

  return (
    <>
      <nav className="navbar" ref={ ref }>
        <button className="toggle" onClick={ () => setNavbarOpen((prev) => !prev) }>
          { navbarOpen ? 'close' : 'open' }
        </button>
        <ul className={ `menu-nav${ navbarOpen ? ' show-menu' : '' }` }>
          { links.map((link) => {
            return (
              <React.Fragment key={ link.text }>
                { link.path === 'login' ? (
                 !user && (
                  <li>
                    <NavLink to={ link.path } onClick={ () => setNavbarOpen((prev) => !prev) }>{ link.text }</NavLink>
                  </li>
                 ) 
                ) : link.path === 'profile' ? (
                  user && (
                    <li>
                      <NavLink to={ link.path } onClick={ () => setNavbarOpen((prev) => !prev) }>{ link.text }</NavLink>
                    </li>
                  )
                ) : (
                  <li>
                    <NavLink to={ link.path } onClick={ () => setNavbarOpen((prev) => !prev) }>{ link.text }</NavLink>
                  </li>
                ) }
              </React.Fragment>
            )
          }) }
          { !user && (
            <li className='log-in'>
              <span>Log in to edit to-dos.</span>
            </li>
          ) }
        </ul>
      </nav>
      { user && (
        <div className="logout">
          <p>{ user }</p>
          { <button onClick={ handleLogout }>Logout</button> }
        </div>
      ) }
    </>
  )
}

export default Navbar
