import React from "react"
import Card from "components/templates/Card"
import Section from 'components/molecules/Section'


const About = ({ title, description, align, section }) => {
  return ( 
    <Section id={section.name} {...section}>
       <Card title={title} description={description}  align={align} />
    </Section>
     
    
  )
}

export default About;
