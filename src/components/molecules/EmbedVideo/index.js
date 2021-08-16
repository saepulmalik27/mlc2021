import React from "react"
import * as styles from "./embed-video.module.scss"

const EmbedVideo = props => {
  const { url } = props
  return (
    <div className={styles.video}>
      <div className={styles.video_container}>
        {url ? (
          <iframe src={url} frameborder="0"></iframe>
        ) : (
          <img src="" alt="video" />
        )}
      </div>
    </div>
  )
}

export default EmbedVideo
