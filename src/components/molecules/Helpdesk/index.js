import React, { Component } from 'react'
import * as styles from "./helpdesk.module.scss"
import helpdesk from 'src/images/icons/helpdesk.svg'
import Illu from 'components/molecules/Illu'


class Helpdesk extends Component {

    sentMessage(contact, url){
        if (url) window.open(url) 
        else window.open(`https://wa.me/${contact}?text=Hallo%20saya%20ada%20kesulitan%20ketika%20membuka%20website%20MLC%20nih`)
    }

    render() {
        
            return (
                <div className={styles.helpdesk} onClick={() => (this.sentMessage(this.props.contact, this.props.url))}>
                    <img src={helpdesk} alt="" />
                </div>
            )
      
        
    }
}

export default Helpdesk;