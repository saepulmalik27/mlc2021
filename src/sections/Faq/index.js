import React, {useState} from 'react'
import Accordion from 'components/molecules/Accordion'
import Section from 'components/molecules/Section'
import * as styles from "./faq.module.scss";
import { TITLE_STYLE } from 'src/utils/helpers';


const Faq = ({section, questions, title}) => {
    const [activeQuestionIndex, setactiveQuestionIndex] = useState(-1)
    return (
        <Section id={section?.name} {...section}>
            <div className={styles.faq_title}>
            <h1 className={TITLE_STYLE(title)}>{title.content}</h1>
            </div>
            <div className={styles.faq_content}>
                {questions.map((question,key) => {
                   return <Accordion index={key} key={key} activeQuestionIndex={activeQuestionIndex} object={question} clicked={() => ( setactiveQuestionIndex( activeQuestionIndex === key ? -1 : key) )}  />
                })}
            </div>
            
        </Section>
    )
}

export default Faq;
