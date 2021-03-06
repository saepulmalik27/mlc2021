import React, { useState, useEffect } from "react"
import Input from "components/atoms/Input"
import Button from "components/atoms/Button"
import Illu from "components/molecules/Illu"
import * as styles from "./login.module.scss"
import * as Typo from "src/scss/modules/Typo.module.scss"
import { saveToLocalStorage, getFromLocalStorage } from "src/utils/helpers"
import iconemail from "src/images/icons/email.svg"
import iconlist from "src/images/icons/userid.svg"
import iconwarning from "src/images/icons/warning.svg"
import loginBanner from "src/images/login_banner.png"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { fetchUser } from "src/utils/helpers"
import Modal from "components/templates/Modal"
import Faq from "src/sections/Faq"
import dataJson from "content/mandiri.json"
import Spinner from "components/atoms/Spinner"
import { isValidNIPMandiri, validateEmail } from "src/utils/validation"





const Login = ({ closed, banner }) => {
  const [isLogin, setisLogin] = useState(false)
  const [name, setName] = useState("")
  const [NPK, setNPK] = useState("")
  const [errorNpk, setErrorNpk] = useState("")
  const [email, setEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [success, setsuccess] = useState("")
  const [user, setuser] = useState(null)
  const [modalActive, setModalActive] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getLoginData()
  }, [isLogin])

  const getLoginData = () => {
    let isLogin = getFromLocalStorage()

    if (isLogin != null) {
      setisLogin(true)
      navigate("/")
    } else {
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

  const inputValidation = (npk) => {
    if (npk === '' && email === ''){
      setErrorNpk("NIP tidak boleh kosong")
      setErrorEmail("Masukan alamat email pribadi Anda")
      setsuccess('')
    }else if (npk === ''){
      setErrorEmail('')
      setErrorNpk("NIP tidak boleh kosong")
      setsuccess('')
    }else if (email === ''){
      setErrorNpk('')
      setErrorEmail("Masukan alamat email pribadi Anda")
      setsuccess('')
    }
    else if (isValidNIPMandiri(npk) && validateEmail(email)) {
      setErrorNpk("")
      setErrorEmail("")
      login(npk)
    }else if(!isValidNIPMandiri(npk)){
      setsuccess('')
      setErrorEmail("")
      setErrorNpk("NIP tidak valid")
    } else if(!validateEmail(email)){
      setsuccess('')
      setErrorEmail("Email tidak valid")
      setErrorNpk("")
    }
     else{
      setsuccess('')
      setErrorEmail("Email tidak valid")
      setErrorNpk("NIP tidak valid")
    }
  }

  const login = async data => {
    // const user = userData.users.find(val =>  val.NPK.trim() === data)
    setLoading(true)
    const user = await fetchUser({ nip: data, email })

    if (user && email) {
      setuser(user)
      setName(user.name)
      setEmail(email)
      setErrorNpk("")
      setErrorEmail("")
      setsuccess("Update Email (Optional)")
      saveLogin(user)
      setLoading(false)
    } else {
      setName("")
      setEmail("")
      if (!user) {
        setErrorNpk(
          "NIP tidak terdaftar, silakan hubungi kami melalui tombol di kanan bawah"
        )
      }
      if (!email) {
        setErrorEmail("Masukan alamat email pribadi Anda")
      }
      setsuccess("")
      setLoading(false)
    }
  }

  const saveLogin = data => {
    data.email = email
    saveToLocalStorage(data)
    navigate("/")
  }

  const renderFaq = () => {
    const faq = dataJson.sections.find(val => val.section.name === "faq")

    return <Faq {...faq} />
  }

 
      return (
        <div className={styles.login}>
          <Modal
            hide={!modalActive}
            size="large"
            closed={() => setModalActive(false)}
          >
            {renderFaq()}
          </Modal>
          {loading ? <Modal style={{backgroundColor : "transparent", display : "flex", justifyContent : "center", alignItems : "center" }}>
        <Spinner size="80px" color="#29AAE3"/>
      </Modal> : null}
          {banner ? <Illu src={loginBanner} className={styles.login_illu} /> : null}
    
          <div className={styles.login_body}>
            <div className={styles.login_body__title}>
              <h4 className={Typo.lh_170}>Masuk</h4>
              <p>Masukkan NIP yang terdaftar dan email pribadi Anda.</p>
            </div>
            <div className={styles.login_body__form}>
              <Input
                label="NIP"
                icon={iconlist}
                value={NPK}
                onChange={e => handleChange(e, "npk")}
                disabled={success ? true : false}
              />
              {errorNpk ? (
                <p className={styles.label_error}>
                  {" "}
                  <img src={iconwarning} alt="" /> {errorNpk}
                </p>
              ) : null}
              <br />
              <Input
                label="Email"
                icon={iconemail}
                value={email}
                onChange={e => handleChange(e, "email")}
              />
              {errorEmail ? (
                <p className={styles.label_error}>
                  {" "}
                  <img src={iconwarning} alt="" /> {errorEmail}
                </p>
              ) : null}
            </div>
           
    
            <Button
              size={"large"}
              type={ loading ? "primary" :"secondary"}
              cta={() => {
                inputValidation(NPK)
              }}
            >
              Masuk
            </Button>
    
            <p className={styles.label_info}>
            Ada kendala? Cek jawaban dari pertanyaan yang sering diajukan 
              <span
              className={Typo.primary}
                style={{ cursor: "pointer" }}
                onClick={() => setModalActive(!modalActive)}
              >
                <strong> di sini. </strong>
              </span>
            </p>
          </div>
        </div>
      )
  

 
}

Login.defaultProps = {
  banner: true,
}

Login.propTypes = {
  banner: PropTypes.bool,
}

export default Login
