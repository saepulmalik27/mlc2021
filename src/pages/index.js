import React, {useState,useEffect} from "react"
import About from "src/sections/About"
import WithIllu from "src/sections/WithIllu"
import ContentIllu from "src/sections/ContentIllu"
import EventList from "src/sections/EventList"
import Layout from "src/hoc/layout"
import Seo from "src/hoc/seo"
import dataJson from "content/mandiri.json"
import {getFromLocalStorage} from 'src/utils/helpers'
import Faq from "src/sections/Faq"
import { navigate } from "gatsby"
import Hero from 'src/sections/Hero'
import Spinner from "components/atoms/Spinner"
import Modal from 'components/templates/Modal'


const IndexPage = () => {
  const [closeModal, setcloseModal] = useState(true)
  const [isLogin, setisLogin] = useState(false)
  const [user, setuser] = useState(null)
  const renderSections = (val, key) => {
    if (val.section) {
      switch (val.section.component) {
        case "WithIllu":
          return <WithIllu {...val} key={key} user={user} />
        case "ContentIllu":
          return <ContentIllu {...val} key={key}  />
        case "About":
          return <About {...val} key={key} />
        case "EventList":
          return <EventList {...val} key={key}/>
        case "Faq" : 
        return <Faq {...val} key={key} />
        default:
          return null
      }
    } else {
      return null
    }
  }

  useEffect(() => {
    getLoginData()
  }, [isLogin])

  const  getLoginData = () => {
    let isLogin = getFromLocalStorage();

    if (isLogin != null) {
      setisLogin(true)
      setuser(isLogin)
    }else{
      navigate("/login")
      setisLogin(false)
      setuser(null)

    }
  }

  switch (isLogin) {
    case true:
      return (
        <Layout navigation={dataJson.navigation}>
          <Seo title="Home" />
          <Hero user={user}/>
          {dataJson.sections.map((val, key) => {
            if (user && (val.section.name === 'kompetisi')) {
              val.content[0].content.cta[0].url = val.content[0].content.cta[0].url.replace(`{{nip}}`,user.nip)
              val.content[0].content.cta[0].url = val.content[0].content.cta[0].url.replace(`{{name}}`,user.name)
              val.content[0].content.cta[0].url = val.content[0].content.cta[0].url.replace(`{{email}}`,user.email)
              val.content[0].content.cta[0].url = val.content[0].content.cta[0].url.replace(`{{region}}`,user.region)
            }
            return renderSections(val, key)
          })}
        </Layout>
      )
    default:
      return <Modal style={{backgroundColor : "transparent", display : "flex", justifyContent : "center", alignItems : "center" }}>
        <Spinner size="300px" color="#29AAE3"/>
      </Modal>
  }
  
  
}


export default IndexPage
