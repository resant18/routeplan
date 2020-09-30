import React from "react";
import renataAvatar from "../../assets/profile/renata.png";
import timAvatar from "../../assets/profile/tim.png";
import lanceAvatar from "../../assets/profile/lance.png";
import alfredoAvatar from "../../assets/profile/alfredo.png"

const Footer = (props) => (
   <footer>
      <div className={`content ${props.isMainPage ? "large" : "small"}`}>
         <span>Copyright</span>
         <a href='https://github.com/alfredosumosav' data-tooltip='Alfredo Sumosa' className='tooltip'>
            <img className='avatar' src={alfredoAvatar} alt='Alfredo' />
         </a>
         <a href='https://github.com/LanceSanity' data-tooltip='Lance Wong' className='tooltip'>
            <img className='avatar' src={lanceAvatar} alt='Lance' />
         </a>
         <a href='https://github.com/resant18' target='_blank' data-tooltip='Renata Santoso' className='tooltip'>
            <img className='avatar' src={renataAvatar} alt='Renata' />
         </a>
         <a href='https://github.com/timscatterday' target='_blank' data-tooltip='Tim Scatterday' className='tooltip'>
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

