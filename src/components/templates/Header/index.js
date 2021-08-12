import React, { useState, useCallback} from "react"

import Logo from "components/atoms/Logo"
import Navbar from "components/templates/Navbar"
import permata_logo from "src/images/logo/logo_mlc.svg"
import * as styles from "./header.module.scss"
import Humberger from "components/atoms/Humberger"
// import { disableScroll } from "src/utils/helpers";
import cx from 'classnames'

const Header = ({navigation}) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const handleClick = e => {
    e.preventDefault()
    setShowSidebar(!showSidebar)
    // setTimeout(() => {
    //   showSidebar === false ? disableScroll.on() : disableScroll.off()
    // }, 500)
  }


  const handleShow = useCallback(
    () => {
      setShowSidebar(false)
    },[showSidebar]
  )
  

  let headerDirection = "";
  if (showSidebar) {
    headerDirection = styles.column
  } 
  return (
    <header className={cx(styles.header, headerDirection)}>
      <div  >
        <Logo src={permata_logo} alt={"permata_logo"} />
      </div>
      <div className={styles.navbar}>
        <Navbar hide={false} cta={false} navigation={navigation} />
      </div>
      <div className={styles.sidebar}>
        <Humberger
          hide={false}
          open={showSidebar}
          toggleNav={e => handleClick(e)}
        />
        <Navbar hide={!showSidebar} direction={"column"} cta={false} navigation={navigation} handleClick={handleShow}/>
      </div>
    </header>
  )
}

export default Header
