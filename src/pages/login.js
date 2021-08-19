import React from "react"
import Login from "components/templates/Login"
import Section from "components/molecules/Section"
import Card from "components/templates/Card"
import * as styles from "src/scss/pages/login.module.scss"
import Seo from "src/hoc/seo"
import Helpdesk from 'components/molecules/Helpdesk'



const login = () => {
  return (
    <>
      <Seo title="Login" />
      <main className={styles.login}>
        <Section className={styles.login_container}>
          <Card
            title={{
              type: "text",
              content: "MANDIRI LEARNING CARNIVAL",
              style: "white",
            }}
            align={"center"}
            description={
              "<p style='color : white'>Mandiri Learning Carnival merupakan rangkaian pembelajaran bagi  #MandirianPembelajarTangguh di seluruh kantor regional dan kantor pusat yang meliputi sesi kelas pembelajaran dan talkshow dari beberapa pembicara dengan kemasan digital/virtual yang inspiratif dan kreatif.</p>"
            }
            illu={{
              src:
                "https://ik.imagekit.io/saepulmalik/mlc21/login_banner_LAEy2h_FyAq_.png?updatedAt=1629104927088",
            }}
          />
          <div className={styles.login_form}>
            <Login banner={false} />
          </div>
      <Helpdesk contact={"+6281383896010"}/>

          
        </Section>
      </main>
    </>
  )
}

export default login
