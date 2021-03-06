import React from "react"
// import Link from "gatsby-link"
import * as styles from "./list.module.scss"
import scrollTo from 'gatsby-plugin-smoothscroll';
import cx from "classnames";
import PropTypes from 'prop-types'

const List = ({ direction, navigation, handleClick }) => {
  let contentDirection = ""
  switch (direction) {
    case "column":
      contentDirection = styles.column
      break
    default:
      contentDirection = null
      break
  }

  const onClickHandle = (id) => {
    scrollTo(`#${id}`)
    if (handleClick) {
      handleClick()
    }
    
  }
  return (
    <ul className={cx(styles.list, contentDirection)}>
      {navigation.map((val, key) => (
        <li key={key} onClick={() => onClickHandle(val.id) }>
          {val.title}
        </li>
      ))}
    </ul>
  )
}

List.defaultProps = {
  navigation : []
}

List.propTypes = {
  navigation : PropTypes.array
}

export default List
