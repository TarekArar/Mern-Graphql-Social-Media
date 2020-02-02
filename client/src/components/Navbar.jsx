import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../Context/auth'
 const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home')

  const { user , logout } = useContext(AuthContext)

  const handleItemClick = (e, { name }) => setActiveItem(name )

    if (user) {
      return (
        <Menu pointing secondary>
          <Menu.Item as={Link} to="/"
            name={user.username}
            active
          />
          <Menu.Menu position='right'>
            <Menu.Item onClick={() => {
              logout();
              window.location.replace('/login')
            }}
              name='logout'
            />

          </Menu.Menu>
          </Menu>

      )
    }
    else return (
      <div>
        <Menu pointing secondary>
          <Menu.Item as={Link} to="/"
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
        
          <Menu.Menu position='right'>
            <Menu.Item as={Link} to="/login"
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
            />
            <Menu.Item as={Link} to="/register"
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }

export default Navbar;