import * as React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import Header from "components/templates/Header"
import Footer from "components/templates/Footer"
import 'src/scss/App.global.scss'
import Helpdesk from "components/molecules/Helpdesk"

const Layout = ({ children, navigation }) => {
  return (
    <>
      <Header navigation={navigation} />
      <div>
        <main>{children}</main>
      </div>
      <Helpdesk contact={"+628527334546"}/>
      <Footer creator={"Saepul Malik"} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
