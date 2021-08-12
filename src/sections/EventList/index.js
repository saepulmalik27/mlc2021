import React from "react"
import Section from "components/molecules/Section"
import Tabs from "components/templates/Tabs"
import CardEvent from "components/templates/CardEvent"
import Card from "components/templates/Card"
import Carousel from "components/molecules/Carousel"
import * as styles from './event-list.module.scss'

const EventList = ({ title, description,  contents, section }) => {
  const tabComponent = data => (
    <Tabs initialTab={data?.initialTab}>
      {data.tabs.map((tab, key) => (
        <div label={tab.label} key={key}>
          {tab.tab_content.map((content, id) => (
            <CardEvent key={id} {...content} />
          ))}
        </div>
      ))}
    </Tabs>
  )

  const listComponent = data =>
    data.map((list, key) => {
      return (
        <Carousel title={list.title} key={key}>
          {list.list_content.map((content, id) => {
            return <CardEvent {...content} direction={"column"} key={id} />
          })}
        </Carousel>
      )
    })

  const agendaComponent = data => (
    <div className={styles.agendas}>
      {data.map((agenda, key) => {
        return <div key={key} className={styles.agendas_detail}>
          <p><strong>{agenda.title}</strong></p>
          <p>{agenda.schedule}</p>
        </div>
      })}
    </div>
  )

  const renderContentType = (type, data) => {
    switch (type) {
      case "tabs":
        return tabComponent(data)
      case "list":
        return listComponent(data)
      case "agenda":
        return agendaComponent(data)
      default:
        return null
    }
  }
  return (
    <Section id={section.name} {...section}>
      <Card title={title} description={description} />
      <br />
      <br />
      {renderContentType(contents)}
    </Section>
  )
}
export default EventList
