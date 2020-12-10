import React from 'react'
import { ReactComponent as Logo1 } from '../../Vector1.svg';
import { ReactComponent as Logo2 } from '../../Vector2.svg';
function Footer() {
    return (
       
      <footer>
      <Logo1 className="logo1" style = {logo1} />
      <Logo2 className="logo2" style={logo2}/>
    </footer>

    )
}
const logo1 = {
    position: "relative",
    width: "100vw"
  }
  
const logo2 = {
    position: "absolute",
    width: "100vw",
    left: "-21px",
    bottom: "4px"
  }
export default Footer;