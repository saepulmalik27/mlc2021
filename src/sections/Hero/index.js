import React from "react"
import * as styles from "./Hero.module.scss"
import Illu from "components/molecules/Illu"
import Section from "components/molecules/Section"
import location from "src/images/icons/location.svg"
import Button from "components/atoms/Button"
import { removeLocalStorage } from "src/utils/helpers"

const Hero = props => {
  return (
    <Section className={styles.custome_section} {...props}>
      <div className={styles.hero}>
        <div className={styles.item_start}>
          <p>
            Hi, {props.user?.name.split(" ")[0] || ""}{" "}
            {props.user?.name.split(" ")[1] || ""}{" "}
          </p>
          <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          <Illu src={location} />
          <p>{props.user?.region || ""}</p>
          </div>
          
        </div>
        <p style={{color : "#173A70", cursor : "pointer"}} onClick={() => removeLocalStorage()}>Keluar</p>
      </div>
    </Section>
  )
}

export default Hero
