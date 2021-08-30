import React from "react"
import Card from "components/templates/Card"
import Section from 'components/molecules/Section'
import EmbedVideo from "components/molecules/EmbedVideo"



const About = ({ title, description, align, section, video }) => {
  return ( 
    <Section id={section.name} {...section}>
       <Card title={title} description={description}  align={align} />
       <EmbedVideo url={`https://www.youtube.com/embed/${video}`} />

       
    </Section>
     
    
  )
}

export default About;
