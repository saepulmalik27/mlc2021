import React from "react"
import * as styles from "./embed-video.module.scss"

const EmbedVideo = props => {
  const { url } = props
  return (
    <div className={styles.video}>
      <div className={styles.video_container}>
        {url ? (
          <iframe src={url} frameBorder="0"></iframe>
        ) : (
          <img src="" alt="video" />
        )}
      </div>
    </div>
  )
}

export default EmbedVideo
