import React from "react"
import * as styles from "./modal.module.scss"
import Illu from 'components/molecules/Illu'
import close from "src/images/icons/closed.svg"
import cx from 'classnames'


const Modal = props => {
  const { hide, children, closed, style, size } = props

  let modal_size;
  switch (size) {
    case "large":
       modal_size = styles.large
  break
    default:
      modal_size = null
      break;
  }

  return hide ? null : (
    <div className={styles.modal} >
      <div className={styles.modal__backdrop} onClick={closed}></div>

      <div className={cx(styles.modal__wraper, modal_size)} style={style}>
      {closed ?<div className={styles.modal__close} onClick={closed}><Illu src={close}/></div>  : null }

        {children}
      </div>
    </div>
  )
}

export default Modal
