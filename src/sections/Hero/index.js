import React from 'react'
import * as styles from './Hero.module.scss'
import Illu from 'components/molecules/Illu'
import Section from 'components/molecules/Section'
import location from 'src/images/icons/location.svg'

const Hero = (props) => {
    return (
        <Section className={styles.custome_section}>
        <div className={styles.hero}>
            <p>{props.user?.name || ""} </p>
            <Illu src={location}/>
            <p>{props.user?.region || ""}</p>
        </div>
        </Section>
    )
}

export default Hero;
