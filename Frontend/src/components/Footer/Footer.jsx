import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" className="src" />
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <div className="social-media-icons">
                    <img src={assets.facebook_icon} alt="" className="src" />
                    <img src={assets.twitter_icon} alt="" className="src" />
                    <img src={assets.linkedin_icon} alt="" className="sr" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-8971872487</li>
                    <li>vanikalghatkar@gmail.com</li>
                </ul>
            </div>
           
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 Tomato.com - All Rights Reserved.</p>
      
    </div>
  )
}

export default Footer
