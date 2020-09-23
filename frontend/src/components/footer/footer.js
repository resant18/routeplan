import React from "react";
import renataAvatar from "../../assets/profile/renata.png";
import timAvatar from "../../assets/profile/tim.png";
import lanceAvatar from "../../assets/profile/lance.png";
import alfredoAvatar from "../../assets/profile/alfredo.png"


const Footer = (props) => (
   <footer>
      <div>
         <span>Copyright</span>
         <a href=''>
            <img className='avatar' src={alfredoAvatar} alt='Alfredo' />
         </a>
         <a href=''>
            <img className='avatar' src={lanceAvatar} alt='Lance' />
         </a>
         <a href='https://github.com/resant18' target='_blank'>
            <img className='avatar' src={renataAvatar} alt='Renata' />
         </a>
         <a href=''>
            <img className='avatar' src={timAvatar} alt='Tim' />
         </a>
         <span>Image Credit</span>
      </div>
   </footer>
);

Footer.defaultProps = {
   isMainPage: true
}

export default Footer;

