import React from "react"
import * as styles from "./section.module.scss"
import cx from "classnames"

const Section = props => {
  const { children, className, id } = props
  return (
    <section className={cx(styles.section)} id={id} style={props.style || {}}>
      {props.decoration && props.decoration.length > 0
        ? props.decoration.map((val, key) => {
            return (
              <div
                style={val.style}
                key={key}
              >
                <img
                  src={val.url}
                  alt="decoration"
                />
              </div>
            )
          })
        : null}
      <div className={cx(styles.section_container, className)}>{children}</div>
    </section>
  )
}

export default Section
