import React from 'react';
import * as styles from './section.module.scss'
import cx from 'classnames';


const Section = (props) => {
    const {children, className, id} = props;
    return <section className={cx(styles.section, className)} id={id} style={{background : props.background || null }}>{children}</section>
}

export default Section;