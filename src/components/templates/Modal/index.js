import React from "react"
import * as styles from "./modal.module.scss"
import Illu from 'components/molecules/Illu'
import close from "src/images/icons/closed.svg"


const Modal = props => {
  const { hide, children, closed, style } = props
  return hide ? null : (
    <div className={styles.modal} >
      <div className={styles.modal__backdrop}></div>
      <div className={styles.modal__wraper} style={style}>
        {closed ?<div className={styles.modal__close} onClick={closed}><Illu src={close}/></div>  : null }
        {children}
      </div>
    </div>
  )
}

export default Modal
