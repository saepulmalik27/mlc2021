import React from 'react'
import * as styles from './Hero.module.scss'
import Illu from 'components/molecules/Illu'
import Section from 'components/molecules/Section'
import location from 'src/images/icons/location.svg'

const Hero = (props) => {
    return (
        <Section className={styles.custome_section} {...props}>
        <div className={styles.hero}>
            <p>{props.user?.name.split(" ")[0] || ""} {props.user?.name.split(" ")[1] || ""}  </p>
            <Illu src={location}/>
            <p>{props.user?.region || ""}</p>
        </div>
        </Section>
    )
}

export default Hero;
