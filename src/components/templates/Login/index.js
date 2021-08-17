import React, { useState, useEffect } from "react"
import Input from "components/atoms/Input"
import Button from "components/atoms/Button"
import Illu from "components/molecules/Illu"
import * as styles from "./login.module.scss"
import * as Typo from "src/scss/modules/Typo.module.scss"
import userData from "content/user/mandiri.json"
import {saveToLocalStorage, getFromLocalStorage} from 'src/utils/helpers'
import iconemail from 'src/images/icons/email.svg'
import iconuser from 'src/images/icons/user.svg'
import iconlist from 'src/images/icons/userid.svg'
import iconwarning from 'src/images/icons/warning.svg'
import loginBanner from 'src/images/login_banner.png'
import PropTypes from 'prop-types'
import { navigate } from "gatsby"
import { fetchUser } from "src/utils/helpers"
import Modal from 'components/templates/Modal'
import Faq from 'src/sections/Faq'
import dataJson from "content/mandiri.json"




const Login = ({closed, banner}) => {
  const [isLogin, setisLogin] = useState(false)
  const [name, setName] = useState("")
  const [NPK, setNPK] = useState("")
  const [errorNpk, setErrorNpk] = useState("")
  const [email, setEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [success, setsuccess] = useState("")
  const [user, setuser] = useState(null)
  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    getLoginData()
  }, [isLogin])

  const  getLoginData = () => {
    let isLogin = getFromLocalStorage();

    if (isLogin != null) {
      setisLogin(true)
      navigate("/")
    }else{
      navigate("/login")
      setisLogin(false)
    }
  }

  const handleChange = (e, val) => {
    switch (val) {
      case "name":
        setName(e)
        break
      case "npk":
        setNPK(e)
        break
      case "email":
        setEmail(e)
        break
      default:
        break
    }
  }

  const login = async data => {
    // const user = userData.users.find(val =>  val.NPK.trim() === data)
    const user = await fetchUser({nip : data, email})
  
    if (user && email) {
      setuser(user)
      setName(user.name)
      setEmail(email)
      setErrorNpk("")
      setErrorEmail("")
      setsuccess("Update Email (Optional)")
      saveLogin(user)
    } else {
      setName("")
      setEmail("")
      if (!user) {
        setErrorNpk("NIP tidak terdaftar, silahkan hubungi Help Desk melalui button di kanan bawah.")        
      }
      if (!email) {
        setErrorEmail("Masukan Email Pribadi Anda")
      }
      setsuccess("")
    }
  }

  const saveLogin = data => {
    data.email = email;
    saveToLocalStorage(data)
    navigate("/")
  }

  const renderFaq = () => {
     const faq = dataJson.sections.find(val => val.section.name === 'faq')
     faq.section.className = styles.padding_0

     return <Faq {...faq}/>
  }

  return (
    <div className={styles.login}>
      <Modal hide={!modalActive} size="large" closed={() => setModalActive(false)}>
        {renderFaq()}
      </Modal>
      {banner ?<Illu
        src={
          loginBanner
        }
        className={styles.login_illu}
      /> : null }
      
      <div className={styles.login_body}>
        <div className={styles.login_body__title}>
          <h4 className={Typo.lh_170}>Login</h4>
          <p>Masukan NIP yang terdaftar dan email pribadi Anda.</p>
        </div>
        <div className={styles.login_body__form}>
       
          <Input
            label="NIP"
            icon={
              iconlist
            }
            value={NPK}
            onChange={e => handleChange(e, "npk")}
            disabled={success ? true : false}
          />
          {errorNpk ? <p className={styles.label_error}> <img src={iconwarning} alt="" /> {errorNpk}</p> : null}
          <br />
          <Input
            label="Email"
            icon={iconemail}
            value={email}
            onChange={e => handleChange(e, "email")}
          />
          {errorEmail ? <p className={styles.label_error}> <img src={iconwarning} alt="" /> {errorEmail}</p> : null}
         
        </div>
        
        <Button
          size={"large"}
          type={"secondary"}
          cta={() => {
            login(NPK)
          }}
        >
          Masuk
        </Button>

        <p  className={styles.label_info}>
        Apabila Anda memiliki Pertanyaan, silahkan klik tombol <span  style={{cursor : 'pointer'}} onClick={() => setModalActive(!modalActive)}><strong> Disini. </strong></span> 
        </p>
        
      </div>
    </div>
  )
}

Login.defaultProps = {
  banner  : true
}

Login.propTypes = {
  banner : PropTypes.bool,
}

export default Login
