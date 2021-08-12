// React & Libraries
import React from 'react'

// Styles
import * as styles from './spinner.modules.scss'


const Spinner = ({ size, color }) => {
    return (
        <div className={styles.spinner} style={{ width: size, height: size }}>
            <div className={styles.spinner__loader}>
                <svg className={styles.circular} viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="16" fill="none" stroke={color} strokeWidth="3" />
                </svg>
            </div>
        </div>
    )
}

export default Spinner