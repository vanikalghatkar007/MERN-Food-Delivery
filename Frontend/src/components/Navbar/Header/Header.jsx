import React, { useContext } from 'react'
import './Header.css'

const Header = () => {


  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes, each crafted to delight your taste buds. Whether you're craving something savory or sweet, our selection offers a perfect blend of flavors to satisfy every palate.</p>
        <button><a href='#explore-menu'>View Menu</a></button>
      </div>
    </div>
  )
}

export default Header
