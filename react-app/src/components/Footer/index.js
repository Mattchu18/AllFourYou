import React from 'react';
// import { Link } from 'react-router-dom';
import "./index.css"

const Footer = ({ isLoaded }) => {


    return (


        <div className='footer-container'>

            <div className='footer-banner'>
                <span>
                    Check out our socials below!
                </span>

            </div>

            <div className='footer-icon-link-container'>
                <div className='footer-icons'>
                    <span>Kevin Baluyot</span>
                    <div className="footer-links">

                        <li><a href="https://github.com/Baluyotkevin"><i class="fa-brands fa-github"></i><span class="label"> GitHub</span></a></li>
                        <li><a href="https://www.linkedin.com/in/kevin-baluyot-2102b5bb/"><i class="fa-brands fa-linkedin"></i><span class="label"> Linkedin</span></a></li>
                    </div>

                </div>
                <div className='footer-icons'>
                    <span>Matthew Aung</span>
                    <div className="footer-links">

                        <li><a href="https://github.com/Mattchu18"><i class="fa-brands fa-github"></i><span class="label"> GitHub</span></a></li>
                        <li><a href="https://www.linkedin.com/in/matt-aung/"><i class="fa-brands fa-linkedin"></i><span class="label"> Linkedin</span></a></li>
                    </div>

                </div>
                <div className='footer-icons'>
                    <span>Tony He</span>
                    <div className="footer-links">

                        <li><a href="https://github.com/tohknee"><i class="fa-brands fa-github"></i><span class="label"> GitHub</span></a></li>
                        <li><a href="https://www.linkedin.com/in/tonyhedev/"><i class="fa-brands fa-linkedin"></i><span class="label"> Linkedin</span></a></li>
                    </div>

                </div>
                <div className='footer-icons'>

                    <span>Vanessa Gonzalez</span>

                    <div className="footer-links">

                        <li><a href="https://github.com/vxg026"><i class="fa-brands fa-github"></i><span class="label"> GitHub</span></a></li>
                        <li><a href="https://www.linkedin.com/in/vanessa-gonzalez-82667a1b3/"><i class="fa-brands fa-linkedin"></i><span class="label"> Linkedin</span></a></li>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Footer
