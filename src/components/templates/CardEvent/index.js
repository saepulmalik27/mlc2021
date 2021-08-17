import React from "react"
import Illu from "components/molecules/Illu"
import Interweave from "interweave"
import Button from "components/atoms/Button"
import * as styles from "./card-event.module.scss"
import cx from "classnames";

const CardEvent = ({ src, event, direction, cta }) => {

  let contentDirection = "";
  switch (direction) {
    case "column":
      contentDirection = styles.column;
      break;
      case "column-reverse":
        contentDirection = styles.column_reverse;
        break;
        case "row-reverse":
      contentDirection = styles.row_reverse;
      break;
    default:
      contentDirection = ""
      break;
  }

  const handleCta = (disabled, url) => {
    if (!disabled) {
      window.open(url)
    }
  }

  return (
    <div className={cx(styles.cardevent, contentDirection)}>
      <Illu src={src} className={styles.cardevent_illu} />
      <div className={styles.cardevent_event}>
        <div className={styles.cardevent_event__title}>
          <h6>{event.title}</h6>
        </div>
        <article className={styles.cardevent_event__description}>
          <Interweave content={event.content} />
        </article>
      </div>
      <div className={styles.cardevent_cta}>
        {
          cta.map((val, key) => ( <Button key={key} type={ val.disabled ? "secondary" : "primary"} size={"xsmall"} cta={() => handleCta(val.disabled, val.url)} >{val.title}</Button>))
        }
      </div>
    </div>
  )
}

export default CardEvent
