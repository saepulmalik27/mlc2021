import React from "react"
import cx from 'classnames'

import Section from "components/molecules/Section"
import Illu from "components/molecules/Illu"
import Button from "components/atoms/Button"

import * as Typo from 'src/scss/modules/Typo.module.scss'
import * as styles from './content-illu.module.scss'
import { TITLE_STYLE } from "src/utils/helpers"
import Interweave from "interweave"
import Card from 'components/templates/Card'


const ContentIllu = ({ title, subtitle, cta, content, section, description }) => {

  const renderCTA = (cta) => {
    return cta.map((val, key) => {
      return <Button type="primary" size="small" key={key} cta={() => window.open(val.url, '_blank')} >{val.title}</Button>
    })
  }
  

  return (
    <Section id={section.name} {...section}>
      <div className={cx(Typo.text_center, styles.contentillu_title)}>
        <h1 className={cx(Typo.lh_150, TITLE_STYLE(title) )}>{title.content}</h1>
      </div>
      {subtitle ? <div className={cx(Typo.text_center, styles.contentillu_subtitle)}>
        <h4 className={cx(TITLE_STYLE(subtitle) )}>{subtitle.content}</h4>
      </div> : null}
      <div className={styles.contentillu_description}> 
      <Interweave content={description}/>

      </div>
      

      <div className={styles.contentillu_content}>
        {content.map((val, key) => {
          switch (val.type) {
            case "illu":
              return <a href={val?.url} target="_blank" key={key} ><Illu className={styles.contentillu_content_illu} src={val.content} /></a> 
              case "card":
                return <Card {...val.content} className={styles.contentillu_content_illu} key={key} />
            default:
              return <a href={val?.url} target="_blank" key={key} ><Illu className={styles.contentillu_content_illu} src={val.content} /></a> 
          }
        })}
      </div>
      {
        cta && cta.length > 0 ? <div className={styles.contentillu_cta}>
        {renderCTA(cta)}
      </div> : null
      }
      
    </Section>
  )
}

export default ContentIllu
